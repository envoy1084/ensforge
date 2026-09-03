import type { AnyReadActionDefinition } from "./types";

type DefinitionModule = {
  readonly definitions: Readonly<Record<string, AnyReadActionDefinition>>;
};

const groupLoaders = {
  capabilities: () => import("./groups/capabilities"),
  dns: () => import("./groups/dns"),
  indexer: () => import("./groups/indexer"),
  migration: () => import("./groups/migration"),
  name: () => import("./groups/name"),
  ownership: () => import("./groups/ownership"),
  records: () => import("./groups/records"),
  registration: () => import("./groups/registration"),
  resolution: () => import("./groups/resolution"),
  reverse: () => import("./groups/reverse"),
  wrapping: () => import("./groups/wrapping"),
} satisfies Readonly<Record<string, () => Promise<DefinitionModule>>>;

export type ReadActionGroup = keyof typeof groupLoaders;

export const loadReadAction = async (id: string): Promise<AnyReadActionDefinition> => {
  const group = id.split(".")[0] as ReadActionGroup;
  const loader = groupLoaders[group];
  if (!loader) throw new Error(`Unknown read-action group: ${group}`);

  const definitions = (await loader()).definitions as Readonly<
    Record<string, AnyReadActionDefinition>
  >;
  const definition = definitions[id];
  if (!definition) throw new Error(`Unknown read action: ${id}`);
  return definition;
};
