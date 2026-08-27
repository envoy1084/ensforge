import { Effect } from "effect";

import { describe, expect, it } from "vitest";

import { DockerEngine } from "../../src/devnet/docker-engine.js";
import { startDevnet } from "../../src/devnet/lifecycle.js";
import { ensDevnetChainId, ensDevnetPublishedImage } from "../../src/devnet/source.js";
import { createDevnetEnvironment } from "../../src/environment.js";

const image = process.env.ENSFORGE_TEST_IMAGE ?? ensDevnetPublishedImage;

describe("published ENS devnet", () => {
  it("starts and exposes valid deployment metadata", async () => {
    const environment = await Effect.runPromise(
      Effect.scoped(
        Effect.gen(function* () {
          const instance = yield* startDevnet({ build: "never", image });
          return yield* createDevnetEnvironment(instance);
        }),
      ).pipe(Effect.provide(DockerEngine.layer)),
    );

    expect(environment.instance.image).toBe(image);
    expect(environment.clients.chain.id).toBe(ensDevnetChainId);
    expect(environment.deployments.v1.protocol).toBe("v1");
    expect(environment.deployments.v2.protocol).toBe("v2");
    expect(environment.configs.v1.deployments.protocol).toBe("v1");
    expect(environment.configs.v2.deployments.protocol).toBe("v2");
    expect(environment.configs.v1.publicClient).toBe(environment.clients.publicClient);
    expect(environment.configs.v2.walletClient).toBe(environment.clients.walletClient);
  }, 180_000);
});
