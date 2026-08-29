import { getEnsEvents, getNameHistory, watchEnsEvents, type EnsforgeConfig } from "@ensforge/core";

import { bindAction } from "../internal/bind-action.js";

export const makeEventsActions = (config: EnsforgeConfig) =>
  Object.freeze({
    getEnsEvents: bindAction(config, getEnsEvents),
    getNameHistory: bindAction(config, getNameHistory),
    watchEnsEvents: bindAction(config, watchEnsEvents),
  });

export type EventsActions = ReturnType<typeof makeEventsActions>;
