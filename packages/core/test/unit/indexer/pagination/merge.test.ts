import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  collectIndexerSourcePages,
  mergeIndexerPages,
  type IndexerMergeSource,
} from "../../../../src/internal/indexer/pagination/merge.js";

interface Candidate {
  readonly id: string;
  readonly rank: number;
  readonly protocol: "v1" | "v2";
}

const source = (
  protocol: "v1" | "v2",
  candidates: ReadonlyArray<Candidate>,
  hasNextPage = false,
): IndexerMergeSource<Candidate> => ({
  protocol,
  hasNextPage,
  candidates: candidates.map((item) => ({ item, position: `${protocol}:${item.id}` })),
});

const merge = (sources: ReadonlyArray<IndexerMergeSource<Candidate>>, limit: number) =>
  mergeIndexerPages({
    sources,
    limit,
    compare: (left, right) => left.rank - right.rank || left.id.localeCompare(right.id),
    identity: (item) => item.id,
    preference: (item, protocol) => (item.protocol === "v2" ? 2 : protocol === "v2" ? 1 : 0),
  });

describe("indexer page merging", () => {
  it("deduplicates sources, prefers V2, and advances every consumed source", () => {
    const result = merge(
      [
        source("v1", [
          { id: "a", rank: 1, protocol: "v1" },
          { id: "c", rank: 3, protocol: "v1" },
          { id: "e", rank: 5, protocol: "v1" },
        ]),
        source("v2", [
          { id: "b", rank: 2, protocol: "v2" },
          { id: "c", rank: 3, protocol: "v2" },
          { id: "d", rank: 4, protocol: "v2" },
        ]),
      ],
      3,
    );

    assert.deepStrictEqual(
      result.items.map(({ id, protocol }) => ({ id, protocol })),
      [
        { id: "a", protocol: "v1" },
        { id: "b", protocol: "v2" },
        { id: "c", protocol: "v2" },
      ],
    );
    assert.deepStrictEqual(result.positions, { v1: "v1:c", v2: "v2:c" });
    assert.isTrue(result.hasNextPage);
  });

  it("resumes without gaps or duplicates from the emitted positions", () => {
    const first = merge(
      [
        source("v1", [
          { id: "a", rank: 1, protocol: "v1" },
          { id: "c", rank: 3, protocol: "v1" },
        ]),
        source("v2", [
          { id: "b", rank: 2, protocol: "v2" },
          { id: "c", rank: 3, protocol: "v2" },
        ]),
      ],
      3,
    );
    const second = merge(
      [
        source("v1", [{ id: "e", rank: 5, protocol: "v1" }]),
        source("v2", [{ id: "d", rank: 4, protocol: "v2" }]),
      ],
      3,
    );

    assert.deepStrictEqual(
      [...first.items, ...second.items].map(({ id }) => id),
      ["a", "b", "c", "d", "e"],
    );
  });

  it("orders a duplicate using the preferred V2 entity facts", () => {
    const result = merge(
      [
        source("v1", [{ id: "same", rank: 1, protocol: "v1" }]),
        source("v2", [
          { id: "before", rank: 2, protocol: "v2" },
          { id: "same", rank: 3, protocol: "v2" },
        ]),
      ],
      3,
    );

    assert.deepStrictEqual(
      result.items.map(({ id, protocol }) => ({ id, protocol })),
      [
        { id: "before", protocol: "v2" },
        { id: "same", protocol: "v2" },
      ],
    );
  });

  it.effect("preserves partial results and fails in strict mode", () =>
    Effect.gen(function* () {
      const failure = new Error("V1 unavailable");
      const results = [
        {
          status: "failed",
          error: failure,
          metadata: {
            protocol: "v1",
            status: "failed",
            failure: { code: "HTTP_FAILED", message: failure.message, retryable: true },
          },
        },
        {
          status: "complete",
          page: source("v2", [{ id: "a", rank: 1, protocol: "v2" }]),
          metadata: {
            protocol: "v2",
            status: "complete",
            indexedBlock: 100n,
            hasNextPage: false,
          },
        },
      ] as const;

      const partial = yield* collectIndexerSourcePages(results, "partial");
      const strictError = yield* collectIndexerSourcePages(results, "strict").pipe(Effect.flip);

      assert.lengthOf(partial.pages, 1);
      assert.lengthOf(partial.sources, 2);
      assert.strictEqual(strictError, failure);
    }),
  );
});
