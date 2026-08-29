import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { createPublicClient, createWalletClient, defineChain, http } from "viem";

import {
  AuthorizationError,
  clearPrimaryName,
  getPrimaryName,
  prepareCalls,
  ReverseNameError,
  setContractPrimaryName,
  setPrimaryName,
  setPrimaryNameForAddress,
} from "../../../../src/index.js";
import { createTestConfig } from "../../../../src/testing/index.js";
import { getIntegrationDevnet, type IntegrationDevnet } from "../../setup/devnet.js";

const configFor = (devnet: IntegrationDevnet, protocol: "v1" | "v2", account: `0x${string}`) => {
  const chain = defineChain({
    id: 31_337,
    name: "Ensforge integration devnet",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
    rpcUrls: { default: { http: [devnet.rpcUrl] } },
    contracts: { multicall3: { address: devnet.deployments.multicall3, blockCreated: 0 } },
  });
  const transport = http(devnet.rpcUrl, { retryCount: 0, timeout: 10_000 });
  return createTestConfig({
    deployments:
      protocol === "v1"
        ? Object.freeze({ protocol: "v1", v1: devnet.deployments.v1 })
        : Object.freeze({
            protocol: "v2",
            v1: devnet.deployments.v1,
            v2: devnet.deployments.v2,
          }),
    publicClient: createPublicClient({ chain, transport }),
    walletClient: createWalletClient({ account, chain, transport }),
  });
};

describe("reverse-name writes integration", () => {
  it.effect("routes self-service writes through the active V1 and V2 contracts", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const v1Fixture = devnet.fixtures.reverse.verifiedV1;
      const v2Fixture = devnet.fixtures.reverse.verifiedV2;
      if (v1Fixture.name === undefined || v2Fixture.name === undefined) {
        return yield* Effect.die(new Error("The verified reverse fixtures have no names"));
      }
      const v2Config = configFor(devnet, "v2", v2Fixture.address);

      const [v1Prepared, v2Prepared] = yield* Effect.all(
        [
          prepareCalls.effect(devnet.configs.v1, {
            calls: [setPrimaryName.call({ name: v1Fixture.name })],
          }),
          prepareCalls.effect(v2Config, {
            calls: [setPrimaryName.call({ name: v2Fixture.name })],
          }),
        ] as const,
        { concurrency: "unbounded" },
      );
      const [v1Write, v2Write] = yield* Effect.all(
        [
          setPrimaryName.effect(devnet.configs.v1, { name: v1Fixture.name }),
          setPrimaryName.effect(v2Config, { name: v2Fixture.name }),
        ] as const,
        { concurrency: "unbounded" },
      );

      assert.strictEqual(v1Prepared[0]?.to, devnet.deployments.v1.contracts.reverseRegistrar);
      assert.strictEqual(
        v2Prepared[0]?.to,
        devnet.deployments.v2.contracts.defaultReverseRegistrarAdapter,
      );
      assert.strictEqual(v1Write.status, "confirmed");
      assert.strictEqual(v2Write.status, "confirmed");
    }),
  );

  it.effect("clears and restores V1 and V2 primary names", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const v1Fixture = devnet.fixtures.reverse.verifiedV1;
      const v2Fixture = devnet.fixtures.reverse.verifiedV2;
      if (v1Fixture.name === undefined || v2Fixture.name === undefined) {
        return yield* Effect.die(new Error("The verified reverse fixtures have no names"));
      }
      const v2Config = configFor(devnet, "v2", v2Fixture.address);

      yield* clearPrimaryName.effect(devnet.configs.v1, {});
      yield* clearPrimaryName.effect(v2Config, {});
      const cleared = yield* Effect.all(
        [
          getPrimaryName.effect(devnet.configs.v1, { address: v1Fixture.address }),
          getPrimaryName.effect(v2Config, { address: v2Fixture.address }),
        ] as const,
        { concurrency: "unbounded" },
      );
      yield* setPrimaryName.effect(devnet.configs.v1, { name: v1Fixture.name });
      yield* setPrimaryName.effect(v2Config, { name: v2Fixture.name });

      assert.deepStrictEqual(cleared, [null, null]);
    }),
  );

  it.effect("supports an authorized V1 registry operator", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.reverse.verifiedV1;
      if (fixture.name === undefined) {
        return yield* Effect.die(new Error("The verified V1 reverse fixture has no name"));
      }
      const operatorConfig = configFor(devnet, "v1", devnet.accounts.operator);

      const result = yield* setPrimaryNameForAddress.effect(operatorConfig, {
        address: fixture.address,
        name: fixture.name,
      });
      const primaryName = yield* getPrimaryName.effect(devnet.configs.v1, {
        address: fixture.address,
      });

      assert.strictEqual(result.status, "confirmed");
      assert.deepStrictEqual(primaryName, { name: fixture.name, match: true });
    }),
  );

  it.effect("sets a verified contract primary name through ENSv2 authorization", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.reverse.verifiedContract;
      if (fixture.name === undefined) {
        return yield* Effect.die(new Error("The verified contract fixture has no name"));
      }

      const result = yield* setContractPrimaryName.effect(devnet.configs.v2, {
        contract: fixture.address,
        name: fixture.name,
      });

      assert.strictEqual(result.status, "confirmed");
    }),
  );

  it.effect("rejects forward mismatches, unauthorized accounts, and EOA contract targets", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const v2Fixture = devnet.fixtures.reverse.verifiedV2;
      if (v2Fixture.name === undefined) {
        return yield* Effect.die(new Error("The verified V2 reverse fixture has no name"));
      }

      const staged = yield* prepareCalls.effect(devnet.configs.v2, {
        calls: [setPrimaryName.call({ name: v2Fixture.name, verifyForward: false })],
      });
      const mismatch = yield* Effect.flip(
        setPrimaryName.effect(devnet.configs.v2, { name: v2Fixture.name }),
      );
      const unauthorized = yield* Effect.flip(
        setPrimaryNameForAddress.effect(devnet.configs.v2, {
          address: v2Fixture.address,
          name: v2Fixture.name,
        }),
      );
      const notContract = yield* Effect.flip(
        setContractPrimaryName.effect(devnet.configs.v2, {
          contract: devnet.accounts.owner,
          name: devnet.fixtures.reverse.verifiedV1.name ?? "v1-unwrapped.eth",
        }),
      );

      assert.lengthOf(staged, 1);
      assert.instanceOf(mismatch, ReverseNameError);
      if (mismatch instanceof ReverseNameError) {
        assert.strictEqual(mismatch.code, "FORWARD_ADDRESS_MISMATCH");
      }
      assert.instanceOf(unauthorized, AuthorizationError);
      if (unauthorized instanceof AuthorizationError) {
        assert.strictEqual(unauthorized.code, "UNAUTHORIZED");
      }
      assert.instanceOf(notContract, ReverseNameError);
      if (notContract instanceof ReverseNameError) {
        assert.strictEqual(notContract.code, "TARGET_NOT_CONTRACT");
      }
    }),
  );
});
