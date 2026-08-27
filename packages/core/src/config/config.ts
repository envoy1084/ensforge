import type { EnsV1Deployment, EnsV2Deployment } from "@ensforge/contracts/deployments";
import type { PublicClient, WalletClient } from "viem";

import type { EnsChainId, EnsNetwork } from "./network.js";

export const EnsforgeConfigTypeId: unique symbol = Symbol.for("@ensforge/core/EnsforgeConfig");

export type EnsDeployment = EnsV1Deployment | EnsV2Deployment;

export type EnsDeploymentProfile =
  | {
      readonly phase: "v1";
      readonly v1: EnsV1Deployment;
      readonly v2?: never;
    }
  | {
      readonly phase: "v2-transition";
      readonly v1: EnsV1Deployment;
      readonly v2: EnsV2Deployment;
    }
  | {
      readonly phase: "v2";
      readonly v1?: EnsV1Deployment;
      readonly v2: EnsV2Deployment;
    };

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
