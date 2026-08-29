import { Effect } from "effect";

import {
  baseRegistrarV1Abi,
  ensRegistryV1Abi,
  nameWrapperV1Abi,
  publicResolverV1Abi,
  reverseRegistrarV1Abi,
} from "@ensforge/contracts/v1";
import { labelhash, namehash, zeroAddress } from "viem";

import type { DevnetAccountRole } from "../accounts/accounts.js";
import type { DevnetEnvironment } from "../environment.js";
import { TestEnvironmentError } from "../errors/test-environment-error.js";
import { seedRead, seedTransaction } from "./contract.js";
import type { EnsNameFixture, EnsV1FixtureManifest } from "./manifest.js";

const day = 86_400;
const v1GracePeriod = 90 * day;
const activeDuration = BigInt(365 * day);

const registrarSecurityControllerAbi = [
  {
    type: "function",
    name: "addRegistrarController",
    stateMutability: "nonpayable",
    inputs: [{ name: "controller", type: "address" }],
    outputs: [],
  },
] as const;

const v1Fixture = (
  name: string,
  lifecycle: EnsNameFixture["lifecycle"],
  expiry: bigint,
  resolver: `0x${string}`,
  owner: `0x${string}`,
): EnsNameFixture => ({
  name,
  owner,
  protocol: "v1",
  lifecycle,
  resolver,
  resolverState: resolver === zeroAddress ? "missing" : "own",
  expiry,
});

const registerV1 = Effect.fn("registerV1")(function* (
  environment: DevnetEnvironment,
  label: string,
  duration: bigint,
  owner = environment.accounts.owner,
) {
  yield* seedTransaction(
    environment,
    {
      abi: baseRegistrarV1Abi,
      address: environment.deployments.v1.contracts.baseRegistrar,
      functionName: "register",
      args: [BigInt(labelhash(label)), owner, duration],
    },
    `Unable to register ${label}.eth in ENS v1`,
  );
  return yield* seedRead(
    () =>
      environment.clients.publicClient.readContract({
        abi: baseRegistrarV1Abi,
        address: environment.deployments.v1.contracts.baseRegistrar,
        functionName: "nameExpires",
        args: [BigInt(labelhash(label))],
      }),
    `Unable to read the expiry for ${label}.eth`,
  );
});

const activeV1Fixture = Effect.fn("activeV1Fixture")(function* (
  environment: DevnetEnvironment,
  label: string,
  resolver = environment.deployments.v1.contracts.publicResolver,
  ownerRole: DevnetAccountRole = "owner",
) {
  const owner = environment.accounts[ownerRole];
  const expiry = yield* registerV1(environment, label, activeDuration, owner);
  const node = namehash(`${label}.eth`);
  if (resolver !== zeroAddress) {
    yield* seedTransaction(
      environment,
      {
        abi: ensRegistryV1Abi,
        address: environment.deployments.v1.contracts.registry,
        functionName: "setResolver",
        args: [node, resolver],
      },
      `Unable to set the resolver for ${label}.eth`,
      ownerRole,
    );
    yield* seedTransaction(
      environment,
      {
        abi: publicResolverV1Abi,
        address: resolver,
        functionName: "setAddr",
        args: [node, owner],
      },
      `Unable to set the address record for ${label}.eth`,
      ownerRole,
    );
  }
  return { expiry, node };
});

export const seedV1Fixtures = Effect.fn("seedV1Fixtures")(function* (
  environment: DevnetEnvironment,
) {
  const registrarOwner = yield* seedRead(
    () =>
      environment.clients.publicClient.readContract({
        abi: baseRegistrarV1Abi,
        address: environment.deployments.v1.contracts.baseRegistrar,
        functionName: "owner",
      }),
    "Unable to discover the ENS v1 registrar security controller",
  );
  yield* seedTransaction(
    environment,
    {
      abi: registrarSecurityControllerAbi,
      address: registrarOwner,
      functionName: "addRegistrarController",
      args: [environment.accounts.deployer],
    },
    "Unable to authorize the ENS devnet fixture registrar",
    "owner",
  );

  const expiredExpiry = yield* registerV1(environment, "v1-expired", 1n);
  yield* environment.state.advanceTime(v1GracePeriod + 2);
  const graceExpiry = yield* registerV1(environment, "v1-grace", 1n);
  yield* environment.state.advanceTime(2);

  const activeUnwrapped = yield* activeV1Fixture(environment, "v1-unwrapped");
  const noResolver = yield* activeV1Fixture(environment, "v1-no-resolver", zeroAddress);
  const wrapped = yield* activeV1Fixture(environment, "v1-wrapped");
  const differentOwner = yield* activeV1Fixture(
    environment,
    "v1-owner2",
    environment.deployments.v1.contracts.publicResolver,
    "owner2",
  );
  const recordWrites = yield* activeV1Fixture(environment, "v1-record-writes");
  const resolverLifecycle = yield* activeV1Fixture(
    environment,
    "v1-resolver-lifecycle",
    zeroAddress,
  );
  const writeReady = yield* activeV1Fixture(environment, "v1-write-ready", zeroAddress);

  yield* seedTransaction(
    environment,
    {
      abi: ensRegistryV1Abi,
      address: environment.deployments.v1.contracts.registry,
      functionName: "setSubnodeRecord",
      args: [
        namehash("v1-unwrapped.eth"),
        labelhash("sub"),
        environment.accounts.owner2,
        environment.deployments.v1.contracts.publicResolver,
        60n,
      ],
    },
    "Unable to create the unwrapped ENS v1 subname",
    "owner",
  );
  yield* seedTransaction(
    environment,
    {
      abi: publicResolverV1Abi,
      address: environment.deployments.v1.contracts.publicResolver,
      functionName: "setAddr",
      args: [namehash("sub.v1-unwrapped.eth"), environment.accounts.owner2],
    },
    "Unable to set the unwrapped ENS v1 subname address",
    "owner2",
  );

  yield* seedTransaction(
    environment,
    {
      abi: baseRegistrarV1Abi,
      address: environment.deployments.v1.contracts.baseRegistrar,
      functionName: "setApprovalForAll",
      args: [environment.deployments.v1.contracts.nameWrapper, true],
    },
    "Unable to approve the ENS v1 Name Wrapper",
    "owner",
  );
  yield* seedTransaction(
    environment,
    {
      abi: nameWrapperV1Abi,
      address: environment.deployments.v1.contracts.nameWrapper,
      functionName: "wrapETH2LD",
      args: [
        "v1-wrapped",
        environment.accounts.owner,
        0,
        environment.deployments.v1.contracts.publicResolver,
      ],
    },
    "Unable to wrap v1-wrapped.eth",
    "owner",
  );
  yield* seedTransaction(
    environment,
    {
      abi: nameWrapperV1Abi,
      address: environment.deployments.v1.contracts.nameWrapper,
      functionName: "setSubnodeOwner",
      args: [namehash("v1-wrapped.eth"), "sub", environment.accounts.owner2, 0, wrapped.expiry],
    },
    "Unable to create the wrapped ENS v1 subname",
    "owner",
  );
  yield* seedTransaction(
    environment,
    {
      abi: reverseRegistrarV1Abi,
      address: environment.deployments.v1.contracts.reverseRegistrar,
      functionName: "setName",
      args: ["v1-unwrapped.eth"],
    },
    "Unable to set the ENS v1 reverse record",
    "owner",
  );

  const publicResolver = environment.deployments.v1.contracts.publicResolver;
  const owner = environment.accounts.owner;
  const manifest = {
    seededAt: (yield* seedRead(
      () => environment.clients.publicClient.getBlock(),
      "Unable to read the seeded ENS v1 block",
    )).timestamp,
    v1: {
      available: {
        name: "v1-available.eth",
        owner: zeroAddress,
        protocol: "v1",
        lifecycle: "available",
        resolver: zeroAddress,
        resolverState: "missing",
      },
      activeUnwrapped: v1Fixture(
        "v1-unwrapped.eth",
        "active",
        activeUnwrapped.expiry,
        publicResolver,
        owner,
      ),
      activeWrapped: v1Fixture("v1-wrapped.eth", "active", wrapped.expiry, publicResolver, owner),
      differentOwner: v1Fixture(
        "v1-owner2.eth",
        "active",
        differentOwner.expiry,
        publicResolver,
        environment.accounts.owner2,
      ),
      unwrappedSubname: v1Fixture(
        "sub.v1-unwrapped.eth",
        "active",
        activeUnwrapped.expiry,
        publicResolver,
        environment.accounts.owner2,
      ),
      wrappedSubname: v1Fixture(
        "sub.v1-wrapped.eth",
        "active",
        wrapped.expiry,
        publicResolver,
        environment.accounts.owner2,
      ),
      noResolver: v1Fixture("v1-no-resolver.eth", "active", noResolver.expiry, zeroAddress, owner),
      recordWrites: v1Fixture(
        "v1-record-writes.eth",
        "active",
        recordWrites.expiry,
        publicResolver,
        owner,
      ),
      resolverLifecycle: v1Fixture(
        "v1-resolver-lifecycle.eth",
        "active",
        resolverLifecycle.expiry,
        zeroAddress,
        owner,
      ),
      writeReady: v1Fixture("v1-write-ready.eth", "active", writeReady.expiry, zeroAddress, owner),
      grace: v1Fixture("v1-grace.eth", "grace", graceExpiry, zeroAddress, owner),
      expired: v1Fixture("v1-expired.eth", "expired", expiredExpiry, zeroAddress, owner),
      reverse: {
        address: environment.accounts.owner,
        name: "v1-unwrapped.eth",
      },
    } satisfies EnsV1FixtureManifest,
  };

  const [activeOwner, wrappedOwner, subnameOwner, resolver] = yield* seedRead(
    () =>
      Promise.all([
        environment.clients.publicClient.readContract({
          abi: baseRegistrarV1Abi,
          address: environment.deployments.v1.contracts.baseRegistrar,
          functionName: "ownerOf",
          args: [BigInt(labelhash("v1-unwrapped"))],
        }),
        environment.clients.publicClient.readContract({
          abi: nameWrapperV1Abi,
          address: environment.deployments.v1.contracts.nameWrapper,
          functionName: "ownerOf",
          args: [BigInt(namehash("v1-wrapped.eth"))],
        }),
        environment.clients.publicClient.readContract({
          abi: nameWrapperV1Abi,
          address: environment.deployments.v1.contracts.nameWrapper,
          functionName: "ownerOf",
          args: [BigInt(namehash("sub.v1-wrapped.eth"))],
        }),
        environment.clients.publicClient.readContract({
          abi: ensRegistryV1Abi,
          address: environment.deployments.v1.contracts.registry,
          functionName: "resolver",
          args: [namehash("v1-no-resolver.eth")],
        }),
      ]),
    "Unable to verify the seeded ENS v1 fixtures",
  );
  if (
    activeOwner.toLowerCase() !== environment.accounts.owner.toLowerCase() ||
    wrappedOwner.toLowerCase() !== environment.accounts.owner.toLowerCase() ||
    subnameOwner.toLowerCase() !== environment.accounts.owner2.toLowerCase() ||
    resolver !== zeroAddress
  ) {
    return yield* new TestEnvironmentError({
      code: "SEED_FAILED",
      message: "The seeded ENS v1 fixture topology failed verification",
      cause: { activeOwner, resolver, subnameOwner, wrappedOwner },
    });
  }

  yield* environment.state.checkpoint;
  return manifest;
});
