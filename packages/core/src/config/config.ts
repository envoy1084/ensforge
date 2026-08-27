import type { EnsV1Deployment, EnsV2Deployment } from "@ensforge/contracts/deployments";
import type { PublicClient, WalletClient } from "viem";

import type { EnsChainId, EnsNetwork } from "./network.js";

export const EnsforgeConfigTypeId: unique symbol = Symbol.for("@ensforge/core/EnsforgeConfig");

export type EnsDeployment = EnsV1Deployment | EnsV2Deployment;

export interface EnsDeploymentProfile {
  readonly active: EnsDeployment;
  readonly compatibility: readonly EnsDeployment[];
}

export interface CreateConfigParameters {
  readonly network: EnsNetwork;
  readonly publicClient: PublicClient;
  readonly walletClient?: WalletClient;
}

/** Immutable, single-network configuration consumed by every Ensforge action. */
export interface EnsforgeConfig {
  readonly [EnsforgeConfigTypeId]: typeof EnsforgeConfigTypeId;
  readonly network: EnsNetwork;
  readonly chainId: EnsChainId;
  readonly publicClient: PublicClient;
  readonly walletClient?: WalletClient;
  readonly deployments: EnsDeploymentProfile;
}
