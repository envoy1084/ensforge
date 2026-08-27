import { Schema } from "effect";

export const EnsforgeConfigErrorCode = Schema.Literals([
  "UNSUPPORTED_NETWORK",
  "CLIENT_CHAIN_UNAVAILABLE",
  "NETWORK_CLIENT_MISMATCH",
  "DEPLOYMENT_CHAIN_MISMATCH",
  "DUPLICATE_DEPLOYMENT",
  "WALLET_CLIENT_UNAVAILABLE",
  "WALLET_ACCOUNT_UNAVAILABLE",
]);

export type EnsforgeConfigErrorCode = typeof EnsforgeConfigErrorCode.Type;

export class EnsforgeConfigError extends Schema.TaggedError<EnsforgeConfigError>()(
  "EnsforgeConfigError",
  {
    code: EnsforgeConfigErrorCode,
    message: Schema.String,
  },
) {}
