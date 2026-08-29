import type { EnsV1Deployment, EnsV2Deployment } from "@ensforge/contracts/deployments";
import type { PublicClient, WalletClient } from "viem";
import type { Config as WagmiConfig } from "wagmi";

import type { EnsProtocol } from "../schemas/protocol.js";
import type { GatewayOptions, ResolvedGatewayOptions } from "./gateway-options.js";
import type { EnsChainId, EnsNetwork } from "./network.js";
import type { ReadOptions, ResolvedReadOptions } from "./read-options.js";
import type { ResolvedWriteOptions, WriteOptions } from "./write-options.js";

export const EnsforgeConfigTypeId: unique symbol = Symbol.for("@ensforge/core/EnsforgeConfig");

export type EnsDeployment = EnsV1Deployment | EnsV2Deployment;

export type EnsDeploymentProfile =
  | {
      readonly protocol: Extract<EnsProtocol, "v1">;
      readonly v1: EnsV1Deployment;
      readonly v2?: never;
    }
  | {
      readonly protocol: Extract<EnsProtocol, "v2">;
      readonly v1?: EnsV1Deployment;
      readonly v2: EnsV2Deployment;
    };

interface SharedCreateConfigParameters {
  readonly network: EnsNetwork;
  readonly reads?: ReadOptions;
  readonly writes?: WriteOptions;
  readonly gateways?: GatewayOptions;
}

export interface CreateViemConfigParameters extends SharedCreateConfigParameters {
  readonly publicClient: PublicClient;
  readonly walletClient?: WalletClient;
  readonly wagmiConfig?: never;
}

export interface CreateWagmiConfigParameters extends SharedCreateConfigParameters {
  readonly wagmiConfig: WagmiConfig;
  readonly publicClient?: never;
  readonly walletClient?: never;
}

export type CreateConfigParameters = CreateViemConfigParameters | CreateWagmiConfigParameters;

export type EnsRuntimeNetwork = EnsNetwork | "devnet";
export type EnsRuntimeChainId = EnsChainId | 31337;

/** Immutable, single-network configuration consumed by every Ensforge action. */
export interface EnsforgeConfig {
  readonly [EnsforgeConfigTypeId]: typeof EnsforgeConfigTypeId;
  readonly network: EnsNetwork;
  readonly chainId: EnsChainId;
  readonly publicClient: PublicClient;
  readonly walletClient?: WalletClient;
  readonly reads: ResolvedReadOptions;
  readonly writes: ResolvedWriteOptions;
  readonly gateways: ResolvedGatewayOptions;
  readonly deployments: EnsDeploymentProfile;
}
