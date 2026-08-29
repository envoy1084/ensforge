import { Effect } from "effect";

import type { ResolvedGatewayOptions } from "../../config/gateway-options.js";
import { GatewayError } from "../../errors/gateway-error.js";

export const validateGatewayUrl = Effect.fn("validateGatewayUrl")(function* (
  value: string,
  policy: ResolvedGatewayOptions,
) {
  const url = yield* Effect.try({
    try: () => new URL(value),
    catch: (cause) =>
      new GatewayError({
        code: "GATEWAY_NOT_ALLOWED",
        message: "Gateway URL is invalid",
        cause,
      }),
  });
  const host = url.hostname.toLowerCase();
  if (
    policy.deniedHosts.some((denied) => denied.toLowerCase() === host) ||
    (policy.allowedHosts !== null &&
      !policy.allowedHosts.some((allowed) => allowed.toLowerCase() === host))
  ) {
    return yield* new GatewayError({
      code: "GATEWAY_NOT_ALLOWED",
      message: `Gateway host ${host} is not allowed`,
      cause: { host },
    });
  }
});
