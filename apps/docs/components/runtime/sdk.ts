import { Ensforge } from "@ensforge/sdk";
import { getAccount, getPublicClient, getWalletClient } from "wagmi/actions";
import { mainnet, sepolia } from "wagmi/chains";

import type { Network } from "./network";
import { wagmiConfig } from "./wagmi-config";

const siteOrigin = typeof window === "undefined" ? "http://localhost:3000" : window.location.origin;
const indexerEndpoint = (network: Network, protocol: "v1" | "v2") =>
  new URL(`/api/indexer/${network}/${protocol}`, siteOrigin).href;

const parametersByNetwork = {
  mainnet: {
    network: "mainnet",
    publicClient: getPublicClient(wagmiConfig, { chainId: mainnet.id }),
    indexer: {
      endpoints: { v1: indexerEndpoint("mainnet", "v1") },
    },
  },
  sepolia: {
    network: "sepolia",
    publicClient: getPublicClient(wagmiConfig, { chainId: sepolia.id }),
    indexer: {
      endpoints: {
        v1: indexerEndpoint("sepolia", "v1"),
        v2: indexerEndpoint("sepolia", "v2"),
      },
    },
  },
} as const;

const sdkByNetwork = {
  mainnet: new Ensforge(parametersByNetwork.mainnet),
  sepolia: new Ensforge(parametersByNetwork.sepolia),
} as const;

export const getSdk = async (network: Network): Promise<Ensforge> => {
  const sdk = sdkByNetwork[network];
  const connection = getAccount(wagmiConfig);
  const chainId = network === "mainnet" ? mainnet.id : sepolia.id;

  if (connection.status !== "connected" || connection.chainId !== chainId) return sdk;

  const walletClient = await getWalletClient(wagmiConfig, { chainId });
  return new Ensforge({ ...parametersByNetwork[network], walletClient });
};
