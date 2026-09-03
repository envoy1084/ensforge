"use client";

import { type ReactNode, useEffect, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { darkTheme, lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";

import { wagmiConfig } from "../runtime/wagmi-config";

const queryClient = new QueryClient();

const isDarkMode = () =>
  typeof document !== "undefined" && document.documentElement.dataset.vocsTheme === "dark";

export function WalletProviders({ children }: { readonly children: ReactNode }) {
  const [isDark, setIsDark] = useState(isDarkMode);

  useEffect(() => {
    setIsDark(isDarkMode());
    const observer = new MutationObserver(() => setIsDark(isDarkMode()));
    observer.observe(document.documentElement, {
      attributeFilter: ["data-vocs-theme"],
      attributes: true,
    });
    return () => observer.disconnect();
  }, []);

  const theme = isDark
    ? darkTheme({
        accentColor: "#ffb21c",
        accentColorForeground: "#1b1007",
        borderRadius: "medium",
      })
    : lightTheme({ accentColor: "#d95712", borderRadius: "medium" });

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider initialChain={mainnet} modalSize="compact" theme={theme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
