import { Effect } from "effect";

import type { AssetGatewayUrls, PublicClient } from "viem";
import { parseAvatarRecord } from "viem/ens";

import { GatewayError } from "../../errors/gateway-error.js";

export const resolveAvatarRecord: (
  client: PublicClient,
  name: string,
  record: string,
  gatewayUrls?: AssetGatewayUrls,
) => Effect.Effect<{ readonly record: string; readonly uri: string }, GatewayError> = Effect.fn(
  "resolveAvatarRecord",
)(function* (client, name, record, gatewayUrls) {
  const uri = yield* Effect.tryPromise({
    try: () =>
      parseAvatarRecord(client, {
        record,
        ...(gatewayUrls === undefined ? {} : { gatewayUrls }),
      }),
    catch: (cause) =>
      new GatewayError({
        code: "AVATAR_RESOLUTION_FAILED",
        message: `Unable to resolve the avatar record for ${name}`,
        cause,
      }),
  });

  return { record, uri };
});
