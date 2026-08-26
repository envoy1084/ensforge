/** EnhancedAccessControl base role masks from ENSv2. */
export const enhancedAccessControlRoles = {
  allRoles: 0x1111111111111111111111111111111111111111111111111111111111111111n,
  adminRoles: 0x1111111111111111111111111111111100000000000000000000000000000000n,
} as const;

/** Registry role bitmaps from ENSv2 RegistryRolesLib. */
export const registryRoles = {
  registrar: 1n << 0n,
  registrarAdmin: 1n << 128n,
  registerReserved: 1n << 4n,
  registerReservedAdmin: 1n << 132n,
  setParent: 1n << 8n,
  setParentAdmin: 1n << 136n,
  unregister: 1n << 12n,
  unregisterAdmin: 1n << 140n,
  renew: 1n << 16n,
  renewAdmin: 1n << 144n,
  setSubregistry: 1n << 20n,
  setSubregistryAdmin: 1n << 148n,
  setResolver: 1n << 24n,
  setResolverAdmin: 1n << 152n,
  canTransferAdmin: 1n << 156n,
  wasReserved: 1n << 32n,
  setUri: 1n << 36n,
  setUriAdmin: 1n << 164n,
  canName: 1n << 120n,
  canNameAdmin: 1n << 248n,
  upgrade: 1n << 124n,
  upgradeAdmin: 1n << 252n,
} as const;

export type RegistryRole = (typeof registryRoles)[keyof typeof registryRoles];
