"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Avatar } from "@thenamespace/uikit/avatar";
import { Button } from "@thenamespace/uikit/button";

const shortenAddress = (address: string): string => `${address.slice(0, 6)}…${address.slice(-4)}`;

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
            className="ensforge-demo ensforge-wallet-control flex items-center"
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
                className="ensforge-wallet-button rounded-lg"
                size="sm"
                variant="secondary"
                onPress={openConnectModal}
              >
                Connect
              </Button>
            ) : chain.unsupported ? (
              <Button
                aria-label="Switch to a supported network"
                className="ensforge-wallet-button rounded-lg"
                size="sm"
                variant="danger"
                onPress={openChainModal}
              >
                Wrong network
              </Button>
            ) : (
              <Button
                aria-label={`Open wallet account for ${account.ensName ?? account.address}`}
                className="ensforge-wallet-button rounded-lg"
                size="sm"
                variant="secondary"
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
                <span>{account.ensName ?? shortenAddress(account.address)}</span>
              </Button>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
