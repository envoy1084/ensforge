"use client";

import type { ReactNode } from "react";

import { ClientOnly } from "./client-only.client";
import { WalletProviders } from "./wallet-connect/providers.client";
import { WalletConnectButton } from "./wallet-connect/wallet-connect-button.client";

export function DocsShell({ children }: { readonly children: ReactNode }) {
  return (
    <>
      {children}
      <ClientOnly>
        <WalletProviders>
          <div className="ensforge-wallet-slot">
            <WalletConnectButton />
          </div>
        </WalletProviders>
      </ClientOnly>
    </>
  );
}
