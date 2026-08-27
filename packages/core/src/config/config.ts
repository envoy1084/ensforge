declare const EnsforgeConfigTypeId: unique symbol;

/**
 * The shared configuration consumed by every Ensforge action.
 *
 * Phase 2 adds its concrete, immutable shape and the `createConfig` constructor.
 */
export interface EnsforgeConfig {
  readonly [EnsforgeConfigTypeId]: typeof EnsforgeConfigTypeId;
}
