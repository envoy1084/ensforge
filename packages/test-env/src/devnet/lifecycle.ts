import { randomUUID } from "node:crypto";

import { Effect, Schema } from "effect";
import type { Scope } from "effect/Scope";

import { DevnetDeploymentManifest, DevnetDeploymentResponse } from "../deployments/schema.js";
import { TestEnvironmentError } from "../errors/test-environment-error.js";
import { DockerEngine } from "./docker-engine.js";
import { ensDevnetChainId, ensDevnetImage, verifyContractsSource } from "./source.js";

export type DevnetBuildPolicy = "always" | "if-missing" | "never";

export interface DevnetOptions {
  readonly build?: DevnetBuildPolicy;
  readonly containerName?: string;
  readonly healthTimeoutMs?: number;
  readonly image?: string;
  readonly pollIntervalMs?: number;
  readonly sourceDirectory?: string;
}

export interface DevnetContainer {
  readonly containerId: string;
  readonly containerName: string;
  readonly image: string;
}

export interface DevnetInstance extends DevnetContainer {
  readonly deployments: DevnetDeploymentManifest;
  readonly metadataUrl: string;
  readonly rpcUrl: string;
}

export const buildDevnetImage = Effect.fn("buildDevnetImage")(function* (
  options: Pick<DevnetOptions, "build" | "image" | "sourceDirectory"> = {},
) {
  const docker = yield* DockerEngine;
  const image = options.image ?? ensDevnetImage;
  const build = options.build ?? "if-missing";

  if (build === "never") return image;

  if (build === "if-missing") {
    const exists = yield* docker.hasImage(image).pipe(
      Effect.mapError(
        (cause) =>
          new TestEnvironmentError({
            code: "BUILD_FAILED",
            message: `Unable to inspect the ENS devnet image ${image}`,
            cause,
          }),
      ),
    );
    if (exists) return image;
  }

  const source = yield* verifyContractsSource(
    options.sourceDirectory === undefined ? {} : { directory: options.sourceDirectory },
  );
  yield* docker.build(source.directory, image).pipe(
    Effect.mapError(
      (cause) =>
        new TestEnvironmentError({
          code: "BUILD_FAILED",
          message: `Unable to build the ENS devnet image ${image}`,
          cause,
        }),
    ),
  );

  return image;
});

export const waitForDevnetHealth = Effect.fn("waitForDevnetHealth")(function* (
  metadataUrl: string,
  options: Pick<DevnetOptions, "healthTimeoutMs" | "pollIntervalMs"> = {},
) {
  const pollIntervalMs = options.pollIntervalMs ?? 250;
  const healthTimeoutMs = options.healthTimeoutMs ?? 120_000;

  const poll = (): Effect.Effect<void> =>
    Effect.tryPromise({
      try: (signal) => fetch(`${metadataUrl}/health`, { signal }),
      catch: () => undefined,
    }).pipe(
      Effect.flatMap((response) =>
        response !== undefined && response.ok
          ? Effect.tryPromise({
              try: () => response.text(),
              catch: () => "",
            }).pipe(
              Effect.flatMap((body) =>
                body.trim() === "healthy" ? Effect.void : Effect.fail(undefined),
              ),
            )
          : Effect.fail(undefined),
      ),
      Effect.catch(() => Effect.sleep(pollIntervalMs).pipe(Effect.andThen(Effect.suspend(poll)))),
    );

  yield* poll().pipe(
    Effect.timeout(healthTimeoutMs),
    Effect.mapError(
      (cause) =>
        new TestEnvironmentError({
          code: "HEALTHCHECK_FAILED",
          message: `ENS devnet did not become healthy within ${healthTimeoutMs}ms`,
          cause,
        }),
    ),
  );
});

export const fetchDevnetDeployments = Effect.fn("fetchDevnetDeployments")(function* (
  metadataUrl: string,
) {
  const input = yield* Effect.tryPromise({
    try: async (signal) => {
      const response = await fetch(`${metadataUrl}/deployments`, { signal });
      if (!response.ok) throw new Error(`Deployment endpoint returned HTTP ${response.status}`);
      return response.json() as Promise<unknown>;
    },
    catch: (cause) =>
      new TestEnvironmentError({
        code: "DEPLOYMENTS_INVALID",
        message: "Unable to load ENS devnet deployments",
        cause,
      }),
  });

  const response = yield* Schema.decodeUnknownEffect(DevnetDeploymentResponse)(input).pipe(
    Effect.mapError(
      (cause) =>
        new TestEnvironmentError({
          code: "DEPLOYMENTS_INVALID",
          message: "ENS devnet returned invalid deployment metadata",
          cause,
        }),
    ),
  );
  const chainId = yield* Schema.decodeUnknownEffect(Schema.NumberFromString)(response.chainId).pipe(
    Effect.mapError(
      (cause) =>
        new TestEnvironmentError({
          code: "DEPLOYMENTS_INVALID",
          message: "ENS devnet returned an invalid chain ID",
          cause,
        }),
    ),
  );
  const { chainId: _chainId, ...contracts } = response;

  return yield* Schema.decodeUnknownEffect(DevnetDeploymentManifest)({ chainId, contracts }).pipe(
    Effect.mapError(
      (cause) =>
        new TestEnvironmentError({
          code: "DEPLOYMENTS_INVALID",
          message: "ENS devnet returned invalid contract addresses",
          cause,
        }),
    ),
  );
});

export const getDevnetLogs = Effect.fn("getDevnetLogs")(function* (container: DevnetContainer) {
  const docker = yield* DockerEngine;
  return yield* docker.logs(container.containerName).pipe(
    Effect.mapError(
      (cause) =>
        new TestEnvironmentError({
          code: "LOGS_UNAVAILABLE",
          message: `Unable to read logs for ${container.containerName}`,
          cause,
        }),
    ),
  );
});

export const stopDevnet = Effect.fn("stopDevnet")(function* (container: DevnetContainer) {
  const docker = yield* DockerEngine;
  yield* docker.remove(container.containerName).pipe(
    Effect.mapError(
      (cause) =>
        new TestEnvironmentError({
          code: "STOP_FAILED",
          message: `Unable to remove ${container.containerName}`,
          cause,
        }),
    ),
  );
});

const withContainerLogs = <A>(
  effect: Effect.Effect<A, TestEnvironmentError>,
  container: DevnetContainer,
  docker: DockerEngine["Service"],
): Effect.Effect<A, TestEnvironmentError> =>
  effect.pipe(
    Effect.catch((error) =>
      docker.logs(container.containerName).pipe(
        Effect.map(
          (logs) =>
            new TestEnvironmentError({
              code: error.code,
              message: error.message,
              cause: { error, logs },
            }),
        ),
        Effect.catch(() => Effect.succeed(error)),
        Effect.flatMap(Effect.fail),
      ),
    ),
  );

export const startDevnet = Effect.fn("startDevnet")(function* (
  options: DevnetOptions = {},
): Effect.fn.Return<DevnetInstance, TestEnvironmentError, DockerEngine | Scope> {
  const docker = yield* DockerEngine;
  const image = yield* buildDevnetImage(options);
  const containerName =
    options.containerName ?? `ensforge-devnet-${process.pid}-${randomUUID().slice(0, 8)}`;

  const container = yield* Effect.acquireRelease(
    docker.start({ chainId: ensDevnetChainId, image, name: containerName }).pipe(
      Effect.map(
        (containerId) => ({ containerId, containerName, image }) satisfies DevnetContainer,
      ),
      Effect.mapError(
        (cause) =>
          new TestEnvironmentError({
            code: "START_FAILED",
            message: `Unable to start ${containerName}`,
            cause,
          }),
      ),
    ),
    (managedContainer) =>
      docker
        .remove(managedContainer.containerName)
        .pipe(
          Effect.catch((cause) =>
            Effect.logError(`Unable to remove ${managedContainer.containerName}`, { cause }),
          ),
        ),
  );

  const endpoints = yield* withContainerLogs(
    Effect.all({
      metadataPort: docker.publishedPort(container.containerName, 8000),
      rpcPort: docker.publishedPort(container.containerName, 8545),
    }).pipe(
      Effect.mapError(
        (cause) =>
          new TestEnvironmentError({
            code: "START_FAILED",
            message: `Unable to discover ports for ${container.containerName}`,
            cause,
          }),
      ),
    ),
    container,
    docker,
  );
  const metadataUrl = `http://127.0.0.1:${endpoints.metadataPort}`;
  const rpcUrl = `http://127.0.0.1:${endpoints.rpcPort}`;

  const deployments = yield* withContainerLogs(
    waitForDevnetHealth(metadataUrl, options).pipe(
      Effect.andThen(fetchDevnetDeployments(metadataUrl)),
    ),
    container,
    docker,
  );

  return { ...container, deployments, metadataUrl, rpcUrl };
});
