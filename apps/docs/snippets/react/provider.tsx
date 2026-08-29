import type { ReactNode } from "react";

import { EnsforgeProvider } from "@ensforge/react";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <EnsforgeProvider config={{ network: "mainnet", publicClient }}>{children}</EnsforgeProvider>
  );
}
