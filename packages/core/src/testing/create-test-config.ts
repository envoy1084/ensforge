import type { PublicClient, WalletClient } from "viem";

import type { EnsDeploymentProfile, EnsforgeConfig } from "../config/config.js";
import { EnsforgeConfigTypeId } from "../config/config.js";
import { attachConfigContext } from "../internal/config/context.js";
import { validateClientChain, validateDeployments } from "../internal/config/validation.js";
import { makeServicesContext } from "../internal/services/context.js";

export const ensTestChainId = 31337 as const;

export interface CreateTestConfigParameters {
  readonly deployments: EnsDeploymentProfile;
  readonly publicClient: PublicClient;
  readonly walletClient?: WalletClient;
}

export const createTestConfig = (parameters: CreateTestConfigParameters): EnsforgeConfig => {
  validateClientChain(parameters.publicClient, "public", "devnet", ensTestChainId);

  if (parameters.walletClient !== undefined) {
    validateClientChain(parameters.walletClient, "wallet", "devnet", ensTestChainId);
  }

  validateDeployments(parameters.deployments, ensTestChainId);

  const serviceValues = {
    network: "devnet",
    chainId: ensTestChainId,
    publicClient: parameters.publicClient,
    deployments: parameters.deployments,
    ...(parameters.walletClient === undefined ? {} : { walletClient: parameters.walletClient }),
  } as const;

  return Object.freeze(
    attachConfigContext(
      // The public config type intentionally excludes local networks. This cast remains confined to
      // the unpublished testing entry point while runtime services retain the real devnet values.
      {
        [EnsforgeConfigTypeId]: EnsforgeConfigTypeId,
        ...serviceValues,
      } as unknown as EnsforgeConfig,
      makeServicesContext(serviceValues),
    ),
  );
};
