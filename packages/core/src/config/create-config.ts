import { Schema } from "effect";

import { ConfigError } from "../errors/config-error.js";
import { attachConfigContext } from "../internal/config/context.js";
import { getNetworkProfile } from "../internal/config/network-profile.js";
import { validateClientChain, validateDeployments } from "../internal/config/validation.js";
import type { EnsforgeServiceValues } from "../internal/services/context.js";
import { makeServicesContext } from "../internal/services/context.js";
import {
  EnsforgeConfigTypeId,
  type CreateConfigParameters,
  type EnsforgeConfig,
} from "./config.js";
import { ensChainIds, EnsNetworkSchema } from "./network.js";
import { resolveReadOptions } from "./read-options.js";
import { resolveWriteOptions } from "./write-options.js";

export const createConfig = (parameters: CreateConfigParameters): EnsforgeConfig => {
  if (!Schema.is(EnsNetworkSchema)(parameters.network)) {
    throw new ConfigError({
      code: "UNSUPPORTED_NETWORK",
      message: `Unsupported ENS network: ${parameters.network}`,
    });
  }

  const network = parameters.network;
  const chainId = ensChainIds[network];
  const deployments = getNetworkProfile(network);
  const reads = resolveReadOptions(parameters.reads);
  const writes = resolveWriteOptions(parameters.writes);

  validateClientChain(parameters.publicClient, "public", network, chainId);

  if (parameters.walletClient !== undefined) {
    validateClientChain(parameters.walletClient, "wallet", network, chainId);
  }

  validateDeployments(deployments, chainId);

  const serviceValues: EnsforgeServiceValues = {
    network,
    chainId,
    publicClient: parameters.publicClient,
    reads,
    deployments,
    ...(parameters.walletClient === undefined ? {} : { walletClient: parameters.walletClient }),
  };
  const config = attachConfigContext(
    {
      [EnsforgeConfigTypeId]: EnsforgeConfigTypeId,
      network,
      chainId,
      publicClient: parameters.publicClient,
      reads,
      writes,
      deployments,
      ...(parameters.walletClient === undefined ? {} : { walletClient: parameters.walletClient }),
    },
    makeServicesContext(serviceValues),
  );

  return Object.freeze(config);
};
