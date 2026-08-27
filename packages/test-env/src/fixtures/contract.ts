import { Effect } from "effect";

import type { Abi, ContractFunctionArgs, ContractFunctionName, Hex } from "viem";

import type { DevnetAccountRole } from "../accounts/accounts.js";
import type { DevnetEnvironment } from "../environment.js";
import { TestEnvironmentError } from "../errors/test-environment-error.js";

export const seedTransaction = <
  const TAbi extends Abi,
  TFunctionName extends ContractFunctionName<TAbi, "nonpayable" | "payable">,
>(
  environment: DevnetEnvironment,
  request: {
    readonly abi: TAbi;
    readonly address: `0x${string}`;
    readonly functionName: TFunctionName;
    readonly args: ContractFunctionArgs<TAbi, "nonpayable" | "payable", TFunctionName>;
  },
  message: string,
  account: DevnetAccountRole = "deployer",
) =>
  Effect.tryPromise({
    try: async () => {
      const writeContract = environment.clients.walletClients[account]
        .writeContract as unknown as (parameters: {
        readonly abi: Abi;
        readonly address: `0x${string}`;
        readonly functionName: string;
        readonly args: unknown;
        readonly account: `0x${string}`;
        readonly chain: typeof environment.clients.chain;
      }) => Promise<Hex>;
      const hash = await writeContract({
        ...request,
        account: environment.accounts[account],
        chain: environment.clients.chain,
      });
      const receipt = await environment.clients.publicClient.waitForTransactionReceipt({ hash });
      if (receipt.status !== "success") throw new Error(`Transaction ${hash} reverted`);
      return receipt;
    },
    catch: (cause) =>
      new TestEnvironmentError({
        code: "SEED_FAILED",
        message,
        cause,
      }),
  });

export const seedRead = <A>(operation: () => Promise<A>, message: string) =>
  Effect.tryPromise({
    try: operation,
    catch: (cause) =>
      new TestEnvironmentError({
        code: "SEED_FAILED",
        message,
        cause,
      }),
  });
