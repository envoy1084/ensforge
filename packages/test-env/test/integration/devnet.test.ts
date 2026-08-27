import { Effect, Exit, Scope } from "effect";

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

import { DockerEngine } from "../../src/devnet/docker-engine.js";
import { startDevnet } from "../../src/devnet/lifecycle.js";
import { ensDevnetChainId, ensDevnetPublishedImage } from "../../src/devnet/source.js";
import { createDevnetEnvironment } from "../../src/environment.js";
import type { DevnetEnvironment } from "../../src/environment.js";
import type { EnsFixtureManifest } from "../../src/fixtures/manifest.js";
import { seedFixtures } from "../../src/fixtures/seed.js";

const image = process.env.ENSFORGE_TEST_IMAGE ?? ensDevnetPublishedImage;

describe("published ENS devnet", () => {
  let environment: DevnetEnvironment;
  let fixtures: EnsFixtureManifest;
  let scope: Scope.Closeable;

  beforeAll(async () => {
    scope = await Effect.runPromise(Scope.make("sequential"));
    environment = await Effect.runPromise(
      Effect.gen(function* () {
        const instance = yield* startDevnet({ build: "never", image });
        return yield* createDevnetEnvironment(instance);
      }).pipe(Effect.provideService(Scope.Scope, scope), Effect.provide(DockerEngine.layer)),
    );
    fixtures = await Effect.runPromise(seedFixtures(environment));
  }, 180_000);

  beforeEach(async () => {
    await Effect.runPromise(environment.state.reset);
  });

  afterAll(async () => {
    await Effect.runPromise(Scope.close(scope, Exit.void));
  });

  it("starts and exposes valid deployment metadata", async () => {
    expect(environment.instance.image).toBe(image);
    expect(environment.clients.chain.id).toBe(ensDevnetChainId);
    expect(environment.deployments.v1.protocol).toBe("v1");
    expect(environment.deployments.v2.protocol).toBe("v2");
    expect(environment.configs.v1.deployments.protocol).toBe("v1");
    expect(environment.configs.v2.deployments.protocol).toBe("v2");
    expect(environment.configs.v1.publicClient).toBe(environment.clients.publicClient);
    expect(environment.configs.v2.walletClient).toBe(environment.clients.walletClient);
  }, 180_000);

  it("can mutate isolated EVM state", async () => {
    await environment.clients.testClient.setBalance({
      address: environment.accounts.unauthorized,
      value: 1n,
    });

    expect(
      await environment.clients.publicClient.getBalance({
        address: environment.accounts.unauthorized,
      }),
    ).toBe(1n);
  });

  it("exposes verified v1 ownership, resolver, wrapping, expiry, and reverse fixtures", () => {
    expect(fixtures.v1.activeUnwrapped.owner).toBe(environment.accounts.owner);
    expect(fixtures.v1.activeWrapped.owner).toBe(environment.accounts.owner);
    expect(fixtures.v1.wrappedSubname.owner).toBe(environment.accounts.owner2);
    expect(fixtures.v1.noResolver.resolverState).toBe("missing");
    expect(fixtures.v1.grace.lifecycle).toBe("grace");
    expect(fixtures.v1.expired.lifecycle).toBe("expired");
    expect(fixtures.v1.reverse.name).toBe("v1-unwrapped.eth");
  });

  it("exposes verified native v2 and migration fixtures", () => {
    expect(fixtures.v2?.active.protocol).toBe("v2");
    expect(fixtures.v2?.inheritedResolver.resolverState).toBe("inherited");
    expect(fixtures.v2?.noResolver.resolverState).toBe("missing");
    expect(fixtures.v2?.grace.lifecycle).toBe("grace");
    expect(fixtures.v2?.expired.lifecycle).toBe("expired");
    expect(fixtures.migration?.reservedUnwrapped.name).toBe("v2-reserved-unwrapped.eth");
    expect(fixtures.migration?.migratedUnlocked.owner).toBe(environment.accounts.owner);
    expect(fixtures.migration?.migratedLocked.owner).toBe(environment.accounts.owner);
    expect(fixtures.migration?.mirroredChild.owner).toBe(environment.accounts.owner2);
  });

  it("restores the baseline before the next test", async () => {
    expect(
      await environment.clients.publicClient.getBalance({
        address: environment.accounts.unauthorized,
      }),
    ).not.toBe(1n);
  });
});
