import { Schema } from "effect";

export const ConfigErrorCode = Schema.Literals([
  "UNSUPPORTED_NETWORK",
  "CLIENT_CHAIN_UNAVAILABLE",
  "NETWORK_CLIENT_MISMATCH",
  "DEPLOYMENT_CHAIN_MISMATCH",
  "DUPLICATE_DEPLOYMENT",
  "WALLET_CLIENT_UNAVAILABLE",
  "WALLET_ACCOUNT_UNAVAILABLE",
  "INVALID_READ_OPTIONS",
]);

export type ConfigErrorCode = typeof ConfigErrorCode.Type;

export class ConfigError extends Schema.TaggedError<ConfigError>()("ConfigError", {
  code: ConfigErrorCode,
  message: Schema.String,
}) {}
