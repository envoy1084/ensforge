import { Ensforge } from "@ensforge/sdk";
import { createPublicClient, custom, type PublicClient } from "viem";
import { mainnet } from "viem/chains";

const transport = custom({
  request: () => Promise.reject(new Error("The test transport must not make an RPC request")),
});

export const makePublicClient = (): PublicClient =>
  createPublicClient({ chain: mainnet, transport });

export const makeSdk = (): Ensforge =>
  new Ensforge({
    network: "mainnet",
    publicClient: makePublicClient(),
  });
