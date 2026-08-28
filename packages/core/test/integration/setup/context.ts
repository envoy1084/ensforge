import type { DevnetAccounts, DevnetDeployments, EnsFixtureManifest } from "@ensforge/test-env";

export interface IntegrationDevnetContext {
  readonly accounts: DevnetAccounts;
  readonly deployments: DevnetDeployments;
  readonly fixtures: EnsFixtureManifest;
  readonly rpcUrl: string;
}

declare module "vitest" {
  export interface ProvidedContext {
    readonly ensDevnet: IntegrationDevnetContext;
  }
}
