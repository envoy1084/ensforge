import { Effect } from "effect";

import { describe, expect, it } from "vitest";

import { DockerEngine } from "../../src/devnet/docker-engine.js";
import { startDevnet } from "../../src/devnet/lifecycle.js";
import { ensDevnetChainId, ensDevnetPublishedImage } from "../../src/devnet/source.js";

const image = process.env.ENSFORGE_TEST_IMAGE ?? ensDevnetPublishedImage;

describe("published ENS devnet", () => {
  it("starts and exposes valid deployment metadata", async () => {
    const instance = await Effect.runPromise(
      Effect.scoped(startDevnet({ build: "never", image })).pipe(
        Effect.provide(DockerEngine.layer),
      ),
    );

    expect(instance.image).toBe(image);
    expect(instance.deployments.chainId).toBe(ensDevnetChainId);
    expect(Object.keys(instance.deployments.contracts).length).toBeGreaterThan(0);
  }, 180_000);
});
