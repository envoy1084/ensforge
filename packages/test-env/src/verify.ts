import { startEnsDevnet } from "./ens-devnet.js";

await using devnet = await startEnsDevnet();

if (devnet.fixtures.v1.activeUnwrapped.name !== "v1-unwrapped.eth") {
  throw new Error("ENS v1 fixtures were not seeded");
}

if (devnet.fixtures.v2.active.name !== "v2-active.eth") {
  throw new Error("ENS v2 fixtures were not seeded");
}

if (devnet.fixtures.migration.migratedLocked.name !== "v2-migrated-locked.eth") {
  throw new Error("ENS migration fixtures were not seeded");
}

await devnet.reset();

process.stdout.write(`ENS devnet verified at ${devnet.rpcUrl}\n`);
