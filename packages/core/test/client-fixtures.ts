import {
  createPublicClient,
  createWalletClient,
  custom,
  type PublicClient,
  type WalletClient,
} from "viem";
import { mainnet, sepolia } from "viem/chains";

export const testAccount = "0x0000000000000000000000000000000000000001";

const makeTransport = (onRequest?: () => void) =>
  custom({
    request: () => {
      onRequest?.();
      return Promise.reject(new Error("The test transport must not make an RPC request"));
    },
  });

export const makeMainnetPublicClient = (onRequest?: () => void): PublicClient =>
  createPublicClient({ chain: mainnet, transport: makeTransport(onRequest) });

export const makeSepoliaPublicClient = (onRequest?: () => void): PublicClient =>
  createPublicClient({ chain: sepolia, transport: makeTransport(onRequest) });

export const makeChainlessPublicClient = (): PublicClient =>
  createPublicClient({ transport: makeTransport() });

export const makeMainnetWalletClient = (): WalletClient =>
  createWalletClient({
    account: testAccount,
    chain: mainnet,
    transport: makeTransport(),
  });

export const makeSepoliaWalletClient = (): WalletClient =>
  createWalletClient({
    account: testAccount,
    chain: sepolia,
    transport: makeTransport(),
  });

export const makeSepoliaWalletClientWithoutAccount = (): WalletClient =>
  createWalletClient({
    chain: sepolia,
    transport: makeTransport(),
  });
