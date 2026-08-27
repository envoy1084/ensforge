import { Context, Layer, Option } from "effect";

import type { PublicClient, WalletClient } from "viem";

import type {
  EnsDeploymentProfile,
  EnsRuntimeChainId,
  EnsRuntimeNetwork,
} from "../config/config.js";
import { EthereumClient, makeEthereumClient } from "../internal/client/ethereum-client.js";
import { ReadExecution, makeReadExecution } from "../internal/read/execution-context.js";
import { DeploymentService } from "./deployment.js";
import { EnsNetworkService } from "./network.js";
import { PublicClientService } from "./public-client.js";
import { WalletClientService } from "./wallet-client.js";

export type EnsforgeServices =
  | DeploymentService
  | EthereumClient
  | ReadExecution
  | EnsNetworkService
  | PublicClientService
  | WalletClientService;

export interface EnsforgeServiceValues {
  readonly network: EnsRuntimeNetwork;
  readonly chainId: EnsRuntimeChainId;
  readonly publicClient: PublicClient;
  readonly walletClient?: WalletClient;
  readonly deployments: EnsDeploymentProfile;
}

export const makeServicesContext = (
  values: EnsforgeServiceValues,
): Context.Context<EnsforgeServices> =>
  Context.make(EnsNetworkService, {
    network: values.network,
    chainId: values.chainId,
  }).pipe(
    Context.add(PublicClientService, { client: values.publicClient }),
    Context.add(EthereumClient, makeEthereumClient({ publicClient: values.publicClient })),
    Context.add(ReadExecution, makeReadExecution({ publicClient: values.publicClient })),
    Context.add(WalletClientService, {
      client: Option.fromNullishOr(values.walletClient),
    }),
    Context.add(DeploymentService, { profile: values.deployments }),
  );

export const makeServicesLayer = (values: EnsforgeServiceValues): Layer.Layer<EnsforgeServices> =>
  Layer.succeedContext(makeServicesContext(values));
