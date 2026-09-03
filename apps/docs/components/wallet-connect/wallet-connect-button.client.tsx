"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Avatar } from "@thenamespace/uikit/avatar";
import { Button } from "@thenamespace/uikit/button";

const shortenAddress = (address: string): string => `${address.slice(0, 6)}…${address.slice(-4)}`;

const walletButtonClassName =
  "h-8 min-w-max rounded-lg border-[var(--vocs-border-color-primary)] bg-[color-mix(in_srgb,var(--vocs-background-color-primary)_88%,transparent)] px-3 text-[0.8125rem] font-semibold text-[var(--vocs-text-color-primary)] hover:border-[color-mix(in_srgb,var(--vocs-text-color-muted)_45%,transparent)] hover:bg-[var(--vocs-background-color-surfaceTint)]";

const walletDangerButtonClassName = "h-8 min-w-max rounded-lg px-3 text-[0.8125rem] font-semibold";

export function WalletConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        authenticationStatus,
        chain,
        mounted,
        openAccountModal,
        openChainModal,
        openConnectModal,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            className="ensforge-wallet flex items-center"
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none" as const,
                userSelect: "none" as const,
              },
            })}
          >
            {!connected ? (
              <Button
                aria-label="Connect wallet"
                className={walletButtonClassName}
                size="sm"
                variant="outline"
                onPress={openConnectModal}
              >
                Connect
              </Button>
            ) : chain.unsupported ? (
              <Button
                aria-label="Switch to a supported network"
                className={walletDangerButtonClassName}
                size="sm"
                variant="danger"
                onPress={openChainModal}
              >
                Wrong network
              </Button>
            ) : (
              <Button
                aria-label={`Open wallet account for ${account.ensName ?? account.address}`}
                className={`${walletButtonClassName} max-w-56`}
                size="sm"
                variant="outline"
                onPress={openAccountModal}
              >
                {account.ensAvatar ? (
                  <Avatar className="size-5 shrink-0">
                    <Avatar.Image
                      alt={`${account.ensName ?? "Wallet"} avatar`}
                      src={account.ensAvatar}
                    />
                  </Avatar>
                ) : null}
                <span className="min-w-0 truncate">
                  {account.ensName ?? shortenAddress(account.address)}
                </span>
              </Button>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
