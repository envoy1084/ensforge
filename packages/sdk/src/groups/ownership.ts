import {
  getTtl,
  reclaimName,
  setManager,
  setTtl,
  transferName,
  transferRegistrant,
  type EnsforgeConfig,
} from "@ensforge/core";

import { bindAction } from "../internal/bind-action.js";

export const makeOwnershipActions = (config: EnsforgeConfig) =>
  Object.freeze({
    getTtl: bindAction(config, getTtl),
    reclaimName: bindAction(config, reclaimName),
    setManager: bindAction(config, setManager),
    setTtl: bindAction(config, setTtl),
    transferName: bindAction(config, transferName),
    transferRegistrant: bindAction(config, transferRegistrant),
  });

export type OwnershipActions = ReturnType<typeof makeOwnershipActions>;
