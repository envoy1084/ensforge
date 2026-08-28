import { expectTypeOf } from "vitest";

import {
  createConfig,
  type CreateConfigParameters,
  type ConfigErrorCode,
  type EnsNetwork,
  type EnsforgeConfig,
} from "../../../src/index.js";
import { makeMainnetPublicClient } from "../fixtures/client-fixtures.js";

expectTypeOf<EnsNetwork>().toEqualTypeOf<"mainnet" | "sepolia">();

const parameters = {
  network: "mainnet",
  publicClient: makeMainnetPublicClient(),
} as const satisfies CreateConfigParameters;
const config = createConfig(parameters);

expectTypeOf(config).toEqualTypeOf<EnsforgeConfig>();
expectTypeOf(config.chainId).toEqualTypeOf<1 | 11155111>();
expectTypeOf(config.deployments.protocol).toEqualTypeOf<"v1" | "v2">();

const configErrorCode: ConfigErrorCode = "NETWORK_CLIENT_MISMATCH";

// @ts-expect-error Ensforge intentionally supports one production or test ENS network per config.
const unsupportedNetwork: EnsNetwork = "holesky";
// @ts-expect-error Config error codes are uppercase schema literals.
const unsupportedConfigErrorCode: ConfigErrorCode = "network_client_mismatch";
// @ts-expect-error Config properties are immutable.
config.network = "sepolia";

void unsupportedNetwork;
void configErrorCode;
void unsupportedConfigErrorCode;
