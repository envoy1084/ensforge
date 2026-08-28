import { startEnsDevnet } from "@ensforge/test-env";
import type { TestProject } from "vitest/node";

import type { IntegrationDevnetContext } from "./context.js";

export default async function setup(project: TestProject): Promise<() => Promise<void>> {
  const devnet = await startEnsDevnet();

  project.provide("ensDevnet", {
    accounts: devnet.accounts,
    deployments: devnet.deployments,
    fixtures: devnet.fixtures,
    rpcUrl: devnet.rpcUrl,
  } satisfies IntegrationDevnetContext);

  return () => devnet.stop();
}
