import { Schema } from "effect";

import type { EnsforgeConfig } from "../config/config.js";
import { ensChainIds, EnsNetworkSchema } from "../config/network.js";
import { ConfigError } from "../errors/config-error.js";
import { createConfigFromClients } from "../internal/config/create-config.js";
import {
  getWagmiPublicClient,
  makeWagmiWalletClientResolver,
} from "../internal/config/wagmi-clients.js";
import type { CreateWagmiConfigParameters } from "./config.js";

export const createWagmiConfig = (parameters: CreateWagmiConfigParameters): EnsforgeConfig => {
  if (!Schema.is(EnsNetworkSchema)(parameters.network)) {
    throw new ConfigError({
      code: "UNSUPPORTED_NETWORK",
      message: `Unsupported ENS network: ${parameters.network}`,
    });
  }

  const chainId = ensChainIds[parameters.network];
  const publicClient = getWagmiPublicClient(parameters.wagmiConfig, parameters.network, chainId);

  return createConfigFromClients(parameters, publicClient, {
    walletClientResolver: makeWagmiWalletClientResolver(
      parameters.wagmiConfig,
      parameters.network,
      chainId,
    ),
  });
};
