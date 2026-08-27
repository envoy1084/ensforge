import { Effect } from "effect";

import type { EnsforgeConfig } from "@ensforge/core";
import { createTestConfig } from "@ensforge/core/testing";

import type { DevnetClients } from "../clients/clients.js";
import type { DevnetDeployments } from "../deployments/profile.js";
import { TestEnvironmentError } from "../errors/test-environment-error.js";

export interface DevnetConfigs {
  readonly v1: EnsforgeConfig;
  readonly v2: EnsforgeConfig;
}

export const createDevnetConfigs = Effect.fn("createDevnetConfigs")(
  (deployments: DevnetDeployments, clients: DevnetClients) =>
    Effect.try({
      try: () => ({
        v1: createTestConfig({
          deployments: Object.freeze({ protocol: "v1", v1: deployments.v1 }),
          publicClient: clients.publicClient,
          walletClient: clients.walletClient,
        }),
        v2: createTestConfig({
          deployments: Object.freeze({
            protocol: "v2",
            v1: deployments.v1,
            v2: deployments.v2,
          }),
          publicClient: clients.publicClient,
          walletClient: clients.walletClient,
        }),
      }),
      catch: (cause) =>
        new TestEnvironmentError({
          code: "CONFIG_INVALID",
          message: "Unable to create ENS devnet configs",
          cause,
        }),
    }),
);
