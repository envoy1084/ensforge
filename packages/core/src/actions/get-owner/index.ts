import { Effect } from "effect";

import { getBlockReference } from "../../action/block.js";
import { defineReadAction } from "../../action/read-request.js";
import type { EnsforgeConfig } from "../../config/config.js";
import { provideConfig } from "../../config/internal.js";
import { normalizeName } from "../../names/normalize.js";
import { DeploymentService } from "../../services/deployment.js";
import { routeOwner } from "./route.js";
import type { GetOwnerError, GetOwnerParameters, OwnerResult } from "./types.js";
import { getOwnerV1 } from "./v1.js";
import { getOwnerV2 } from "./v2.js";

const getOwnerWithServices = Effect.fn("getOwnerWithServices")(function* (
  name: ReturnType<typeof normalizeName>,
  parameters: GetOwnerParameters,
) {
  const deployment = yield* DeploymentService;
  const block = getBlockReference(parameters);

  yield* Effect.annotateCurrentSpan({
    "ens.name": name,
    "ens.deployment.protocol": deployment.profile.protocol,
  });

  switch (deployment.profile.protocol) {
    case "v1":
      return yield* getOwnerV1(name, deployment.profile.v1, block);
    case "v2": {
      const v1 = deployment.profile.v1;
      return v1 === undefined
        ? yield* getOwnerV2(name, deployment.profile.v2, block)
        : yield* routeOwner(name, v1, deployment.profile.v2, block);
    }
  }
});

const getOwnerEffect = Effect.fn("ensforge.getOwner")(function* (
  config: EnsforgeConfig,
  parameters: GetOwnerParameters,
) {
  const name = yield* normalizeName.effect(parameters.name);

  return yield* provideConfig(config, getOwnerWithServices(name, parameters));
});

export const getOwner = defineReadAction<GetOwnerParameters, OwnerResult | null, GetOwnerError>(
  getOwnerEffect,
);

export {
  OwnerResult,
  OwnershipLevel,
  type GetOwnerError,
  type GetOwnerParameters,
} from "./types.js";
