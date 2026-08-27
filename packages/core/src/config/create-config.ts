import { Schema } from "effect";

import type { EnsforgeServiceValues } from "../services/context.js";
import { makeServicesContext } from "../services/context.js";
import {
  EnsforgeConfigTypeId,
  type CreateConfigParameters,
  type EnsDeploymentProfile,
  type EnsforgeConfig,
} from "./config.js";
import {
  ClientChainUnavailableError,
  DeploymentChainMismatchError,
  DuplicateDeploymentError,
  NetworkClientMismatchError,
  UnsupportedEnsNetworkError,
} from "./configuration-error.js";
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
    throw new ClientChainUnavailableError({ client: clientKind });
  }

  if (client.chain.id !== expectedChainId) {
    throw new NetworkClientMismatchError({
      network,
      client: clientKind,
      expectedChainId,
      actualChainId: client.chain.id,
    });
  }
};

const validateDeployments = (profile: EnsDeploymentProfile, expectedChainId: number): void => {
  const deploymentIds = new Set<string>();

  for (const deployment of [profile.active, ...profile.compatibility]) {
    if (deployment.chainId !== expectedChainId) {
      throw new DeploymentChainMismatchError({
        deploymentId: deployment.id,
        expectedChainId,
        actualChainId: deployment.chainId,
      });
    }

    if (deploymentIds.has(deployment.id)) {
      throw new DuplicateDeploymentError({ deploymentId: deployment.id });
    }

    deploymentIds.add(deployment.id);
  }
};

export const createConfig = (parameters: CreateConfigParameters): EnsforgeConfig => {
  if (!Schema.is(EnsNetworkSchema)(parameters.network)) {
    throw new UnsupportedEnsNetworkError({ network: parameters.network });
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
