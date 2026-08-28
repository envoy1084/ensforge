/** ERC-165 interface identifiers for ENSv2 registry families. */
export const registryInterfaceIds = {
  registry: "0x51f67f40",
  ownedRegistry: "0x63560a8e",
  permissionedRegistry: "0x54d9b3a0",
  standardRegistry: "0xb844ab6c",
  temporalRegistry: "0x6f537c72",
  tokenizedRegistry: "0x91b3c037",
  wrapperRegistry: "0xf5586a0b",
} as const;

export type RegistryInterfaceId = (typeof registryInterfaceIds)[keyof typeof registryInterfaceIds];
