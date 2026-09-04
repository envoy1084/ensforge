export type Network = "mainnet" | "sepolia";

export const defaultNameByNetwork = {
  mainnet: "raffy.eth",
  sepolia: "ensforge.eth",
} as const satisfies Readonly<Record<Network, string>>;

export const zeroAddress = "0x0000000000000000000000000000000000000000" as const;

export const defaultAccountByNetwork = {
  mainnet: "0x51050ec063d393217B436747617aD1C2285Aeeee",
  sepolia: "0x5b7d523F27C5b2232536fB900EBffB590d03fF5d",
} as const satisfies Readonly<Record<Network, `0x${string}`>>;

export const defaultResolverByNetwork = {
  mainnet: "0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63",
  sepolia: "0xE16A76048Be88d135d116C8152AcA6EB94b3bE44",
} as const satisfies Readonly<Record<Network, `0x${string}`>>;
