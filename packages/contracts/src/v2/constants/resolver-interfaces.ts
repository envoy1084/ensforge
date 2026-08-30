/** ERC-165 interface identifiers for ENSv2 resolver families. */
export const resolverInterfaceIds = {
  permissionedResolver: "0x91413117",
} as const;

export type ResolverInterfaceId = (typeof resolverInterfaceIds)[keyof typeof resolverInterfaceIds];
