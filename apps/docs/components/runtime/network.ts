export type Network = "mainnet" | "sepolia";

export const defaultNameByNetwork = {
  mainnet: "ens.eth",
  sepolia: "ensforge-smoke.eth",
} as const satisfies Readonly<Record<Network, string>>;

export const zeroAddress = "0x0000000000000000000000000000000000000000" as const;
