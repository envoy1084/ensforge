import { createPublicClient, custom, type PublicClient } from "viem";
import { mainnet } from "viem/chains";

export const testTransport = custom({
  request: () => Promise.reject(new Error("The test transport must not make an RPC request")),
});

export const makeMainnetPublicClient = (): PublicClient =>
  createPublicClient({ chain: mainnet, transport: testTransport });
