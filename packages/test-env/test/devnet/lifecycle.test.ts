import { Effect, Layer } from "effect";

import { afterEach, describe, expect, it, vi } from "vitest";

import { DockerEngine, type DockerEngineService } from "../../src/devnet/docker-engine.js";
import { startDevnet } from "../../src/devnet/lifecycle.js";

const address = "0x0000000000000000000000000000000000000001";

interface FakeDockerState {
  readonly removed: Array<string>;
  readonly service: DockerEngineService;
}

const makeFakeDocker = (): FakeDockerState => {
  const removed: Array<string> = [];
  return {
    removed,
    service: {
      build: () => Effect.void,
      hasImage: () => Effect.succeed(true),
      logs: () => Effect.succeed("devnet diagnostic output"),
      publishedPort: (_name, containerPort) =>
        Effect.succeed(containerPort === 8545 ? 18_545 : 18_000),
      remove: (name) =>
        Effect.sync(() => {
          removed.push(name);
        }),
      start: () => Effect.succeed("container-id"),
    },
  };
};

const provideDocker = <A, E, R>(effect: Effect.Effect<A, E, R>, service: DockerEngineService) =>
  Effect.provide(effect, Layer.succeed(DockerEngine, service));

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("managed ENS devnet", () => {
  it("discovers endpoints, validates deployments, and removes its container", async () => {
    const docker = makeFakeDocker();
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: string | URL | Request) => {
        const url = String(input);
        if (url.endsWith("/health")) return new Response("healthy\n");
        return Response.json({ chainId: "31337", ENSRegistry: address });
      }),
    );

    const instance = await Effect.runPromise(
      provideDocker(
        Effect.scoped(
          startDevnet({
            build: "never",
            containerName: "ensforge-test-success",
            healthTimeoutMs: 100,
            pollIntervalMs: 1,
          }),
        ),
        docker.service,
      ),
    );

    expect(instance).toMatchObject({
      containerId: "container-id",
      containerName: "ensforge-test-success",
      metadataUrl: "http://127.0.0.1:18000",
      rpcUrl: "http://127.0.0.1:18545",
    });
    expect(instance.deployments).toEqual({
      chainId: 31337,
      contracts: { ENSRegistry: address },
    });
    expect(docker.removed).toEqual(["ensforge-test-success"]);
  });

  it("captures logs and cleans up when deployment metadata is invalid", async () => {
    const docker = makeFakeDocker();
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: string | URL | Request) => {
        const url = String(input);
        if (url.endsWith("/health")) return new Response("healthy\n");
        return Response.json({ chainId: "1", ENSRegistry: address });
      }),
    );

    const error = await Effect.runPromise(
      Effect.flip(
        provideDocker(
          Effect.scoped(
            startDevnet({
              build: "never",
              containerName: "ensforge-test-invalid",
              healthTimeoutMs: 100,
              pollIntervalMs: 1,
            }),
          ),
          docker.service,
        ),
      ),
    );

    expect(error.code).toBe("DEPLOYMENTS_INVALID");
    expect(error.cause).toEqual(expect.objectContaining({ logs: "devnet diagnostic output" }));
    expect(docker.removed).toEqual(["ensforge-test-invalid"]);
  });

  it("times out an unhealthy container and still removes it", async () => {
    const docker = makeFakeDocker();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => Promise.reject(new Error("connection refused"))),
    );

    const error = await Effect.runPromise(
      Effect.flip(
        provideDocker(
          Effect.scoped(
            startDevnet({
              build: "never",
              containerName: "ensforge-test-unhealthy",
              healthTimeoutMs: 10,
              pollIntervalMs: 1,
            }),
          ),
          docker.service,
        ),
      ),
    );

    expect(error.code).toBe("HEALTHCHECK_FAILED");
    expect(docker.removed).toEqual(["ensforge-test-unhealthy"]);
  });
});
