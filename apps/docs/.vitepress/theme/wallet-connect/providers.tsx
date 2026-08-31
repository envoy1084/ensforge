import { type ReactNode, useEffect, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { darkTheme, lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";

import { docsWagmiConfig } from "./config";

const queryClient = new QueryClient();

const isDarkMode = () => document.documentElement.classList.contains("dark");

export function WalletProviders({ children }: { readonly children: ReactNode }) {
  const [isDark, setIsDark] = useState(isDarkMode);

  useEffect(() => {
    const observer = new MutationObserver(() => setIsDark(isDarkMode()));
    observer.observe(document.documentElement, {
      attributeFilter: ["class"],
      attributes: true,
    });
    return () => observer.disconnect();
  }, []);

  const theme = isDark
    ? darkTheme({ accentColor: "#8f8cff", borderRadius: "medium" })
    : lightTheme({ accentColor: "#4559d8", borderRadius: "medium" });

  return (
    <WagmiProvider config={docsWagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider initialChain={mainnet} modalSize="compact" theme={theme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
