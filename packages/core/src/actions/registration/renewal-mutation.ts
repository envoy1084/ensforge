import { Effect } from "effect";

import { erc20Abi } from "@ensforge/contracts/shared";
import { bulkRenewalV1Abi, ethRegistrarControllerV1Abi } from "@ensforge/contracts/v1";
import {
  ethRegistrarV2Abi,
  ethRegistrarV2InterfaceAbi,
  ethRenewerV1Abi,
  ethRenewerV2InterfaceAbi,
} from "@ensforge/contracts/v2";
import { encodeFunctionData, zeroHash } from "viem";

import {
  makeWriteIntent,
  type EnsWriteIntent,
  type EnsWriteIntentPreparer,
} from "../../action/write-intent.js";
import { ContractError } from "../../errors/contract-error.js";
import { RenewalError } from "../../errors/renewal-error.js";
import { viemErrorToEffectError } from "../../internal/errors/viem-error.js";
import { getSecondLevelEthLabel } from "../../internal/registration/second-level-eth.js";
import { makeSingleWriteAction } from "../../internal/write/single-write-action.js";
import type { CallExecutionResult, WriteError } from "../../write/types.js";
import { decodeOwnershipAddress } from "../ownership/address.js";
import { getRenewalPrice } from "./get-renewal-price/index.js";
import type { ApproveRenewalPaymentParameters, RenewNameCallParameters } from "./types.js";

export interface RenewBatchCallParameters {
  readonly renewals: ReadonlyArray<RenewNameCallParameters>;
  readonly maxTotalPrice?: bigint;
}

const usesFlatRenewalAbi = (config: Parameters<typeof getRenewalPrice.effect>[0]) =>
  // The July Sepolia beta predates the tuple-based renewals and registrar-level batch methods.
  config.deployments.protocol === "v2" && config.deployments.v2.id === "sepolia-v2";

export const supportsContractRenewalBatch = (
  config: Parameters<typeof getRenewalPrice.effect>[0],
  route: "v1-controller" | "v1-renewer" | "v2-registrar",
) => route === "v1-controller" || !usesFlatRenewalAbi(config);

const encode = (operation: string, makeData: () => `0x${string}`) =>
  Effect.try({
    try: makeData,
    catch: (cause) =>
      new ContractError({ code: "ENCODE_FAILED", message: `Unable to encode ${operation}`, cause }),
  });

const requireQuote = Effect.fn("ensforge.renewal.requireQuote")(function* (
  config: Parameters<typeof getRenewalPrice.effect>[0],
  parameters: RenewNameCallParameters,
) {
  const quote = yield* getRenewalPrice.effect(config, parameters);
  switch (quote.status) {
    case "not-renewable":
      return yield* new RenewalError({
        code: "NAME_NOT_RENEWABLE",
        message: `${quote.name} is not renewable`,
      });
    case "payment-token-required":
      return yield* new RenewalError({
        code: "PAYMENT_TOKEN_REQUIRED",
        message: `A payment token is required to renew ${quote.name}`,
      });
    case "unsupported-payment-token":
      return yield* new RenewalError({
        code: "PAYMENT_TOKEN_UNSUPPORTED",
        message: `The selected payment token is not supported for ${quote.name}`,
      });
    default:
      if (parameters.maxPrice !== undefined && quote.price > parameters.maxPrice) {
        return yield* new RenewalError({
          code: "PRICE_EXCEEDS_MAXIMUM",
          message: `The current renewal price for ${quote.name} exceeds maxPrice`,
        });
      }
      return quote;
  }
});

const readAllowance = Effect.fn("ensforge.renewal.readAllowance")(function* (
  config: Parameters<typeof getRenewalPrice.effect>[0],
  token: `0x${string}`,
  spender: `0x${string}`,
  account: `0x${string}`,
) {
  return yield* Effect.tryPromise({
    try: () =>
      config.publicClient.readContract({
        address: token,
        abi: erc20Abi,
        functionName: "allowance",
        args: [account, spender],
      }),
    catch: (cause) => viemErrorToEffectError(cause, "readContract"),
  });
});

const approvalPreparer: EnsWriteIntentPreparer<ApproveRenewalPaymentParameters, WriteError> =
  Effect.fn("ensforge.approveRenewalPayment.prepare")(function* (config, parameters) {
    if (parameters.amount < 0n) {
      return yield* new RenewalError({
        code: "RENEWAL_FAILED",
        message: "Renewal payment approval amount cannot be negative",
      });
    }
    const paymentToken = yield* decodeOwnershipAddress(parameters.paymentToken, "payment token");
    const quote = yield* requireQuote(config, {
      name: parameters.name,
      duration: parameters.duration,
      paymentToken,
    });
    if (quote.currency.kind !== "erc20") {
      return yield* new RenewalError({
        code: "PAYMENT_TOKEN_UNSUPPORTED",
        message: "ENSv1 renewal uses native ETH and does not accept payment tokens",
      });
    }
    return {
      to: paymentToken,
      data: yield* encode("approveRenewalPayment", () =>
        encodeFunctionData({
          abi: erc20Abi,
          functionName: "approve",
          args: [quote.renewer, parameters.amount],
        }),
      ),
      value: 0n,
      protocol: quote.protocol,
    };
  });

const renewalPreparer: EnsWriteIntentPreparer<RenewNameCallParameters, WriteError> = Effect.fn(
  "ensforge.renewName.prepare",
)(function* (config, parameters, context) {
  const quote = yield* requireQuote(config, parameters);
  const label = yield* getSecondLevelEthLabel(quote.name);
  const referrer = parameters.referrer ?? zeroHash;
  if (quote.route === "v1-controller") {
    return {
      to: quote.renewer,
      data: yield* encode("renewName", () =>
        encodeFunctionData({
          abi: ethRegistrarControllerV1Abi,
          functionName: "renew",
          args: [label, parameters.duration, referrer],
        }),
      ),
      value: quote.price,
      protocol: "v1" as const,
    };
  }
  if (quote.currency.kind !== "erc20") {
    return yield* new RenewalError({
      code: "PAYMENT_TOKEN_REQUIRED",
      message: `An ERC-20 payment token is required to renew ${quote.name}`,
    });
  }
  const currency = quote.currency;
  const account = typeof context.account === "string" ? context.account : context.account.address;
  const allowance = yield* readAllowance(config, currency.address, quote.renewer, account);
  if (allowance < quote.price) {
    return yield* new RenewalError({
      code: "INSUFFICIENT_ALLOWANCE",
      message: `Payment-token allowance is insufficient to renew ${quote.name}`,
    });
  }
  return {
    to: quote.renewer,
    data: yield* encode("renewName", () =>
      usesFlatRenewalAbi(config)
        ? encodeFunctionData({
            abi: quote.route === "v1-renewer" ? ethRenewerV1Abi : ethRegistrarV2Abi,
            functionName: "renew",
            args: [label, parameters.duration, currency.address, referrer],
          })
        : encodeFunctionData({
            abi:
              quote.route === "v1-renewer" ? ethRenewerV2InterfaceAbi : ethRegistrarV2InterfaceAbi,
            functionName: "renew",
            args: [{ label, duration: parameters.duration, referrer }, currency.address],
          }),
    ),
    value: 0n,
    protocol: quote.protocol,
  };
});

const batchRenewalPreparer: EnsWriteIntentPreparer<RenewBatchCallParameters, WriteError> =
  Effect.fn("ensforge.renewNames.prepareBatch")(function* (config, parameters, context) {
    if (parameters.renewals.length === 0) {
      return yield* new RenewalError({ code: "RENEWAL_FAILED", message: "Renewal batch is empty" });
    }
    const quotes = yield* Effect.forEach(parameters.renewals, (renewal) =>
      requireQuote(config, renewal),
    );
    const first = quotes[0];
    if (first === undefined) {
      return yield* new RenewalError({ code: "RENEWAL_FAILED", message: "Renewal batch is empty" });
    }
    if (quotes.some((quote) => quote.route !== first.route || quote.renewer !== first.renewer)) {
      return yield* new RenewalError({
        code: "ROUTE_CHANGED",
        message: "All names in a renewal batch must use the same renewal contract",
      });
    }
    const total = quotes.reduce((sum, quote) => sum + quote.price, 0n);
    if (parameters.maxTotalPrice !== undefined && total > parameters.maxTotalPrice) {
      return yield* new RenewalError({
        code: "TOTAL_PRICE_EXCEEDS_MAXIMUM",
        message: "The current renewal batch price exceeds maxTotalPrice",
      });
    }
    const labels = yield* Effect.forEach(quotes, (quote) => getSecondLevelEthLabel(quote.name));
    if (first.route === "v1-controller") {
      const v1 = config.deployments.v1;
      if (v1 === undefined) {
        return yield* new RenewalError({
          code: "ROUTE_CHANGED",
          message: "The ENSv1 bulk renewal deployment is unavailable",
        });
      }
      const duration = parameters.renewals[0]?.duration;
      if (
        duration === undefined ||
        parameters.renewals.some((renewal) => renewal.duration !== duration)
      ) {
        return yield* new RenewalError({
          code: "RENEWAL_FAILED",
          message: "ENSv1 bulk renewal requires a shared duration",
        });
      }
      return {
        to: v1.contracts.bulkRenewal,
        data: yield* encode("renewNames", () =>
          encodeFunctionData({
            abi: bulkRenewalV1Abi,
            functionName: "renewAll",
            args: [labels, duration, parameters.renewals[0]?.referrer ?? zeroHash],
          }),
        ),
        value: total,
        protocol: "v1" as const,
      };
    }
    if (!supportsContractRenewalBatch(config, first.route)) {
      return yield* new RenewalError({
        code: "RENEWAL_FAILED",
        message: "The selected renewal deployment does not support contract-native batching",
      });
    }
    const currency = first.currency;
    if (
      currency.kind !== "erc20" ||
      quotes.some(
        (quote) => quote.currency.kind !== "erc20" || quote.currency.address !== currency.address,
      )
    ) {
      return yield* new RenewalError({
        code: "PAYMENT_TOKEN_UNSUPPORTED",
        message: "All names in an ENSv2 renewal batch must use the same payment token",
      });
    }
    const account = typeof context.account === "string" ? context.account : context.account.address;
    const allowance = yield* readAllowance(config, currency.address, first.renewer, account);
    if (allowance < total) {
      return yield* new RenewalError({
        code: "INSUFFICIENT_ALLOWANCE",
        message: "Payment-token allowance is insufficient for the renewal batch",
      });
    }
    return {
      to: first.renewer,
      data: yield* encode("renewNames", () =>
        encodeFunctionData({
          abi: first.route === "v1-renewer" ? ethRenewerV2InterfaceAbi : ethRegistrarV2InterfaceAbi,
          functionName: "renewBatch",
          args: [
            parameters.renewals.map((renewal, index) => ({
              label: labels[index] ?? "",
              duration: renewal.duration,
              referrer: renewal.referrer ?? zeroHash,
            })),
            currency.address,
          ],
        }),
      ),
      value: 0n,
      protocol: first.protocol,
    };
  });

export const approveRenewalPayment = makeSingleWriteAction(
  "approveRenewalPayment",
  approvalPreparer,
);

export const makeRenewalIntent = (
  parameters: RenewNameCallParameters,
): EnsWriteIntent<CallExecutionResult, WriteError> =>
  makeWriteIntent("renewName", parameters, renewalPreparer);

export const makeRenewalBatchIntent = (
  parameters: RenewBatchCallParameters,
): EnsWriteIntent<CallExecutionResult, WriteError> =>
  makeWriteIntent("renewNames", parameters, batchRenewalPreparer);
