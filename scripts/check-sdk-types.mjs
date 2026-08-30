import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sdkDeclarations = join(repositoryRoot, "packages/sdk/dist");
const fixture = join(repositoryRoot, "scripts/fixtures/sdk-types/tsconfig.json");

const declarationBytes = (directory) =>
  readdirSync(directory, { withFileTypes: true }).reduce((total, entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return total + declarationBytes(path);
    return entry.name.endsWith(".d.ts") ? total + statSync(path).size : total;
  }, 0);

const result = spawnSync("pnpm", ["exec", "tsc", "-p", fixture, "--extendedDiagnostics"], {
  cwd: repositoryRoot,
  encoding: "utf8",
  maxBuffer: 10 * 1024 * 1024,
});

if (result.error) throw result.error;
if (result.status !== 0) {
  process.stderr.write(result.stdout);
  process.stderr.write(result.stderr);
  throw new Error(`SDK consumer typecheck exited with code ${result.status ?? 1}`);
}

const diagnostics = Object.fromEntries(
  result.stdout
    .split("\n")
    .map((line) => line.match(/^([^:]+):\s+([0-9.]+)/))
    .filter((match) => match !== null)
    .map((match) => [match[1].trim(), Number(match[2])]),
);
const bytes = declarationBytes(sdkDeclarations);
const readDiagnostic = (name) => {
  const value = diagnostics[name];
  assert(Number.isFinite(value), `TypeScript did not report the ${name} diagnostic`);
  return value;
};
const types = readDiagnostic("Types");
const instantiations = readDiagnostic("Instantiations");
const memory = readDiagnostic("Memory used");
const checkTime = readDiagnostic("Check time");

assert(bytes <= 40_000, `SDK declarations grew to ${bytes} bytes (limit: 40000)`);
assert(types <= 100_000, `Type count grew to ${types} (limit: 100000)`);
assert(instantiations <= 450_000, `Instantiation count grew to ${instantiations} (limit: 450000)`);
assert(memory <= 650_000, `TypeScript memory grew to ${memory}K (limit: 650000K)`);

process.stdout.write(
  `${[
    "SDK type performance is within budget.",
    `Declarations: ${bytes} bytes`,
    `Types: ${types}`,
    `Instantiations: ${instantiations}`,
    `Memory: ${memory}K`,
    `Check time: ${checkTime}s`,
  ].join("\n")}\n`,
);
