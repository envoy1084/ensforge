import { Context, Effect, Layer } from "effect";

import { requireProcessSuccess, runProcess } from "../internal/process.js";

export interface StartContainerOptions {
  readonly chainId: number;
  readonly image: string;
  readonly name: string;
}

export interface DockerEngineService {
  readonly build: (context: string, image: string) => Effect.Effect<void, Error>;
  readonly start: (options: StartContainerOptions) => Effect.Effect<string, Error>;
  readonly publishedPort: (name: string, containerPort: number) => Effect.Effect<number, Error>;
  readonly logs: (name: string) => Effect.Effect<string, Error>;
  readonly remove: (name: string) => Effect.Effect<void, Error>;
  readonly hasImage: (image: string) => Effect.Effect<boolean, Error>;
}

export const parsePublishedPort = (output: string): number => {
  const match = output
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.startsWith("127.0.0.1:"))
    ?.match(/:(\d+)$/);
  const port = match?.[1] === undefined ? Number.NaN : Number(match[1]);

  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error(`Unable to parse a Docker published port from: ${output.trim()}`);
  }

  return port;
};

const makeDockerEngine = (): DockerEngineService => ({
  build: Effect.fn("DockerEngine.build")(function* (context, image) {
    const result = yield* runProcess("docker", ["build", "--tag", image, context]);
    yield* requireProcessSuccess("docker build", result);
  }),
  start: Effect.fn("DockerEngine.start")(function* (options) {
    const result = yield* runProcess("docker", [
      "run",
      "--detach",
      "--name",
      options.name,
      "--label",
      "io.ensforge.test-env=true",
      "--env",
      "ANVIL_IP_ADDR=0.0.0.0",
      "--publish",
      "127.0.0.1::8545",
      "--publish",
      "127.0.0.1::8000",
      options.image,
      "bun",
      "./script/runDevnet.ts",
      "--chainId",
      String(options.chainId),
      "--quiet",
    ]);
    const { stdout } = yield* requireProcessSuccess("docker run", result);
    const containerId = stdout.trim();

    if (containerId.length === 0) {
      return yield* Effect.fail(new Error("docker run did not return a container ID"));
    }

    return containerId;
  }),
  publishedPort: Effect.fn("DockerEngine.publishedPort")(function* (name, containerPort) {
    const result = yield* runProcess("docker", ["port", name, `${containerPort}/tcp`]);
    const { stdout } = yield* requireProcessSuccess("docker port", result);
    return yield* Effect.try({
      try: () => parsePublishedPort(stdout),
      catch: (cause) => (cause instanceof Error ? cause : new Error(String(cause))),
    });
  }),
  logs: Effect.fn("DockerEngine.logs")(function* (name) {
    const result = yield* runProcess("docker", ["logs", name]);
    const { stdout, stderr } = yield* requireProcessSuccess("docker logs", result);
    return `${stdout}${stderr}`;
  }),
  remove: Effect.fn("DockerEngine.remove")(function* (name) {
    const result = yield* runProcess("docker", ["rm", "--force", "--volumes", name]);

    if (result.exitCode !== 0 && !result.stderr.includes("No such container")) {
      yield* requireProcessSuccess("docker rm", result);
    }
  }),
  hasImage: Effect.fn("DockerEngine.hasImage")(function* (image) {
    const result = yield* runProcess("docker", ["image", "inspect", image]);
    if (result.exitCode === 0) return true;
    if (result.stderr.includes("No such image")) return false;

    return yield* Effect.fail(
      new Error(`docker image inspect failed: ${result.stderr.trim() || "unknown error"}`),
    );
  }),
});

export class DockerEngine extends Context.Service<DockerEngine, DockerEngineService>()(
  "@ensforge/test-env/DockerEngine",
) {
  static readonly layer = Layer.sync(DockerEngine, makeDockerEngine);
}
