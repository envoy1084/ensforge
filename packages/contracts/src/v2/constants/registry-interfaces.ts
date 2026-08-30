/** ERC-165 interface identifiers for ENSv2 registry families. */
export const registryInterfaceIds = {
  registry: "0x51f67f40",
  ownedRegistry: "0x63560a8e",
  permissionedRegistry: "0x6be50c69",
  standardRegistry: "0xb844ab6c",
  temporalRegistry: "0x6f537c72",
  tokenizedRegistry: "0x91b3c037",
  wrapperRegistry: "0xe01aaa11",
} as const;

export type RegistryInterfaceId = (typeof registryInterfaceIds)[keyof typeof registryInterfaceIds];
