import { Ensforge } from "@ensforge/sdk";
import { createPublicClient, http } from "viem";
import { mainnet, sepolia } from "viem/chains";

export type DemoNetwork = "mainnet" | "sepolia";

export interface ReadActionField {
  readonly key: string;
  readonly kind: "address" | "name" | "text";
  readonly label: string;
  readonly placeholder: string;
  readonly required?: boolean;
}

export interface ReadActionDefinition {
  readonly description: string;
  readonly fields: ReadonlyArray<ReadActionField>;
  readonly initialValues: Readonly<Record<string, string>>;
  readonly label: string;
  readonly run: (sdk: Ensforge, values: Readonly<Record<string, string>>) => Promise<unknown>;
}

const sdkByNetwork = {
  mainnet: new Ensforge({
    network: "mainnet",
    publicClient: createPublicClient({
      chain: mainnet,
      transport: http(import.meta.env.VITE_ENSFORGE_MAINNET_RPC_URL),
    }),
  }),
  sepolia: new Ensforge({
    network: "sepolia",
    publicClient: createPublicClient({
      chain: sepolia,
      transport: http(import.meta.env.VITE_ENSFORGE_SEPOLIA_RPC_URL),
    }),
  }),
} as const;

export const getDemoSdk = (network: DemoNetwork): Ensforge => {
  return sdkByNetwork[network];
};

export const readActionDefinitions = {
  getOwner: {
    description: "Resolve the effective owner, registrant, and ownership level for an ENS name.",
    fields: [
      {
        key: "name",
        kind: "name",
        label: "Name",
        placeholder: "ens.eth",
        required: true,
      },
    ],
    initialValues: { name: "ens.eth" },
    label: "getOwner",
    run: (sdk, values) => sdk.name.getOwner({ name: values.name ?? "" }),
  },
} satisfies Record<string, ReadActionDefinition>;

export type ReadActionId = keyof typeof readActionDefinitions;
