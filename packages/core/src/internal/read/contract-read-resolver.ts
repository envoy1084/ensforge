import { Effect, Exit, RequestResolver, Result } from "effect";

import type { PublicClient } from "viem";

import { ContractError } from "../../errors/contract-error.js";
import { viemErrorToEffectError, type ViemError } from "../errors/viem-error.js";
import type { ContractReadRequest } from "./contract-read.js";

export interface ContractReadResolverOptions {
  readonly publicClient: Pick<PublicClient, "multicall">;
  readonly batchSize?: number;
}

export type ContractReadResolver = RequestResolver.RequestResolver<ContractReadRequest>;

export const executeContractRead = Effect.fn("executeContractRead")(function* <Success>(
  request: ContractReadRequest<Success>,
  resolver: ContractReadResolver,
): Effect.fn.Return<Success, ViemError> {
  const result = yield* Effect.request(request as ContractReadRequest, resolver);
  return result as Success;
});

export const makeContractReadResolver = ({
  publicClient,
  batchSize,
}: ContractReadResolverOptions): ContractReadResolver =>
  RequestResolver.makeGrouped<ContractReadRequest, string>({
    key: ({ request }) => request.groupKey,
    resolver: Effect.fn("ContractReadResolver.resolve")(function* (entries) {
      const uniqueRequests = new Map<
        string,
        {
          readonly request: ContractReadRequest;
          readonly entries: Array<(typeof entries)[number]>;
        }
      >();

      for (const entry of entries) {
        const existing = uniqueRequests.get(entry.request.requestKey);
        if (existing === undefined) {
          uniqueRequests.set(entry.request.requestKey, {
            request: entry.request,
            entries: [entry],
          });
        } else {
          existing.entries.push(entry);
        }
      }

      const unique = Array.from(uniqueRequests.values());
      const first = entries[0].request;
      const outcome = yield* Effect.result(
        Effect.tryPromise({
          try: () =>
            publicClient.multicall({
              contracts: unique.map(({ request }) => request.contract),
              allowFailure: true,
              ...(first.blockNumber === undefined
                ? first.blockTag === undefined
                  ? {}
                  : { blockTag: first.blockTag }
                : { blockNumber: first.blockNumber }),
              ...(first.account === undefined ? {} : { account: first.account }),
              ...(batchSize === undefined ? {} : { batchSize }),
            }),
          catch: (cause) => viemErrorToEffectError(cause, "multicall"),
        }),
      );

      if (Result.isFailure(outcome)) {
        for (const entry of entries) entry.completeUnsafe(Exit.fail(outcome.failure));
        return;
      }

      for (const [index, pending] of unique.entries()) {
        const result = outcome.success[index];
        let exit: Exit.Exit<unknown, ViemError>;

        if (result === undefined) {
          exit = Exit.fail(
            new ContractError({
              code: "DECODE_FAILED",
              message: "Multicall returned fewer results than requested",
              cause: { index, requestKey: pending.request.requestKey },
            }),
          );
        } else if (result.status === "failure") {
          exit = Exit.fail(viemErrorToEffectError(result.error, "multicall"));
        } else {
          exit = Exit.succeed(result.result);
        }

        for (const entry of pending.entries) entry.completeUnsafe(exit);
      }
    }),
  }).pipe(RequestResolver.withSpan("ensforge.contractRead.batch"));
