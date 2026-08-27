import { Schema } from "effect";

import type { EnsforgeServiceValues } from "../services/context.js";
import { makeServicesContext } from "../services/context.js";
import {
  EnsforgeConfigTypeId,
  type CreateConfigParameters,
  type EnsDeployment,
  type EnsDeploymentProfile,
  type EnsforgeConfig,
} from "./config.js";
import { EnsforgeConfigError } from "./configuration-error.js";
import { attachConfigContext } from "./internal.js";
import { getNetworkProfile } from "./network-profile.js";
import { ensChainIds, EnsNetworkSchema, type EnsNetwork } from "./network.js";

type ClientKind = "public" | "wallet";

const validateClientChain = (
  client: { readonly chain: { readonly id: number } | undefined },
  clientKind: ClientKind,
  network: EnsNetwork,
  expectedChainId: number,
): void => {
  if (client.chain === undefined) {
    throw new EnsforgeConfigError({
      code: "CLIENT_CHAIN_UNAVAILABLE",
      message: `The ${clientKind} client must be configured with a chain`,
    });
  }

  if (client.chain.id !== expectedChainId) {
    throw new EnsforgeConfigError({
      code: "NETWORK_CLIENT_MISMATCH",
      message: `The ${clientKind} client chain ${client.chain.id} does not match ${network} (${expectedChainId})`,
    });
  }
};

const getProfileDeployments = (profile: EnsDeploymentProfile): readonly EnsDeployment[] => {
  switch (profile.phase) {
    case "v1":
      return [profile.v1];
    case "v2-transition":
      return [profile.v1, profile.v2];
    case "v2":
      return profile.v1 === undefined ? [profile.v2] : [profile.v1, profile.v2];
  }
};

const validateDeployments = (profile: EnsDeploymentProfile, expectedChainId: number): void => {
  const deploymentIds = new Set<string>();

  for (const deployment of getProfileDeployments(profile)) {
    if (deployment.chainId !== expectedChainId) {
      throw new EnsforgeConfigError({
        code: "DEPLOYMENT_CHAIN_MISMATCH",
        message: `Deployment ${deployment.id} targets chain ${deployment.chainId}, expected ${expectedChainId}`,
      });
    }

    if (deploymentIds.has(deployment.id)) {
      throw new EnsforgeConfigError({
        code: "DUPLICATE_DEPLOYMENT",
        message: `Deployment ${deployment.id} appears more than once in the selected profile`,
      });
    }

    deploymentIds.add(deployment.id);
  }
};

export const createConfig = (parameters: CreateConfigParameters): EnsforgeConfig => {
  if (!Schema.is(EnsNetworkSchema)(parameters.network)) {
    throw new EnsforgeConfigError({
      code: "UNSUPPORTED_NETWORK",
      message: `Unsupported ENS network: ${parameters.network}`,
    });
  }

  const network = parameters.network;
  const chainId = ensChainIds[network];
  const deployments = getNetworkProfile(network);

  validateClientChain(parameters.publicClient, "public", network, chainId);

  if (parameters.walletClient !== undefined) {
    validateClientChain(parameters.walletClient, "wallet", network, chainId);
  }

  validateDeployments(deployments, chainId);

  const serviceValues: EnsforgeServiceValues = {
    network,
    chainId,
    publicClient: parameters.publicClient,
    deployments,
    ...(parameters.walletClient === undefined ? {} : { walletClient: parameters.walletClient }),
  };
  const config = attachConfigContext(
    {
      [EnsforgeConfigTypeId]: EnsforgeConfigTypeId,
      network,
      chainId,
      publicClient: parameters.publicClient,
      deployments,
      ...(parameters.walletClient === undefined ? {} : { walletClient: parameters.walletClient }),
    },
    makeServicesContext(serviceValues),
  );

  return Object.freeze(config);
};
