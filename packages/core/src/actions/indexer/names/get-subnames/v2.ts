import { Effect, Result } from "effect";

import type { EnsforgeConfig } from "../../../../config/config.js";
import { IndexerPaginationError } from "../../../../errors/indexer-pagination-error.js";
import { requestIndexer } from "../../../../internal/indexer/client.js";
import {
  V2GetSubnamesDocument,
  type V2GetSubnamesQuery,
  type V2GetSubnamesQueryVariables,
} from "../../../../internal/indexer/generated/v2/get-subnames.js";
import { normalizeV2IndexerName } from "../../../../internal/indexer/normalize/v2-name.js";
import type { IndexerSourcePageResult } from "../../../../internal/indexer/pagination/merge.js";
import type { V2NameWhere } from "../../../../internal/indexer/query/name-filter.js";
import { compileV2NameOrder } from "../../../../internal/indexer/query/name-order.js";
import {
  decodeIndexedBlock,
  indexerSourceFailure,
  requireIndexerData,
} from "../../../../internal/indexer/response.js";
import type { NormalizedName } from "../../../../schemas/name.js";
import type { IndexedName } from "../../models/name.js";
import type { NameOrder } from "../../models/query.js";
import type { GetSubnamesError } from "./types.js";

const operationName = "V2GetSubnames";

export const queryV2Subnames = Effect.fn("queryV2Subnames")(function* (
  config: EnsforgeConfig,
  parent: NormalizedName,
  where: V2NameWhere,
  order: NameOrder,
  limit: number,
  position: string | null,
): Effect.fn.Return<IndexerSourcePageResult<IndexedName, GetSubnamesError>> {
  const result = yield* Effect.gen(function* () {
    const skip = yield* Effect.try({
      try: () => {
        const value = position === null ? 0 : Number(position);
        if (!Number.isSafeInteger(value) || value < 0) throw new Error("Invalid offset");
        return value;
      },
      catch: (cause) =>
        new IndexerPaginationError({
          code: "INVALID_CURSOR",
          message: "The V2 subname cursor contains an invalid position",
          cause,
        }),
    });
    const response = yield* requestIndexer<V2GetSubnamesQuery, V2GetSubnamesQueryVariables>(
      config,
      {
        protocol: "v2",
        operationName,
        document: V2GetSubnamesDocument,
        variables: {
          id: parent,
          first: limit + 1,
          skip,
          where,
          ...compileV2NameOrder(order),
        } as V2GetSubnamesQueryVariables,
      },
    );
    const data = yield* requireIndexerData(config, "v2", operationName, response);
    const indexedBlock = yield* decodeIndexedBlock(
      config,
      "v2",
      operationName,
      data["_meta"].block.number,
    );
    const labels = data.domain?.subregistry?.labels ?? [];
    // The current Sepolia V2 endpoint exposes pagination arguments on this
    // field but returns the complete label set. Fall back to a local window
    // when the response exceeds the requested size; retain server pagination
    // for deployments that honor `first` and `skip`.
    const window = labels.length > limit + 1 ? labels.slice(skip, skip + limit + 1) : labels;
    const candidates = yield* Effect.all(
      window.map((node, index) =>
        normalizeV2IndexerName(node, {
          network: config.network,
          protocol: "v2",
          indexedBlock,
          operationName,
        }).pipe(Effect.map((item) => ({ item, position: String(skip + index + 1) }))),
      ),
      { concurrency: "unbounded" },
    );
    return {
      indexedBlock,
      page: {
        protocol: "v2" as const,
        candidates,
        hasNextPage: candidates.length > limit,
      },
    };
  }).pipe(Effect.result);
  if (Result.isFailure(result)) {
    return {
      status: "failed",
      error: result.failure,
      metadata: { protocol: "v2", status: "failed", failure: indexerSourceFailure(result.failure) },
    };
  }
  return {
    status: "complete",
    page: result.success.page,
    metadata: {
      protocol: "v2",
      status: "complete",
      indexedBlock: result.success.indexedBlock,
      hasNextPage: result.success.page.hasNextPage,
    },
  };
});
