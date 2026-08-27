import { expectTypeOf } from "vitest";

import {
  createConfig,
  type CreateConfigParameters,
  type EnsNetwork,
  type EnsforgeConfig,
} from "../src/index.js";
import { makeMainnetPublicClient } from "./client-fixtures.js";

expectTypeOf<EnsNetwork>().toEqualTypeOf<"mainnet" | "sepolia">();

const parameters = {
  network: "mainnet",
  publicClient: makeMainnetPublicClient(),
} as const satisfies CreateConfigParameters;
const config = createConfig(parameters);

expectTypeOf(config).toEqualTypeOf<EnsforgeConfig>();
expectTypeOf(config.chainId).toEqualTypeOf<1 | 11155111>();

// @ts-expect-error Ensforge intentionally supports one production or test ENS network per config.
const unsupportedNetwork: EnsNetwork = "holesky";
// @ts-expect-error Config properties are immutable.
config.network = "sepolia";

void unsupportedNetwork;
