import { Context, Effect, Option } from "effect";

import type { Account, Address, WalletClient } from "viem";

import { EnsforgeConfigError } from "../config/configuration-error.js";
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
  EnsforgeConfigError,
  WalletClientService | EnsNetworkService
> {
  const walletService = yield* WalletClientService;
  const networkService = yield* EnsNetworkService;
  const walletClient = parameters.walletClient ?? Option.getOrUndefined(walletService.client);

  if (walletClient === undefined) {
    return yield* new EnsforgeConfigError({
      code: "WALLET_CLIENT_UNAVAILABLE",
      message: "A wallet client is required for this operation",
    });
  }

  if (walletClient.chain === undefined) {
    return yield* new EnsforgeConfigError({
      code: "CLIENT_CHAIN_UNAVAILABLE",
      message: "The wallet client must be configured with a chain",
    });
  }

  if (walletClient.chain.id !== networkService.chainId) {
    return yield* new EnsforgeConfigError({
      code: "NETWORK_CLIENT_MISMATCH",
      message: `The wallet client chain ${walletClient.chain.id} does not match ${networkService.network} (${networkService.chainId})`,
    });
  }

  const account = parameters.account ?? walletClient.account;

  if (account === undefined) {
    return yield* new EnsforgeConfigError({
      code: "WALLET_ACCOUNT_UNAVAILABLE",
      message: "An account is required for this operation",
    });
  }

  return { walletClient, account };
});
