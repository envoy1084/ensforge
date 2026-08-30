import { Schema } from "effect";

import type { PublicClient, WalletClient } from "viem";

import type { SharedCreateConfigParameters, EnsforgeConfig } from "../../config/config.js";
import { EnsforgeConfigTypeId } from "../../config/config.js";
import { resolveGatewayOptions } from "../../config/gateway-options.js";
import { ensChainIds, EnsNetworkSchema } from "../../config/network.js";
import { resolveReadOptions } from "../../config/read-options.js";
import { resolveWriteOptions } from "../../config/write-options.js";
import { ConfigError } from "../../errors/config-error.js";
import type { EnsforgeServiceValues } from "../services/context.js";
import { makeServicesContext } from "../services/context.js";
import type { WalletClientResolver } from "../services/wallet-client.js";
import { attachConfigContext } from "./context.js";
import { getNetworkProfile } from "./network-profile.js";
import { validateClientChain, validateDeployments } from "./validation.js";

interface ConfigClients {
  readonly walletClient?: WalletClient;
  readonly walletClientResolver?: WalletClientResolver;
}

export const createConfigFromClients = (
  parameters: SharedCreateConfigParameters,
  publicClient: PublicClient,
  clients: ConfigClients = {},
): EnsforgeConfig => {
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
  const gateways = resolveGatewayOptions(parameters.gateways);

  validateClientChain(publicClient, "public", network, chainId);
  if (clients.walletClient !== undefined) {
    validateClientChain(clients.walletClient, "wallet", network, chainId);
  }
  validateDeployments(deployments, chainId);

  const serviceValues: EnsforgeServiceValues = {
    network,
    chainId,
    publicClient,
    reads,
    gateways,
    deployments,
    ...(clients.walletClient === undefined ? {} : { walletClient: clients.walletClient }),
    ...(clients.walletClientResolver === undefined
      ? {}
      : { walletClientResolver: clients.walletClientResolver }),
  };
  const config = attachConfigContext(
    {
      [EnsforgeConfigTypeId]: EnsforgeConfigTypeId,
      network,
      chainId,
      publicClient,
      reads,
      writes,
      gateways,
      deployments,
      ...(clients.walletClient === undefined ? {} : { walletClient: clients.walletClient }),
    },
    makeServicesContext(serviceValues),
  );

  return Object.freeze(config);
};
