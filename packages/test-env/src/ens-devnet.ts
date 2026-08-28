import { Effect, Exit, Scope } from "effect";

import type { DevnetAccounts } from "./accounts/accounts.js";
import type { DevnetClients } from "./clients/clients.js";
import type { DevnetConfigs } from "./config/config.js";
import type { DevnetDeployments } from "./deployments/profile.js";
import { DockerEngine } from "./devnet/docker-engine.js";
import { startDevnet, type DevnetInstance, type DevnetOptions } from "./devnet/lifecycle.js";
import { ensDevnetPublishedImage } from "./devnet/source.js";
import { createDevnetEnvironment } from "./environment.js";
import type { EnsFixtureManifest } from "./fixtures/manifest.js";
import { seedFixtures } from "./fixtures/seed.js";

export interface EnsDevnet {
  readonly accounts: DevnetAccounts;
  readonly clients: DevnetClients;
  readonly configs: DevnetConfigs;
  readonly deployments: DevnetDeployments;
  readonly fixtures: EnsFixtureManifest;
  readonly instance: DevnetInstance;
  readonly metadataUrl: string;
  readonly rpcUrl: string;
  readonly increaseTime: (seconds: number) => Promise<void>;
  readonly mine: (blocks?: number, interval?: number) => Promise<void>;
  readonly reset: () => Promise<void>;
  readonly stop: () => Promise<void>;
  readonly [Symbol.asyncDispose]: () => Promise<void>;
}

export interface StartEnsDevnetOptions extends DevnetOptions {
  /** Use the immutable published image by default so local and CI runs share the same contracts. */
  readonly image?: string;
}

export const startEnsDevnet = async (options: StartEnsDevnetOptions = {}): Promise<EnsDevnet> => {
  const scope = await Effect.runPromise(Scope.make("sequential"));
  let stopped = false;

  const stop = async (): Promise<void> => {
    if (stopped) return;
    stopped = true;
    await Effect.runPromise(Scope.close(scope, Exit.void));
  };

  try {
    const { environment, fixtures } = await Effect.runPromise(
      Effect.gen(function* () {
        const instance = yield* startDevnet({
          build: "never",
          ...options,
          image: options.image ?? process.env.ENSFORGE_TEST_IMAGE ?? ensDevnetPublishedImage,
        });
        const seededEnvironment = yield* createDevnetEnvironment(instance);
        const fixtureManifest = yield* seedFixtures(seededEnvironment);
        return { environment: seededEnvironment, fixtures: fixtureManifest };
      }).pipe(Effect.provideService(Scope.Scope, scope), Effect.provide(DockerEngine.layer)),
    );

    return {
      accounts: environment.accounts,
      clients: environment.clients,
      configs: environment.configs,
      deployments: environment.deployments,
      fixtures,
      instance: environment.instance,
      metadataUrl: environment.instance.metadataUrl,
      rpcUrl: environment.instance.rpcUrl,
      increaseTime: (seconds) => Effect.runPromise(environment.state.advanceTime(seconds)),
      mine: (blocks, interval) => Effect.runPromise(environment.state.mine(blocks, interval)),
      reset: () => Effect.runPromise(environment.state.reset),
      stop,
      [Symbol.asyncDispose]: stop,
    };
  } catch (cause) {
    await stop();
    throw cause;
  }
};
