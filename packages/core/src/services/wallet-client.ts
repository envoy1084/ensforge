import { Context, Effect, Option } from "effect";

import type { Account, Address, WalletClient } from "viem";

import {
  ClientChainUnavailableError,
  NetworkClientMismatchError,
  WalletAccountUnavailableError,
  WalletClientUnavailableError,
  type WalletContextError,
} from "../config/configuration-error.js";
import { EnsNetworkService } from "./network.js";

export class WalletClientService extends Context.Service<
  WalletClientService,
  {
    readonly client: Option.Option<WalletClient>;
  }
>()("@ensforge/core/WalletClientService") {}

export interface ResolveWalletContextParameters {
  readonly walletClient?: WalletClient;
  readonly account?: Account | Address;
}

export interface ResolvedWalletContext {
  readonly walletClient: WalletClient;
  readonly account: Account | Address;
}

export const resolveWalletContext = Effect.fn("ensforge.resolveWalletContext")(function* (
  parameters: ResolveWalletContextParameters = {},
): Effect.fn.Return<
  ResolvedWalletContext,
  WalletContextError,
  WalletClientService | EnsNetworkService
> {
  const walletService = yield* WalletClientService;
  const networkService = yield* EnsNetworkService;
  const walletClient = parameters.walletClient ?? Option.getOrUndefined(walletService.client);

  if (walletClient === undefined) {
    return yield* new WalletClientUnavailableError();
  }

  if (walletClient.chain === undefined) {
    return yield* new ClientChainUnavailableError({ client: "wallet" });
  }

  if (walletClient.chain.id !== networkService.chainId) {
    return yield* new NetworkClientMismatchError({
      network: networkService.network,
      client: "wallet",
      expectedChainId: networkService.chainId,
      actualChainId: walletClient.chain.id,
    });
  }

  const account = parameters.account ?? walletClient.account;

  if (account === undefined) {
    return yield* new WalletAccountUnavailableError();
  }

  return { walletClient, account };
});
