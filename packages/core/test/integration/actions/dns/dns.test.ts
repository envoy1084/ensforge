import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  getDnsClaimStatus,
  getDnsImportPlan,
  getDnsRecord,
  getDnsRecords,
  getZoneHash,
  hasDnsRecords,
  readBatch,
} from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

describe("DNS reads integration", () => {
  it.effect("reads DNS records and zone hashes through V1 and V2 resolvers", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const v1 = devnet.fixtures.records.v1;
      const v2 = devnet.fixtures.records.v2;
      const result = yield* Effect.all(
        {
          v1Record: getDnsRecord.effect(devnet.configs.v1, {
            name: v1.name,
            recordName: v1.dns.name,
            resource: v1.dns.resource,
          }),
          v2Record: getDnsRecord.effect(devnet.configs.v2, {
            name: v2.name,
            recordName: v2.dns.name,
            resource: v2.dns.resource,
          }),
          v1Zone: getZoneHash.effect(devnet.configs.v1, { name: v1.name }),
          v2Zone: getZoneHash.effect(devnet.configs.v2, { name: v2.name }),
        },
        { concurrency: "unbounded" },
      );

      assert.isNotNull(result.v1Record.value);
      assert.isNotNull(result.v2Record.value);
      assert.strictEqual(result.v1Zone.value, v1.zonehash);
      assert.strictEqual(result.v2Zone.value, v2.zonehash);
    }),
  );

  it.effect("checks existence and batches multiple DNS record queries", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.records.v1;
      const result = yield* readBatch.effect(devnet.configs.v1, {
        exists: hasDnsRecords.request({
          name: fixture.name,
          recordName: fixture.dns.name,
        }),
        missing: hasDnsRecords.request({
          name: fixture.name,
          recordName: `missing.${fixture.name}`,
        }),
        records: getDnsRecords.request({
          name: fixture.name,
          records: [
            { recordName: fixture.dns.name, resource: fixture.dns.resource },
            { recordName: fixture.dns.name, resource: 1 },
          ],
        }),
      });

      assert.isTrue(result.exists.exists);
      assert.isFalse(result.missing.exists);
      assert.isNotNull(result.records.records[0]?.value);
      assert.isNull(result.records.records[1]?.value);
    }),
  );

  it.effect("keeps external DNSSEC proof acquisition outside core reads", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [claimed, claimRequired, importPlan] = yield* Effect.all(
        [
          getDnsClaimStatus.effect(devnet.configs.v1, {
            name: devnet.fixtures.v1.activeUnwrapped.name,
          }),
          getDnsClaimStatus.effect(devnet.configs.v2, { name: "ensforge.example" }),
          getDnsImportPlan.effect(devnet.configs.v2, { name: "ensforge.example" }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.strictEqual(claimed.status, "claimed");
      assert.strictEqual(claimRequired.status, "proof-required");
      assert.strictEqual(importPlan.status, "proof-required");
      if (importPlan.status === "proof-required") {
        assert.strictEqual(importPlan.registrar, devnet.deployments.v1.contracts.dnsRegistrar);
        assert.strictEqual(importPlan.oracle, devnet.deployments.v1.contracts.dnssecOracle);
      }
    }),
  );
});
