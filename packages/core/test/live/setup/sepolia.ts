import { createPublicClient, http, type PublicClient } from "viem";
import { sepolia } from "viem/chains";

import { createConfig } from "../../../src/index.js";

const readSepoliaRpcUrl = (): string => {
  const value = process.env.ENSFORGE_SEPOLIA_RPC_URL;
  if (value === undefined || value.length === 0) {
    throw new Error(
      "ENSFORGE_SEPOLIA_RPC_URL is required. Run the suite with `ENSFORGE_SEPOLIA_RPC_URL=https://… pnpm test:live:sepolia`.",
    );
  }

  const url = new URL(value);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("ENSFORGE_SEPOLIA_RPC_URL must use HTTP or HTTPS");
  }
  return value;
};

export const sepoliaRpcUrl = readSepoliaRpcUrl();

export const sepoliaPublicClient: PublicClient = createPublicClient({
  chain: sepolia,
  transport: http(sepoliaRpcUrl, {
    retryCount: 2,
    timeout: 20_000,
  }),
});

export const sepoliaConfig = createConfig({
  network: "sepolia",
  publicClient: sepoliaPublicClient,
  indexer: {
    timeout: 30_000,
    retry: { attempts: 1 },
    ...(process.env.ENSFORGE_SEPOLIA_V1_INDEXER_URL === undefined &&
    process.env.ENSFORGE_SEPOLIA_V2_INDEXER_URL === undefined
      ? {}
      : {
          endpoints: {
            ...(process.env.ENSFORGE_SEPOLIA_V1_INDEXER_URL === undefined
              ? {}
              : { v1: process.env.ENSFORGE_SEPOLIA_V1_INDEXER_URL }),
            ...(process.env.ENSFORGE_SEPOLIA_V2_INDEXER_URL === undefined
              ? {}
              : { v2: process.env.ENSFORGE_SEPOLIA_V2_INDEXER_URL }),
          },
        }),
  },
});

const configuredRoot = (process.env.ENSFORGE_SEPOLIA_V2_NAME ?? "ensforge-smoke.eth").toLowerCase();
const root = configuredRoot.endsWith(".eth") ? configuredRoot : `${configuredRoot}.eth`;
const rootLabel = root.slice(0, -4);

export const sepoliaNames = {
  v2: {
    root,
    bareRoot: `${rootLabel}-bare.eth`,
    profile: `profile.${root}`,
    empty: `empty.${root}`,
    inherited: `inherited.${root}`,
    alias: `alias.${root}`,
    dns: `dns.${root}`,
    permissioned: `permissioned.${root}`,
    differentOwner: `different-owner.${root}`,
    branch: `branch.${root}`,
    nested: `nested.branch.${root}`,
    customExpiry: `custom-expiry.${root}`,
    available: `${rootLabel}-available.eth`,
  },
  v1: {
    reserved: "vitalik.eth",
    resolverProfile: "resolver.eth",
    wrapped: "wrapped.eth",
  },
  migrated: "raffy.eth",
} as const;

export const sepoliaFixtureAccounts = {
  operator: "0x000000000000000000000000000000000000bEEF",
  secondary: "0x000000000000000000000000000000000000dEaD",
} as const;

export const missingSepoliaName =
  `${rootLabel}-missing-${Date.now().toString(36)}-${process.pid.toString(36)}.eth` as const;
