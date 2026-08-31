import { Ensforge } from "@ensforge/sdk";
import { getAccount, getPublicClient, getWalletClient } from "wagmi/actions";
import { mainnet, sepolia } from "wagmi/chains";

import { wagmiConfig } from "./config";

export type Network = "mainnet" | "sepolia";

const configByNetwork = {
  mainnet: {
    chainId: mainnet.id,
    network: "mainnet",
    publicClient: getPublicClient(wagmiConfig, { chainId: mainnet.id }),
  },
  sepolia: {
    chainId: sepolia.id,
    network: "sepolia",
    publicClient: getPublicClient(wagmiConfig, { chainId: sepolia.id }),
  },
} as const;

export const getSdk = async (network: Network): Promise<Ensforge> => {
  const sdkConfig = configByNetwork[network];
  const connection = getAccount(wagmiConfig);

  if (connection.status !== "connected" || connection.chainId !== sdkConfig.chainId) {
    return new Ensforge(sdkConfig);
  }

  const walletClient = await getWalletClient(wagmiConfig, {
    chainId: sdkConfig.chainId,
  });

  return new Ensforge({ ...sdkConfig, walletClient });
};
