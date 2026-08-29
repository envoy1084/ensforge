import { createConfig } from "@ensforge/core";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

export const config = createConfig({
  network: "mainnet",
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});
