import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import { http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

const walletConnectProjectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID?.trim();

const wallets = walletConnectProjectId
  ? undefined
  : [
      {
        groupName: "Browser wallets",
        wallets: [injectedWallet],
      },
    ];

export const wagmiConfig = getDefaultConfig({
  appName: "ensforge",
  appDescription: "ENS tools for TypeScript and React",
  appUrl: "https://ensforge.envoy1084.xyz",
  chains: [mainnet, sepolia],
  projectId: walletConnectProjectId ?? "",
  ssr: true,
  transports: {
    [mainnet.id]: http(import.meta.env.VITE_ENSFORGE_MAINNET_RPC_URL || undefined),
    [sepolia.id]: http(import.meta.env.VITE_ENSFORGE_SEPOLIA_RPC_URL || undefined),
  },
  ...(wallets ? { wallets } : {}),
});
