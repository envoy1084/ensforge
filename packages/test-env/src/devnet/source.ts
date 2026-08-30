import { access } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { Effect } from "effect";

import { TestEnvironmentError } from "../errors/test-environment-error.js";
import { requireProcessSuccess, runProcess } from "../internal/process.js";

export const ensContractsV2Repository = "https://github.com/ensdomains/contracts-v2.git" as const;

export const ensContractsV2Commit = "09bf3ac64a6fb1b215573c019b17e8c501bb3ca0" as const;

export const ensDevnetChainId = 31337 as const;

export const ensDevnetImage =
  `ensforge-contracts-devnet:${ensContractsV2Commit.slice(0, 7)}` as const;

export const ensDevnetImageRepository = "ghcr.io/envoy1084/ensforge-devnet" as const;

export const ensDevnetImageDigest =
  "sha256:63415642daad6f3486d305b5660a0b9c659203fc20194bafb50b6b1e1bedeef3" as const;

export const ensDevnetPublishedImage =
  `${ensDevnetImageRepository}@${ensDevnetImageDigest}` as const;

export const defaultEnsContractsV2Directory = fileURLToPath(
  new URL("../../../../.repos/ens-contracts-v2/", import.meta.url),
);

export interface VerifyContractsSourceOptions {
  readonly directory?: string;
}

export interface VerifiedContractsSource {
  readonly commit: typeof ensContractsV2Commit;
  readonly directory: string;
  readonly repository: typeof ensContractsV2Repository;
}

const normalizeRepository = (repository: string): string =>
  repository
    .trim()
    .replace(/^git@github\.com:/, "https://github.com/")
    .replace(/\.git$/, "")
    .replace(/\/$/, "");

export const verifyContractsSource = Effect.fn("verifyContractsSource")(function* (
  options: VerifyContractsSourceOptions = {},
) {
  const directory = options.directory ?? defaultEnsContractsV2Directory;

  yield* Effect.tryPromise({
    try: () => access(join(directory, "Dockerfile")),
    catch: (cause) =>
      new TestEnvironmentError({
        code: "SOURCE_UNAVAILABLE",
        message: `ENS contracts source is unavailable at ${directory}`,
        cause,
      }),
  });

  const git = (args: ReadonlyArray<string>) =>
    runProcess("git", ["-C", directory, ...args]).pipe(
      Effect.flatMap((result) => requireProcessSuccess(`git ${args.join(" ")}`, result)),
      Effect.mapError(
        (cause) =>
          new TestEnvironmentError({
            code: "SOURCE_UNAVAILABLE",
            message: `Unable to inspect ENS contracts source at ${directory}`,
            cause,
          }),
      ),
    );

  const origin = (yield* git(["remote", "get-url", "origin"])).stdout.trim();
  const head = (yield* git(["rev-parse", "HEAD"])).stdout.trim();

  if (normalizeRepository(origin) !== normalizeRepository(ensContractsV2Repository)) {
    return yield* new TestEnvironmentError({
      code: "SOURCE_MISMATCH",
      message: `Expected ${ensContractsV2Repository}, received ${origin}`,
      cause: origin,
    });
  }

  if (head !== ensContractsV2Commit) {
    return yield* new TestEnvironmentError({
      code: "SOURCE_MISMATCH",
      message: `Expected ENS contracts commit ${ensContractsV2Commit}, received ${head}`,
      cause: head,
    });
  }

  const status = (yield* git(["status", "--porcelain=v1"])).stdout.trim();
  const submodules = (yield* git(["submodule", "status", "--recursive"])).stdout;

  if (status.length > 0) {
    return yield* new TestEnvironmentError({
      code: "SOURCE_DIRTY",
      message: `ENS contracts source contains local changes at ${directory}`,
      cause: status,
    });
  }

  const invalidSubmodules = submodules
    .split("\n")
    .filter((line) => line.length > 0 && !line.startsWith(" "));

  if (invalidSubmodules.length > 0) {
    return yield* new TestEnvironmentError({
      code: "SOURCE_MISMATCH",
      message: `ENS contracts submodules are missing or do not match the pinned revisions`,
      cause: invalidSubmodules,
    });
  }

  return {
    commit: ensContractsV2Commit,
    directory,
    repository: ensContractsV2Repository,
  } satisfies VerifiedContractsSource;
});
