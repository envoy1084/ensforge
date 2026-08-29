import { scheduleTask } from "@effect/atom-react";
import { AtomRegistry } from "effect/unstable/reactivity";

export interface CreateEnsforgeRegistryOptions {
  readonly defaultIdleTTL?: number;
  readonly timeoutResolution?: number;
}

export const createEnsforgeRegistry = (options: CreateEnsforgeRegistryOptions = {}) =>
  AtomRegistry.make({
    ...options,
    scheduleTask,
  });
