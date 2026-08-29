import { Effect } from "effect";

import {
  baseRegistrarV1Abi,
  ensRegistryV1Abi,
  nameWrapperFuses,
  nameWrapperV1Abi,
} from "@ensforge/contracts/v1";
import { ethRegistryV2Abi, wrapperRegistryV2Abi } from "@ensforge/contracts/v2";
import { encodeAbiParameters, labelhash, namehash, zeroAddress, type Address } from "viem";

import type { DevnetEnvironment } from "../environment.js";
import { TestEnvironmentError } from "../errors/test-environment-error.js";
import { seedRead, seedTransaction } from "./contract.js";
import type { EnsMigrationFixtureManifest, EnsNameFixture } from "./manifest.js";

const activeDuration = 365n * 86_400n;
const premigrationBonus = 62n * 86_400n + 1n;
const migrationData = [
  { name: "label", type: "string" },
  { name: "owner", type: "address" },
  { name: "subregistry", type: "address" },
  { name: "resolver", type: "address" },
] as const;

const fixture = (
  name: string,
  expiry: bigint,
  resolver: Address,
  owner: Address,
  resolverState: EnsNameFixture["resolverState"] = "own",
): EnsNameFixture => ({
  name,
  owner,
  protocol: "v2",
  lifecycle: "active",
  resolver,
  resolverState,
  expiry,
});

const registerV1MigrationName = Effect.fn("registerV1MigrationName")(function* (
  environment: DevnetEnvironment,
  label: string,
) {
  yield* seedTransaction(
    environment,
    {
      abi: baseRegistrarV1Abi,
      address: environment.deployments.v1.contracts.baseRegistrar,
      functionName: "register",
      args: [BigInt(labelhash(label)), environment.accounts.owner, activeDuration],
    },
    `Unable to register the ENS v1 migration fixture ${label}.eth`,
  );
  return yield* seedRead(
    () =>
      environment.clients.publicClient.readContract({
        abi: baseRegistrarV1Abi,
        address: environment.deployments.v1.contracts.baseRegistrar,
        functionName: "nameExpires",
        args: [BigInt(labelhash(label))],
      }),
    `Unable to read the ENS v1 migration expiry for ${label}.eth`,
  );
});

const reserveV2 = Effect.fn("reserveV2")(function* (
  environment: DevnetEnvironment,
  label: string,
  expiry: bigint,
) {
  yield* seedTransaction(
    environment,
    {
      abi: ethRegistryV2Abi,
      address: environment.deployments.v2.contracts.ethRegistry,
      functionName: "register",
      args: [
        label,
        zeroAddress,
        zeroAddress,
        environment.deployments.v2.migration.ensV1Resolver,
        0n,
        expiry + premigrationBonus,
      ],
    },
    `Unable to reserve ${label}.eth for ENS migration`,
  );
});

const wrapV1 = Effect.fn("wrapV1")(function* (
  environment: DevnetEnvironment,
  label: string,
  resolver: Address,
  fuses = nameWrapperFuses.canDoEverything,
) {
  yield* seedTransaction(
    environment,
    {
      abi: baseRegistrarV1Abi,
      address: environment.deployments.v1.contracts.baseRegistrar,
      functionName: "setApprovalForAll",
      args: [environment.deployments.v1.contracts.nameWrapper, true],
    },
    `Unable to approve wrapping ${label}.eth`,
    "owner",
  );
  yield* seedTransaction(
    environment,
    {
      abi: nameWrapperV1Abi,
      address: environment.deployments.v1.contracts.nameWrapper,
      functionName: "wrapETH2LD",
      args: [label, environment.accounts.owner, fuses, resolver],
    },
    `Unable to wrap the ENS v1 migration fixture ${label}.eth`,
    "owner",
  );
});

const encodedMigrationData = (label: string, owner: Address, resolver: Address) =>
  encodeAbiParameters(
    [{ type: "tuple", components: migrationData }],
    [{ label, owner, subregistry: zeroAddress, resolver }],
  );

const seedReservedWriteName = Effect.fn("seedReservedWriteName")(function* (
  environment: DevnetEnvironment,
  label: string,
  publicResolver: Address,
  wrapping: "unwrapped" | "wrapped" | "locked",
) {
  const expiry = yield* registerV1MigrationName(environment, label);
  if (wrapping !== "unwrapped") {
    yield* wrapV1(
      environment,
      label,
      publicResolver,
      wrapping === "locked" ? nameWrapperFuses.cannotUnwrap : nameWrapperFuses.canDoEverything,
    );
  }
  yield* reserveV2(environment, label, expiry);
  return expiry;
});

export const seedMigrationFixtures = Effect.fn("seedMigrationFixtures")(function* (
  environment: DevnetEnvironment,
  publicResolver: Address,
) {
  const reservedUnwrappedExpiry = yield* registerV1MigrationName(
    environment,
    "v2-reserved-unwrapped",
  );
  yield* reserveV2(environment, "v2-reserved-unwrapped", reservedUnwrappedExpiry);
  yield* seedTransaction(
    environment,
    {
      abi: ensRegistryV1Abi,
      address: environment.deployments.v1.contracts.registry,
      functionName: "setResolver",
      args: [
        namehash("v2-reserved-unwrapped.eth"),
        environment.deployments.v1.contracts.publicResolver,
      ],
    },
    "Unable to set the V1 resolver for the reserved ENS migration fixture",
    "owner",
  );

  const reservedWrappedExpiry = yield* registerV1MigrationName(environment, "v2-reserved-wrapped");
  yield* wrapV1(environment, "v2-reserved-wrapped", publicResolver);
  yield* reserveV2(environment, "v2-reserved-wrapped", reservedWrappedExpiry);

  const reservedApprovedExpiry = yield* registerV1MigrationName(
    environment,
    "v2-reserved-approved",
  );
  yield* seedTransaction(
    environment,
    {
      abi: baseRegistrarV1Abi,
      address: environment.deployments.v1.contracts.baseRegistrar,
      functionName: "approve",
      args: [
        environment.deployments.v2.migration.unlockedMigrationController,
        BigInt(labelhash("v2-reserved-approved")),
      ],
    },
    "Unable to approve the unlocked ENS migration controller",
    "owner",
  );
  yield* reserveV2(environment, "v2-reserved-approved", reservedApprovedExpiry);

  const reservedWrappedLockedExpiry = yield* registerV1MigrationName(
    environment,
    "v2-reserved-wrapped-locked",
  );
  yield* wrapV1(
    environment,
    "v2-reserved-wrapped-locked",
    publicResolver,
    nameWrapperFuses.cannotUnwrap,
  );
  yield* reserveV2(environment, "v2-reserved-wrapped-locked", reservedWrappedLockedExpiry);

  const renewalReservedExpiry = yield* registerV1MigrationName(environment, "v2-renewal-reserved");
  yield* reserveV2(environment, "v2-renewal-reserved", renewalReservedExpiry);

  const renewalReservedBatchExpiry = yield* registerV1MigrationName(
    environment,
    "v2-renewal-reserved-batch",
  );
  yield* reserveV2(environment, "v2-renewal-reserved-batch", renewalReservedBatchExpiry);

  const writeUnwrappedExpiry = yield* seedReservedWriteName(
    environment,
    "v2-write-migrate-unwrapped",
    publicResolver,
    "unwrapped",
  );
  const writeWrappedExpiry = yield* seedReservedWriteName(
    environment,
    "v2-write-migrate-wrapped",
    publicResolver,
    "wrapped",
  );
  const writeWrappedLockedExpiry = yield* seedReservedWriteName(
    environment,
    "v2-write-migrate-locked",
    publicResolver,
    "locked",
  );
  const writeBatchUnwrappedExpiry = yield* seedReservedWriteName(
    environment,
    "v2-write-migrate-batch-unwrapped",
    publicResolver,
    "unwrapped",
  );
  const writeBatchWrappedExpiry = yield* seedReservedWriteName(
    environment,
    "v2-write-migrate-batch-wrapped",
    publicResolver,
    "wrapped",
  );
  const writeParentLockedExpiry = yield* seedReservedWriteName(
    environment,
    "v2-write-migrate-parent",
    publicResolver,
    "locked",
  );
  yield* seedTransaction(
    environment,
    {
      abi: nameWrapperV1Abi,
      address: environment.deployments.v1.contracts.nameWrapper,
      functionName: "setSubnodeOwner",
      args: [
        namehash("v2-write-migrate-parent.eth"),
        "child",
        environment.accounts.owner,
        nameWrapperFuses.parentCannotControl,
        writeParentLockedExpiry,
      ],
    },
    "Unable to seed the parent-first migration child",
    "owner",
  );

  const unlockedExpiry = yield* registerV1MigrationName(environment, "v2-migrated-unlocked");
  yield* reserveV2(environment, "v2-migrated-unlocked", unlockedExpiry);
  yield* seedTransaction(
    environment,
    {
      abi: baseRegistrarV1Abi,
      address: environment.deployments.v1.contracts.baseRegistrar,
      functionName: "safeTransferFrom",
      args: [
        environment.accounts.owner,
        environment.deployments.v2.migration.unlockedMigrationController,
        BigInt(labelhash("v2-migrated-unlocked")),
        encodedMigrationData("v2-migrated-unlocked", environment.accounts.owner, publicResolver),
      ],
    },
    "Unable to migrate the unlocked ENS v1 fixture",
    "owner",
  );

  const lockedExpiry = yield* registerV1MigrationName(environment, "v2-migrated-locked");
  yield* wrapV1(environment, "v2-migrated-locked", publicResolver, nameWrapperFuses.cannotUnwrap);
  yield* seedTransaction(
    environment,
    {
      abi: nameWrapperV1Abi,
      address: environment.deployments.v1.contracts.nameWrapper,
      functionName: "setSubnodeOwner",
      args: [
        namehash("v2-migrated-locked.eth"),
        "mirrored",
        environment.accounts.owner2,
        nameWrapperFuses.parentCannotControl,
        lockedExpiry,
      ],
    },
    "Unable to seed the V1-mirrored child",
    "owner",
  );
  yield* reserveV2(environment, "v2-migrated-locked", lockedExpiry);
  yield* seedTransaction(
    environment,
    {
      abi: nameWrapperV1Abi,
      address: environment.deployments.v1.contracts.nameWrapper,
      functionName: "safeTransferFrom",
      args: [
        environment.accounts.owner,
        environment.deployments.v2.migration.lockedMigrationController,
        BigInt(namehash("v2-migrated-locked.eth")),
        1n,
        encodedMigrationData("v2-migrated-locked", environment.accounts.owner, publicResolver),
      ],
    },
    "Unable to migrate the locked ENS v1 fixture",
    "owner",
  );

  const status = (label: string) =>
    environment.clients.publicClient.readContract({
      abi: ethRegistryV2Abi,
      address: environment.deployments.v2.contracts.ethRegistry,
      functionName: "getStatus",
      args: [BigInt(labelhash(label))],
    });
  const [reservedStatus, unlockedStatus, lockedStatus, unlockedState, lockedRegistry] =
    yield* seedRead(
      () =>
        Promise.all([
          status("v2-reserved-unwrapped"),
          status("v2-migrated-unlocked"),
          status("v2-migrated-locked"),
          environment.clients.publicClient.readContract({
            abi: ethRegistryV2Abi,
            address: environment.deployments.v2.contracts.ethRegistry,
            functionName: "getState",
            args: [BigInt(labelhash("v2-migrated-unlocked"))],
          }),
          environment.clients.publicClient.readContract({
            abi: ethRegistryV2Abi,
            address: environment.deployments.v2.contracts.ethRegistry,
            functionName: "getSubregistry",
            args: ["v2-migrated-locked"],
          }),
        ]),
      "Unable to verify the ENS v2 migration fixture topology",
    );
  if (
    reservedStatus !== 1 ||
    unlockedStatus !== 2 ||
    lockedStatus !== 2 ||
    unlockedState.latestOwner.toLowerCase() !== environment.accounts.owner.toLowerCase() ||
    lockedRegistry === zeroAddress
  ) {
    return yield* new TestEnvironmentError({
      code: "SEED_FAILED",
      message: "The seeded ENS v2 migration fixture topology failed verification",
      cause: { lockedRegistry, lockedStatus, reservedStatus, unlockedState, unlockedStatus },
    });
  }

  const [mirroredStatus, mirroredV1Owner] = yield* seedRead(
    () =>
      Promise.all([
        environment.clients.publicClient.readContract({
          abi: wrapperRegistryV2Abi,
          address: lockedRegistry,
          functionName: "getStatus",
          args: [BigInt(labelhash("mirrored"))],
        }),
        environment.clients.publicClient.readContract({
          abi: nameWrapperV1Abi,
          address: environment.deployments.v1.contracts.nameWrapper,
          functionName: "ownerOf",
          args: [BigInt(namehash("mirrored.v2-migrated-locked.eth"))],
        }),
      ]),
    "Unable to verify the V1-mirrored child topology",
  );
  if (
    mirroredStatus !== 0 ||
    mirroredV1Owner.toLowerCase() !== environment.accounts.owner2.toLowerCase()
  ) {
    return yield* new TestEnvironmentError({
      code: "SEED_FAILED",
      message: "The seeded V1-mirrored child topology failed verification",
      cause: { mirroredStatus, mirroredV1Owner },
    });
  }

  return {
    reservedUnwrapped: fixture(
      "v2-reserved-unwrapped.eth",
      reservedUnwrappedExpiry,
      environment.deployments.v2.migration.ensV1Resolver,
      environment.accounts.owner,
    ),
    reservedWrapped: fixture(
      "v2-reserved-wrapped.eth",
      reservedWrappedExpiry,
      environment.deployments.v2.migration.ensV1Resolver,
      environment.accounts.owner,
    ),
    reservedUnwrappedApproved: fixture(
      "v2-reserved-approved.eth",
      reservedApprovedExpiry,
      environment.deployments.v2.migration.ensV1Resolver,
      environment.accounts.owner,
    ),
    reservedWrappedLocked: fixture(
      "v2-reserved-wrapped-locked.eth",
      reservedWrappedLockedExpiry,
      environment.deployments.v2.migration.ensV1Resolver,
      environment.accounts.owner,
    ),
    renewalReserved: fixture(
      "v2-renewal-reserved.eth",
      renewalReservedExpiry,
      environment.deployments.v2.migration.ensV1Resolver,
      environment.accounts.owner,
    ),
    renewalReservedBatch: fixture(
      "v2-renewal-reserved-batch.eth",
      renewalReservedBatchExpiry,
      environment.deployments.v2.migration.ensV1Resolver,
      environment.accounts.owner,
    ),
    writeUnwrapped: fixture(
      "v2-write-migrate-unwrapped.eth",
      writeUnwrappedExpiry,
      environment.deployments.v2.migration.ensV1Resolver,
      environment.accounts.owner,
    ),
    writeWrapped: fixture(
      "v2-write-migrate-wrapped.eth",
      writeWrappedExpiry,
      environment.deployments.v2.migration.ensV1Resolver,
      environment.accounts.owner,
    ),
    writeWrappedLocked: fixture(
      "v2-write-migrate-locked.eth",
      writeWrappedLockedExpiry,
      environment.deployments.v2.migration.ensV1Resolver,
      environment.accounts.owner,
    ),
    writeBatchUnwrapped: fixture(
      "v2-write-migrate-batch-unwrapped.eth",
      writeBatchUnwrappedExpiry,
      environment.deployments.v2.migration.ensV1Resolver,
      environment.accounts.owner,
    ),
    writeBatchWrapped: fixture(
      "v2-write-migrate-batch-wrapped.eth",
      writeBatchWrappedExpiry,
      environment.deployments.v2.migration.ensV1Resolver,
      environment.accounts.owner,
    ),
    writeParentLocked: fixture(
      "v2-write-migrate-parent.eth",
      writeParentLockedExpiry,
      environment.deployments.v2.migration.ensV1Resolver,
      environment.accounts.owner,
    ),
    writeLockedChild: fixture(
      "child.v2-write-migrate-parent.eth",
      writeParentLockedExpiry,
      publicResolver,
      environment.accounts.owner,
      "inherited",
    ),
    migratedUnlocked: fixture(
      "v2-migrated-unlocked.eth",
      unlockedExpiry + premigrationBonus,
      publicResolver,
      environment.accounts.owner,
    ),
    migratedLocked: fixture(
      "v2-migrated-locked.eth",
      lockedExpiry + premigrationBonus,
      publicResolver,
      environment.accounts.owner,
    ),
    mirroredChild: fixture(
      "mirrored.v2-migrated-locked.eth",
      lockedExpiry,
      publicResolver,
      environment.accounts.owner2,
      "inherited",
    ),
  } satisfies EnsMigrationFixtureManifest;
});
