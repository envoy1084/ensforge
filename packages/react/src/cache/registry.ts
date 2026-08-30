import { scheduleTask } from "@effect/atom-react";
import { AtomRegistry } from "effect/unstable/reactivity";

export interface CreateRegistryOptions {
  readonly defaultIdleTTL?: number;
  readonly timeoutResolution?: number;
}

export const createRegistry = (options: CreateRegistryOptions = {}) =>
  AtomRegistry.make({
    ...options,
    scheduleTask,
  });
