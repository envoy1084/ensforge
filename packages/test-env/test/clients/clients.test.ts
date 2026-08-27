import { Effect } from "effect";

import { describe, expect, it } from "vitest";

import { devnetUnlockedAccounts } from "../../src/accounts/accounts.js";
import { verifyDevnetClients, type DevnetVerificationClients } from "../../src/clients/clients.js";

const contract = "0x0000000000000000000000000000000000000001" as const;

const makeClients = (
  chainId: number,
  bytecode: `0x${string}` | undefined,
): DevnetVerificationClients => ({
  publicClient: {
    getBytecode: async () => bytecode,
    getChainId: async () => chainId,
  },
  walletClient: {
    getAddresses: async () => [...devnetUnlockedAccounts],
  },
});

describe("devnet verification", () => {
  it("rejects an RPC endpoint for another chain", async () => {
    const error = await Effect.runPromise(
      Effect.flip(verifyDevnetClients(makeClients(1, "0x01"), [contract])),
    );

    expect(error.code).toBe("RPC_INVALID");
  });

  it("rejects a required deployment without bytecode", async () => {
    const error = await Effect.runPromise(
      Effect.flip(verifyDevnetClients(makeClients(31337, undefined), [contract])),
    );

    expect(error.code).toBe("BYTECODE_MISSING");
  });
});
