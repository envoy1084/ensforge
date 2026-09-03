import { assert, describe, it } from "@effect/vitest";
import { Effect, Exit } from "effect";

import { namehash } from "viem/ens";

import {
  getRegistrations,
  getRegistrationsForAddress,
} from "../../../../src/actions/indexer/registrations/index.js";
import { createConfig } from "../../../../src/index.js";
import { makeSepoliaPublicClient } from "../../fixtures/client-fixtures.js";

const registrant = "0x0000000000000000000000000000000000001000" as const;
const currentOwner = "0x0000000000000000000000000000000000002000" as const;
const referrer = `0x${"12".repeat(32)}` as const;
const response = (data: unknown) =>
  new Response(JSON.stringify({ data }), { headers: { "content-type": "application/json" } });
const request = (init: RequestInit | undefined) =>
  JSON.parse(String(init?.body)) as {
    readonly query: string;
    readonly variables: Record<string, unknown>;
  };

describe("indexed registrations", () => {
  it.effect("merges V1 and V2 registrations without conflating registrant and current owner", () =>
    Effect.gen(function* () {
      const fetch: typeof globalThis.fetch = (_input, init) => {
        const { query, variables } = request(init);
        if (query.includes("V1GetRegistrations")) {
          return Promise.resolve(
            response({
              _meta: { block: { number: 100 } },
              registrations: [
                {
                  id: "v1-registration",
                  labelName: "legacy",
                  registrationDate: "1000",
                  expiryDate: "3000",
                  cost: "10",
                  registrant: { id: registrant },
                  domain: {
                    id: namehash("legacy.eth"),
                    name: "legacy.eth",
                    owner: { id: currentOwner },
                  },
                },
              ],
            }),
          );
        }
        assert.deepInclude(variables.where, { protocol: "v2" });
        return Promise.resolve(
          response({
            _meta: { block: { number: 200 } },
            registrationConnection: {
              edges: [
                {
                  cursor: "v2-cursor",
                  node: {
                    id: "v2-registration",
                    protocol: "v2",
                    name: "modern.eth",
                    labelName: "modern",
                    registrationDate: 2000,
                    expiryDate: 4000,
                    cost: "20",
                    baseCost: "15",
                    premium: "5",
                    referrer,
                    registrant: { id: registrant },
                    domain: { id: namehash("modern.eth"), owner: { id: currentOwner } },
                  },
                },
              ],
              pageInfo: { hasNextPage: false, endCursor: "v2-cursor" },
            },
          }),
        );
      };
      const config = createConfig({
        network: "sepolia",
        publicClient: makeSepoliaPublicClient(),
        indexer: { fetch, retry: { attempts: 0 } },
      });

      const page = yield* getRegistrations.effect(config, { pageSize: 10 });

      assert.deepStrictEqual(
        page.items.map(({ protocol }) => protocol),
        ["v2", "v1"],
      );
      assert.strictEqual(page.items[0]?.cost.total, 20n);
      assert.strictEqual(page.items[0]?.cost.base, 15n);
      assert.strictEqual(page.items[0]?.referrer, referrer);
      assert.strictEqual(page.items[1]?.registrant, registrant);
      assert.strictEqual(page.items[1]?.currentOwner, currentOwner);
    }),
  );

  it.effect("compiles address discovery to the historical registrant relation", () =>
    Effect.gen(function* () {
      let requests = 0;
      const fetch: typeof globalThis.fetch = (_input, init) => {
        const { query, variables } = request(init);
        requests += 1;
        assert.deepInclude(variables.where, { registrant: registrant.toLowerCase() });
        return Promise.resolve(
          query.includes("V1GetRegistrations")
            ? response({ _meta: { block: { number: 100 } }, registrations: [] })
            : response({
                _meta: { block: { number: 200 } },
                registrationConnection: {
                  edges: [],
                  pageInfo: { hasNextPage: false, endCursor: null },
                },
              }),
        );
      };
      const config = createConfig({
        network: "sepolia",
        publicClient: makeSepoliaPublicClient(),
        indexer: { fetch, retry: { attempts: 0 } },
      });

      yield* getRegistrationsForAddress.effect(config, { address: registrant });
      assert.strictEqual(requests, 2);
    }),
  );

  it.effect("rejects exact-name filters on the registration collection", () =>
    Effect.gen(function* () {
      const config = createConfig({
        network: "sepolia",
        publicClient: makeSepoliaPublicClient(),
      });
      const result = yield* Effect.exit(
        getRegistrations.effect(config, {
          filter: { name: "alice.eth" },
        } as never),
      );

      assert.isTrue(Exit.isFailure(result));
    }),
  );
});
