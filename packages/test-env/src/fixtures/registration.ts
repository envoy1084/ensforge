import { Effect } from "effect";

import { erc20Abi } from "@ensforge/contracts/shared";
import { ethRegistrarControllerV1Abi } from "@ensforge/contracts/v1";
import { ethRegistrarV2Abi } from "@ensforge/contracts/v2";
import { maxUint256, zeroAddress, zeroHash } from "viem";

import type { DevnetEnvironment } from "../environment.js";
import { seedRead, seedTransaction } from "./contract.js";
import type { RegistrationFixtureManifest } from "./manifest.js";

const duration = 365n * 86_400n;
const v1Secret = "0x4444444444444444444444444444444444444444444444444444444444444444";
const v2Secret = "0x5555555555555555555555555555555555555555555555555555555555555555";
const tokenBalance = 1_000_000_000_000_000_000_000_000n;
const mockTokenAbi = [
  ...erc20Abi,
  {
    type: "function",
    name: "mint",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },
] as const;

export const seedRegistrationFixtures = Effect.fn("seedRegistrationFixtures")(function* (
  environment: DevnetEnvironment,
) {
  const v1Registration = {
    data: [],
    duration,
    label: "v1-commitment",
    owner: environment.accounts.owner,
    referrer: zeroHash,
    resolver: environment.deployments.v1.contracts.publicResolver,
    reverseRecord: 0,
    secret: v1Secret,
  } as const;
  const v1Commitment = yield* seedRead(
    () =>
      environment.clients.publicClient.readContract({
        abi: ethRegistrarControllerV1Abi,
        address: environment.deployments.v1.contracts.ethRegistrarController,
        functionName: "makeCommitment",
        args: [v1Registration],
      }),
    "Unable to create the ENS v1 registration commitment",
  );
  yield* seedTransaction(
    environment,
    {
      abi: ethRegistrarControllerV1Abi,
      address: environment.deployments.v1.contracts.ethRegistrarController,
      functionName: "commit",
      args: [v1Commitment],
    },
    "Unable to submit the ENS v1 registration commitment",
    "owner",
  );

  const v2Commitment = yield* seedRead(
    () =>
      environment.clients.publicClient.readContract({
        abi: ethRegistrarV2Abi,
        address: environment.deployments.v2.contracts.ethRegistrar,
        functionName: "makeCommitment",
        args: [
          "v2-commitment",
          environment.accounts.owner,
          v2Secret,
          zeroAddress,
          environment.deployments.v2.contracts.publicResolver,
          duration,
          zeroHash,
        ],
      }),
    "Unable to create the ENS v2 registration commitment",
  );
  yield* seedTransaction(
    environment,
    {
      abi: ethRegistrarV2Abi,
      address: environment.deployments.v2.contracts.ethRegistrar,
      functionName: "commit",
      args: [v2Commitment],
    },
    "Unable to submit the ENS v2 registration commitment",
    "owner",
  );

  for (const token of [
    environment.deployments.v2.testTokens.usdc,
    environment.deployments.v2.testTokens.dai,
  ]) {
    yield* seedTransaction(
      environment,
      {
        abi: mockTokenAbi,
        address: token,
        functionName: "mint",
        args: [environment.accounts.owner, tokenBalance],
      },
      `Unable to mint registration funds from ${token}`,
    );
    for (const spender of [
      environment.deployments.v2.contracts.ethRegistrar,
      environment.deployments.v2.migration.ethRenewerV1,
    ]) {
      yield* seedTransaction(
        environment,
        {
          abi: erc20Abi,
          address: token,
          functionName: "approve",
          args: [spender, maxUint256],
        },
        `Unable to approve registration funds from ${token}`,
        "owner",
      );
    }
  }

  const [v1MinAge, v1MaxAge, v2MinAge, v2MaxAge] = yield* seedRead(
    () =>
      Promise.all([
        environment.clients.publicClient.readContract({
          abi: ethRegistrarControllerV1Abi,
          address: environment.deployments.v1.contracts.ethRegistrarController,
          functionName: "minCommitmentAge",
        }),
        environment.clients.publicClient.readContract({
          abi: ethRegistrarControllerV1Abi,
          address: environment.deployments.v1.contracts.ethRegistrarController,
          functionName: "maxCommitmentAge",
        }),
        environment.clients.publicClient.readContract({
          abi: ethRegistrarV2Abi,
          address: environment.deployments.v2.contracts.ethRegistrar,
          functionName: "MIN_COMMITMENT_AGE",
        }),
        environment.clients.publicClient.readContract({
          abi: ethRegistrarV2Abi,
          address: environment.deployments.v2.contracts.ethRegistrar,
          functionName: "MAX_COMMITMENT_AGE",
        }),
      ]),
    "Unable to read ENS commitment timing",
  );

  return {
    paymentTokens: {
      dai: {
        address: environment.deployments.v2.testTokens.dai,
        balance: tokenBalance,
        decimals: 18,
      },
      usdc: {
        address: environment.deployments.v2.testTokens.usdc,
        balance: tokenBalance,
        decimals: 6,
      },
    },
    v1: {
      commitment: v1Commitment,
      controller: environment.deployments.v1.contracts.ethRegistrarController,
      label: v1Registration.label,
      maxCommitmentAge: v1MaxAge,
      minCommitmentAge: v1MinAge,
      secret: v1Secret,
    },
    v2: {
      commitment: v2Commitment,
      controller: environment.deployments.v2.contracts.ethRegistrar,
      label: "v2-commitment",
      maxCommitmentAge: v2MaxAge,
      minCommitmentAge: v2MinAge,
      secret: v2Secret,
    },
  } satisfies RegistrationFixtureManifest;
});
