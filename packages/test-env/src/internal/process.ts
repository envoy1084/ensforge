import { spawn } from "node:child_process";

import { Effect } from "effect";

const outputLimit = 1_000_000;

export interface ProcessResult {
  readonly exitCode: number | null;
  readonly stdout: string;
  readonly stderr: string;
}

export interface RunProcessOptions {
  readonly cwd?: string;
}

export class ProcessExitError extends Error {
  readonly result: ProcessResult;

  constructor(message: string, result: ProcessResult) {
    super(message);
    this.name = "ProcessExitError";
    this.result = result;
  }
}

const appendOutput = (current: string, chunk: Uint8Array): string =>
  `${current}${Buffer.from(chunk).toString("utf8")}`.slice(-outputLimit);

export const runProcess = (
  command: string,
  args: ReadonlyArray<string>,
  options: RunProcessOptions = {},
): Effect.Effect<ProcessResult, Error> =>
  Effect.callback<ProcessResult, Error>((resume) => {
    let stdout = "";
    let stderr = "";
    let settled = false;
    let child: ReturnType<typeof spawn>;

    try {
      child = spawn(command, args, {
        cwd: options.cwd,
        env: process.env,
        stdio: ["ignore", "pipe", "pipe"],
      });
    } catch (cause) {
      resume(Effect.fail(cause instanceof Error ? cause : new Error(String(cause))));
      return;
    }

    child.stdout?.on("data", (chunk: Uint8Array) => {
      stdout = appendOutput(stdout, chunk);
    });
    child.stderr?.on("data", (chunk: Uint8Array) => {
      stderr = appendOutput(stderr, chunk);
    });
    child.once("error", (cause) => {
      if (settled) return;
      settled = true;
      resume(Effect.fail(cause));
    });
    child.once("close", (exitCode) => {
      if (settled) return;
      settled = true;
      resume(Effect.succeed({ exitCode, stdout, stderr }));
    });

    return Effect.sync(() => {
      if (!settled) child.kill("SIGTERM");
    });
  });

export const requireProcessSuccess = (
  label: string,
  result: ProcessResult,
): Effect.Effect<ProcessResult, ProcessExitError> => {
  if (result.exitCode === 0) return Effect.succeed(result);

  return Effect.fail(
    new ProcessExitError(
      `${label} exited with code ${result.exitCode ?? "unknown"}: ${result.stderr.trim()}`,
      result,
    ),
  );
};
