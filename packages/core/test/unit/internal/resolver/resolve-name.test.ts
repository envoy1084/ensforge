import { describe, it } from "@effect/vitest";
import { Effect } from "effect";

import type { PublicClient } from "viem";
import { expect, vi } from "vitest";

import {
  makeEthereumClient,
  EthereumClient,
} from "../../../../src/internal/client/ethereum-client.js";
import { makeReadExecution, ReadContext } from "../../../../src/internal/read/execution-context.js";
import { resolveName } from "../../../../src/internal/resolver/resolve-name.js";

const universalResolver = "0x0000000000000000000000000000000000000001" as const;
const resolver = "0x0000000000000000000000000000000000000002" as const;

describe("resolveName", () => {
  it.effect("uses a direct viem read so the client can handle CCIP-Read", () =>
    Effect.gen(function* () {
      const readContract = vi.fn().mockResolvedValue(["0x1234", resolver]);
      const multicall = vi.fn();
      const publicClient = { readContract, multicall } as unknown as PublicClient;
      const ethereum = makeEthereumClient({ publicClient });
      const context = yield* makeReadExecution({ publicClient }).makeContext({
        consistency: "best-effort",
        blockNumber: 123n,
      });

      const result = yield* resolveName({
        universalResolver,
        protocol: "v2",
        name: "0x03656e7300",
        data: "0x1234",
      }).pipe(
        Effect.provideService(EthereumClient, ethereum),
        Effect.provideService(ReadContext, context),
      );

      expect(result).toEqual(["0x1234", resolver]);
      expect(readContract).toHaveBeenCalledWith(
        expect.objectContaining({
          address: universalResolver,
          functionName: "resolve",
          blockNumber: 123n,
        }),
      );
      expect(multicall).not.toHaveBeenCalled();
    }),
  );
});
