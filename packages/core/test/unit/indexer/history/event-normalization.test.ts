import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { namehash } from "viem/ens";

import type { V2GetEventsQuery } from "../../../../src/internal/indexer/generated/v2/get-events.js";
import { normalizeV2Event } from "../../../../src/internal/indexer/normalize/event.js";

type V2Event = V2GetEventsQuery["eventConnection"]["edges"][number]["node"];

const address = "0x0000000000000000000000000000000000001000";
const transactionHash = `0x${"ab".repeat(32)}`;

const event = (type: string, data: Readonly<Record<string, unknown>>): V2Event => ({
  id: `${type}-event`,
  type,
  protocol: "v2",
  name: "alice.eth",
  namehash: namehash("alice.eth"),
  blockNumber: 100,
  timestamp: 2000,
  transactionHash,
  contractAddress: address,
  data: JSON.stringify(data),
  key: null,
  value: null,
  asAddressChanged: null,
  asExpiryUpdated: null,
  asFusesSet: null,
  asLabelRegistered: null,
  asNameRegistered: null,
  asNameRenewed: null,
  asNameUnwrapped: null,
  asNameWrapped: null,
  asRegistryTransfer: null,
  asResolverUpdated: null,
  asReverseClaimed: null,
  asTextChanged: null,
  asTransfer: null,
});

describe("indexed event normalization", () => {
  it.effect("maps V2 administration and lifecycle events to stable semantic kinds", () =>
    Effect.sync(() => {
      const cases = [
        ["NewTTL", { ttl: 60 }, "ttl"],
        ["NameWrapped", { owner: address, fuses: 1, expiry: 3000 }, "wrap"],
        ["NameUnwrapped", { owner: address }, "unwrap"],
        ["FusesSet", { fuses: 3 }, "fuses"],
        ["ExpiryUpdated", { expiry: 4000 }, "expiry"],
        ["NameMigrated", { owner: address }, "migration"],
        ["SubregistryUpdated", { registry: address, subregistry: address }, "subregistry"],
        ["EACRolesChanged", { account: address, resource: "0x01", roles: "7" }, "role"],
        ["ReverseClaimed", { address }, "reverse"],
      ] as const;

      for (const [type, data, expectedKind] of cases) {
        const normalized = normalizeV2Event(event(type, data), {
          network: "sepolia",
          indexedBlock: 200n,
        });
        assert.strictEqual(normalized.kind, expectedKind);
        assert.strictEqual(normalized.raw.type, type);
      }
    }),
  );
});
