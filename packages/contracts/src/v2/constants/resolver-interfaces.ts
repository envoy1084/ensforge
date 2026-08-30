/** ERC-165 interface identifiers for ENSv2 resolver families. */
export const resolverInterfaceIds = {
  permissionedResolver: "0xe119844e",
  /** Permissioned Resolver interface deployed by the public `sepolia-v2` release. */
  permissionedResolverSepolia: "0x91413117",
} as const;

export type ResolverInterfaceId = (typeof resolverInterfaceIds)[keyof typeof resolverInterfaceIds];
