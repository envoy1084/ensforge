import { Effect } from "effect";

import {
  enhancedAccessControlRoles,
  ethRegistryV2Abi,
  registryRoles,
  userRegistryV2InitializeAbi,
  userRegistryV2Abi,
  verifiableFactoryV2Abi,
} from "@ensforge/contracts/v2";
import { encodeFunctionData, labelhash, zeroAddress, type Address } from "viem";

import type { DevnetEnvironment } from "../environment.js";
import { TestEnvironmentError } from "../errors/test-environment-error.js";
import { seedRead, seedTransaction } from "./contract.js";
import type { EnsNameFixture, EnsV1FixtureManifest, EnsV2FixtureManifest } from "./manifest.js";
import { seedMigrationFixtures } from "./migration.js";

const day = 86_400;
const v2GracePeriod = 28 * day;
const activeDuration = BigInt(365 * day);
const v2OwnerRoles = enhancedAccessControlRoles.allRoles & ~registryRoles.wasReserved;

const v2Fixture = (
  name: string,
  lifecycle: EnsNameFixture["lifecycle"],
  expiry: bigint,
  resolver: Address,
  owner: Address,
  resolverState: EnsNameFixture["resolverState"] = resolver === zeroAddress ? "missing" : "own",
): EnsNameFixture => ({
  name,
  owner,
  protocol: "v2",
  lifecycle,
  resolver,
  resolverState,
  expiry,
});

const registerV2 = Effect.fn("registerV2")(function* (
  environment: DevnetEnvironment,
  label: string,
  expiry: bigint,
  resolver: Address,
  owner = environment.accounts.owner,
) {
  yield* seedTransaction(
    environment,
    {
      abi: ethRegistryV2Abi,
      address: environment.deployments.v2.contracts.ethRegistry,
      functionName: "register",
      args: [label, owner, zeroAddress, resolver, v2OwnerRoles, expiry],
    },
    `Unable to register ${label}.eth in ENS v2`,
  );
});

export const seedV2Fixtures = Effect.fn("seedV2Fixtures")(function* (
  environment: DevnetEnvironment,
  v1: EnsV1FixtureManifest,
) {
  const initialBlock = yield* seedRead(
    () => environment.clients.publicClient.getBlock(),
    "Unable to read the ENS v2 fixture baseline block",
  );
  const expiredExpiry = initialBlock.timestamp + 60n;
  yield* registerV2(environment, "v2-expired", expiredExpiry, zeroAddress);
  yield* environment.state.advanceTime(v2GracePeriod + 61);

  const graceBlock = yield* seedRead(
    () => environment.clients.publicClient.getBlock(),
    "Unable to read the ENS v2 grace fixture block",
  );
  const graceExpiry = graceBlock.timestamp + 60n;
  yield* registerV2(environment, "v2-grace", graceExpiry, zeroAddress);
  yield* environment.state.advanceTime(61);

  const activeBlock = yield* seedRead(
    () => environment.clients.publicClient.getBlock(),
    "Unable to read the ENS v2 active fixture block",
  );
  const activeExpiry = activeBlock.timestamp + activeDuration;
  const publicResolver = environment.deployments.v2.contracts.publicResolver;
  yield* registerV2(environment, "v2-active", activeExpiry, publicResolver);
  yield* registerV2(environment, "v2-no-resolver", activeExpiry, zeroAddress);
  yield* registerV2(
    environment,
    "v2-owner2",
    activeExpiry,
    publicResolver,
    environment.accounts.owner2,
  );
  yield* registerV2(environment, "v2-expiring-soon", activeBlock.timestamp + 3_600n, zeroAddress);
  yield* registerV2(environment, "v2-resolver-lifecycle", activeExpiry, zeroAddress);
  yield* registerV2(environment, "v2-renewal", activeExpiry, zeroAddress);
  yield* registerV2(environment, "v2-renewal-batch", activeExpiry, zeroAddress);
  yield* registerV2(environment, "v2-write-ready", activeExpiry, zeroAddress);

  const existingEnsRegistry = yield* seedRead(
    () =>
      environment.clients.publicClient.readContract({
        abi: ethRegistryV2Abi,
        address: environment.deployments.v2.contracts.ethRegistry,
        functionName: "getSubregistry",
        args: ["ens"],
      }),
    "Unable to locate the native ENS v2 ens.eth registry",
  );
  let ensRegistry = existingEnsRegistry;
  if (ensRegistry === zeroAddress) {
    const initialization = encodeFunctionData({
      abi: userRegistryV2InitializeAbi,
      functionName: "initialize",
      args: [environment.accounts.owner, enhancedAccessControlRoles.allRoles],
    });
    ensRegistry = yield* seedRead(
      () =>
        environment.clients.publicClient
          .simulateContract({
            account: environment.accounts.owner,
            abi: verifiableFactoryV2Abi,
            address: environment.deployments.v2.contracts.verifiableFactory,
            functionName: "deployProxy",
            args: [environment.deployments.v2.implementations.userRegistry, 1n, initialization],
          })
          .then(({ result }) => result),
      "Unable to predict the native ENS v2 User Registry",
    );
    yield* seedTransaction(
      environment,
      {
        abi: verifiableFactoryV2Abi,
        address: environment.deployments.v2.contracts.verifiableFactory,
        functionName: "deployProxy",
        args: [environment.deployments.v2.implementations.userRegistry, 1n, initialization],
      },
      "Unable to deploy the native ENS v2 User Registry",
      "owner",
    );
    yield* seedTransaction(
      environment,
      {
        abi: ethRegistryV2Abi,
        address: environment.deployments.v2.contracts.ethRegistry,
        functionName: "setSubregistry",
        args: [BigInt(labelhash("ens")), ensRegistry],
      },
      "Unable to attach the native ENS v2 User Registry",
      "owner",
    );
    yield* seedTransaction(
      environment,
      {
        abi: userRegistryV2Abi,
        address: ensRegistry,
        functionName: "setParent",
        args: [environment.deployments.v2.contracts.ethRegistry, "ens"],
      },
      "Unable to set the canonical parent of the native ENS v2 User Registry",
      "owner",
    );
  }
  yield* seedTransaction(
    environment,
    {
      abi: userRegistryV2Abi,
      address: ensRegistry,
      functionName: "register",
      args: [
        "native",
        environment.accounts.owner,
        zeroAddress,
        publicResolver,
        v2OwnerRoles,
        activeExpiry,
      ],
    },
    "Unable to register native.ens.eth",
    "owner",
  );
  yield* seedTransaction(
    environment,
    {
      abi: userRegistryV2Abi,
      address: ensRegistry,
      functionName: "register",
      args: [
        "owned",
        environment.accounts.owner,
        zeroAddress,
        publicResolver,
        v2OwnerRoles,
        activeExpiry,
      ],
    },
    "Unable to register owned.ens.eth",
    "owner",
  );
  yield* seedTransaction(
    environment,
    {
      abi: userRegistryV2Abi,
      address: ensRegistry,
      functionName: "register",
      args: [
        "inherited",
        environment.accounts.owner2,
        zeroAddress,
        zeroAddress,
        v2OwnerRoles,
        activeExpiry,
      ],
    },
    "Unable to register inherited.ens.eth",
    "owner",
  );

  const migration = yield* seedMigrationFixtures(environment, publicResolver);

  const [nestedStatus, activeResolver, missingResolver, nestedResolver, inheritedResolver] =
    yield* seedRead(
      () =>
        Promise.all([
          environment.clients.publicClient.readContract({
            abi: userRegistryV2Abi,
            address: ensRegistry,
            functionName: "getStatus",
            args: [BigInt(labelhash("native"))],
          }),
          environment.clients.publicClient.readContract({
            abi: ethRegistryV2Abi,
            address: environment.deployments.v2.contracts.ethRegistry,
            functionName: "getResolver",
            args: ["v2-active"],
          }),
          environment.clients.publicClient.readContract({
            abi: ethRegistryV2Abi,
            address: environment.deployments.v2.contracts.ethRegistry,
            functionName: "getResolver",
            args: ["v2-no-resolver"],
          }),
          environment.clients.publicClient.readContract({
            abi: userRegistryV2Abi,
            address: ensRegistry,
            functionName: "getResolver",
            args: ["native"],
          }),
          environment.clients.publicClient.readContract({
            abi: userRegistryV2Abi,
            address: ensRegistry,
            functionName: "getResolver",
            args: ["inherited"],
          }),
        ]),
      "Unable to verify the native ENS v2 registry and resolver topology",
    );
  if (
    nestedStatus !== 2 ||
    activeResolver.toLowerCase() !== publicResolver.toLowerCase() ||
    nestedResolver.toLowerCase() !== publicResolver.toLowerCase() ||
    missingResolver !== zeroAddress ||
    inheritedResolver !== zeroAddress
  ) {
    return yield* new TestEnvironmentError({
      code: "SEED_FAILED",
      message: "The seeded native ENS v2 topology failed verification",
      cause: {
        activeResolver,
        inheritedResolver,
        missingResolver,
        nestedResolver,
        nestedStatus,
      },
    });
  }

  const v2 = {
    available: {
      name: "v2-available.eth",
      owner: zeroAddress,
      protocol: "v2",
      lifecycle: "available",
      resolver: zeroAddress,
      resolverState: "missing",
    },
    active: v2Fixture(
      "v2-active.eth",
      "active",
      activeExpiry,
      publicResolver,
      environment.accounts.owner,
    ),
    differentOwner: v2Fixture(
      "v2-owner2.eth",
      "active",
      activeExpiry,
      publicResolver,
      environment.accounts.owner2,
    ),
    expiringSoon: v2Fixture(
      "v2-expiring-soon.eth",
      "active",
      activeBlock.timestamp + 3_600n,
      zeroAddress,
      environment.accounts.owner,
    ),
    nested: v2Fixture(
      "native.ens.eth",
      "active",
      activeExpiry,
      publicResolver,
      environment.accounts.owner,
    ),
    nestedOwnResolver: v2Fixture(
      "owned.ens.eth",
      "active",
      activeExpiry,
      publicResolver,
      environment.accounts.owner,
    ),
    inheritedResolver: v2Fixture(
      "inherited.ens.eth",
      "active",
      activeExpiry,
      zeroAddress,
      environment.accounts.owner2,
      "inherited",
    ),
    noResolver: v2Fixture(
      "v2-no-resolver.eth",
      "active",
      activeExpiry,
      zeroAddress,
      environment.accounts.owner,
    ),
    resolverLifecycle: v2Fixture(
      "v2-resolver-lifecycle.eth",
      "active",
      activeExpiry,
      zeroAddress,
      environment.accounts.owner,
    ),
    renewal: v2Fixture(
      "v2-renewal.eth",
      "active",
      activeExpiry,
      zeroAddress,
      environment.accounts.owner,
    ),
    renewalBatch: v2Fixture(
      "v2-renewal-batch.eth",
      "active",
      activeExpiry,
      zeroAddress,
      environment.accounts.owner,
    ),
    writeReady: v2Fixture(
      "v2-write-ready.eth",
      "active",
      activeExpiry,
      zeroAddress,
      environment.accounts.owner,
    ),
    grace: v2Fixture("v2-grace.eth", "grace", graceExpiry, zeroAddress, environment.accounts.owner),
    expired: v2Fixture(
      "v2-expired.eth",
      "expired",
      expiredExpiry,
      zeroAddress,
      environment.accounts.owner,
    ),
  } satisfies EnsV2FixtureManifest;
  const seededAt = (yield* seedRead(
    () => environment.clients.publicClient.getBlock(),
    "Unable to read the completed ENS fixture block",
  )).timestamp;

  yield* environment.state.checkpoint;
  return { seededAt, v1, v2, migration };
});
