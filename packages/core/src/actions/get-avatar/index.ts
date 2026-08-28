import { Effect } from "effect";

import { parseAvatarRecord } from "viem/ens";

import { defineReadAction } from "../../action/read-request.js";
import type { EnsforgeConfig } from "../../config/config.js";
import { GatewayError } from "../../errors/gateway-error.js";
import { getText } from "../get-text/index.js";
import type { AvatarResult, GetAvatarError, GetAvatarParameters } from "./types.js";

const getAvatarEffect = Effect.fn("ensforge.getAvatar")(function* (
  config: EnsforgeConfig,
  parameters: GetAvatarParameters,
) {
  const avatar = yield* getText.effect(config, {
    ...parameters,
    key: "avatar",
  });

  if (avatar.value === null) return null;
  const record = avatar.value;

  const uri = yield* Effect.tryPromise({
    try: () =>
      parseAvatarRecord(config.publicClient, {
        record,
        ...(parameters.gatewayUrls === undefined ? {} : { gatewayUrls: parameters.gatewayUrls }),
      }),
    catch: (cause) =>
      new GatewayError({
        code: "AVATAR_RESOLUTION_FAILED",
        message: `Unable to resolve the avatar record for ${parameters.name}`,
        cause,
      }),
  });

  return { record, uri };
});

export const getAvatar = defineReadAction<GetAvatarParameters, AvatarResult, GetAvatarError>(
  getAvatarEffect,
);

export { AvatarResult, type GetAvatarError, type GetAvatarParameters } from "./types.js";
