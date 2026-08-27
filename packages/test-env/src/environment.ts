import { Effect } from "effect";

import { devnetAccounts } from "./accounts/accounts.js";
import { createDevnetClients, verifyDevnetClients } from "./clients/clients.js";
import { createDevnetConfigs } from "./config/config.js";
import { mapDevnetDeployments } from "./deployments/profile.js";
import type { DevnetInstance } from "./devnet/lifecycle.js";
import { createDevnetState } from "./state/snapshot.js";

export const createDevnetEnvironment = Effect.fn("createDevnetEnvironment")(function* (
  instance: DevnetInstance,
) {
  const deployments = yield* mapDevnetDeployments(instance.deployments);
  const clients = createDevnetClients(instance.rpcUrl, deployments.multicall3);
  yield* verifyDevnetClients(clients, deployments.requiredAddresses);
  const configs = yield* createDevnetConfigs(deployments, clients);
  const state = yield* createDevnetState(clients.testClient);

  return {
    accounts: devnetAccounts,
    clients,
    configs,
    deployments,
    instance,
    state,
  };
});

export type DevnetEnvironment = Effect.Success<ReturnType<typeof createDevnetEnvironment>>;
