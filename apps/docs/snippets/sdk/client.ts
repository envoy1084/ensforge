import { Ensforge } from "@ensforge/sdk";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

export const sdk = new Ensforge({
  network: "mainnet",
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});
