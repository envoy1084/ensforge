import { Context, Effect } from "effect";

import type {
  Abi,
  ContractFunctionArgs,
  ContractFunctionName,
  MulticallParameters,
  MulticallReturnType,
  PublicClient,
  ReadContractParameters,
  ReadContractReturnType,
} from "viem";

import type { ViemError } from "../../errors/viem-error.js";
import { viemErrorToEffectError } from "../../errors/viem-error.js";

export interface EthereumClientOptions {
  readonly publicClient: PublicClient;
}

export interface EthereumClientService {
  readonly readContract: <
    const abi extends Abi | readonly unknown[],
    functionName extends ContractFunctionName<abi, "pure" | "view">,
    const args extends ContractFunctionArgs<abi, "pure" | "view", functionName>,
  >(
    parameters: ReadContractParameters<abi, functionName, args>,
  ) => Effect.Effect<ReadContractReturnType<abi, functionName, args>, ViemError>;

  readonly multicall: <
    const contracts extends readonly unknown[],
    const allowFailure extends boolean = true,
  >(
    parameters: MulticallParameters<contracts, allowFailure>,
  ) => Effect.Effect<MulticallReturnType<contracts, allowFailure>, ViemError>;
}

export class EthereumClient extends Context.Service<EthereumClient, EthereumClientService>()(
  "@ensforge/core/internal/client/EthereumClient",
) {}

export const makeEthereumClient = ({
  publicClient,
}: EthereumClientOptions): EthereumClientService =>
  EthereumClient.of({
    readContract: Effect.fn("EthereumClient.readContract")((parameters) =>
      Effect.tryPromise({
        try: () => publicClient.readContract(parameters),
        catch: (cause) => viemErrorToEffectError(cause, "readContract"),
      }),
    ),
    multicall: Effect.fn("EthereumClient.multicall")((parameters) =>
      Effect.tryPromise({
        try: () => publicClient.multicall(parameters),
        catch: (cause) => viemErrorToEffectError(cause, "multicall"),
      }),
    ),
  });
