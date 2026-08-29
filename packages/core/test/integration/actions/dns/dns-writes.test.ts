import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  claimDnsName,
  DnsImportError,
  importDnsName,
  prepareCalls,
} from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

const proof = [{ rrset: "0x1234", sig: "0xabcd" }] as const;

describe("DNS ownership writes integration", () => {
  it.effect("prepares proof-backed claims through the V1 DNS Registrar for either profile", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const [v1, v2] = yield* Effect.all(
        [
          prepareCalls.effect(devnet.configs.v1, {
            calls: [claimDnsName.call({ name: "ens.xyz", proof })],
          }),
          prepareCalls.effect(devnet.configs.v2, {
            calls: [claimDnsName.call({ name: "ens.xyz", proof })],
          }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.strictEqual(v1[0]?.to, devnet.deployments.v1.contracts.dnsRegistrar);
      assert.strictEqual(v1[0]?.protocol, "v1");
      assert.strictEqual(v2[0]?.to, devnet.deployments.v1.contracts.dnsRegistrar);
      assert.strictEqual(v2[0]?.protocol, "v1");
    }),
  );

  it.effect("prepares atomic resolver and address configuration", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const prepared = yield* prepareCalls.effect(devnet.configs.v2, {
        calls: [
          claimDnsName.call({
            name: "ens.xyz",
            proof,
            resolver: devnet.deployments.v1.contracts.publicResolver,
            address: devnet.accounts.owner,
          }),
        ],
      });

      assert.lengthOf(prepared, 1);
      assert.strictEqual(prepared[0]?.to, devnet.deployments.v1.contracts.dnsRegistrar);
    }),
  );

  it.effect("treats an existing registry claim as idempotent", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.v1.activeUnwrapped;

      const result = yield* importDnsName.effect(devnet.configs.v2, {
        name: fixture.name,
        proof,
      });

      assert.strictEqual(result.status, "not-required");
      assert.strictEqual(result.owner, fixture.owner);
      assert.isNull(result.write);
    }),
  );

  it.effect("rejects malformed proof boundaries and addresses without resolvers", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();

      const invalidProof = yield* Effect.flip(
        claimDnsName.effect(devnet.configs.v1, { name: "invalid-proof.xyz", proof: [] }),
      );
      const missingResolver = yield* Effect.flip(
        claimDnsName.effect(devnet.configs.v1, {
          name: "ens.xyz",
          proof,
          address: devnet.accounts.owner,
        }),
      );

      assert.instanceOf(invalidProof, DnsImportError);
      if (invalidProof instanceof DnsImportError) {
        assert.strictEqual(invalidProof.code, "INVALID_PROOF");
      }
      assert.instanceOf(missingResolver, DnsImportError);
      if (missingResolver instanceof DnsImportError) {
        assert.strictEqual(missingResolver.code, "RESOLVER_REQUIRED");
      }
    }),
  );
});
