import { createPublicClient, http, type PublicClient } from "viem";
import { mainnet } from "viem/chains";

import { createConfig } from "../../../src/index.js";

const readMainnetRpcUrl = (): string => {
  const value = process.env.ENSFORGE_MAINNET_RPC_URL;
  if (value === undefined || value.length === 0) {
    throw new Error(
      "ENSFORGE_MAINNET_RPC_URL is required. Run the suite with `ENSFORGE_MAINNET_RPC_URL=https://… pnpm test:live:mainnet`.",
    );
  }

  const url = new URL(value);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("ENSFORGE_MAINNET_RPC_URL must use HTTP or HTTPS");
  }
  return value;
};

export const mainnetRpcUrl = readMainnetRpcUrl();

export const mainnetPublicClient: PublicClient = createPublicClient({
  chain: mainnet,
  transport: http(mainnetRpcUrl, {
    retryCount: 2,
    timeout: 20_000,
  }),
});

export const mainnetConfig = createConfig({
  network: "mainnet",
  publicClient: mainnetPublicClient,
  ...(process.env.ENSFORGE_MAINNET_V1_INDEXER_URL === undefined
    ? {}
    : { indexer: { endpoints: { v1: process.env.ENSFORGE_MAINNET_V1_INDEXER_URL } } }),
});

export const mainnetNames = {
  ccipRead: "test.offchaindemo.eth",
  dns: "alisha.beam.eco",
  multichain: "test.ses.eth",
  reverse: "vitalik.eth",
  standard: "ens.eth",
  universalResolver: "ur.integration-tests.eth",
} as const;

export const missingMainnetName =
  `ensforge-smoke-${Date.now().toString(36)}-${process.pid.toString(36)}.eth` as const;
