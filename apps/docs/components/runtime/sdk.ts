import { Ensforge } from "@ensforge/sdk";
import { getAccount, getPublicClient, getWalletClient } from "wagmi/actions";
import { mainnet, sepolia } from "wagmi/chains";

import type { Network } from "./network";
import { wagmiConfig } from "./wagmi-config";

const endpoint = (value: string | undefined): string | undefined => value?.trim() || undefined;

const endpoints = (v1: string | undefined, v2: string | undefined) => {
  const v1Endpoint = endpoint(v1);
  const v2Endpoint = endpoint(v2);
  return {
    ...(v1Endpoint === undefined ? {} : { v1: v1Endpoint }),
    ...(v2Endpoint === undefined ? {} : { v2: v2Endpoint }),
  };
};

const parametersByNetwork = {
  mainnet: {
    network: "mainnet",
    publicClient: getPublicClient(wagmiConfig, { chainId: mainnet.id }),
    indexer: {
      endpoints: endpoints(
        import.meta.env.VITE_ENSFORGE_MAINNET_V1_INDEXER_URL,
        import.meta.env.VITE_ENSFORGE_MAINNET_V2_INDEXER_URL,
      ),
    },
  },
  sepolia: {
    network: "sepolia",
    publicClient: getPublicClient(wagmiConfig, { chainId: sepolia.id }),
    indexer: {
      endpoints: endpoints(
        import.meta.env.VITE_ENSFORGE_SEPOLIA_V1_INDEXER_URL,
        import.meta.env.VITE_ENSFORGE_SEPOLIA_V2_INDEXER_URL,
      ),
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
