/** Resolver role bitmaps from ENSv2 PermissionedResolverLib. */
export const resolverRoles = {
  setAddr: 1n << 0n,
  setAddrAdmin: 1n << 128n,
  setText: 1n << 4n,
  setTextAdmin: 1n << 132n,
  setContenthash: 1n << 8n,
  setContenthashAdmin: 1n << 136n,
  setPubkey: 1n << 12n,
  setPubkeyAdmin: 1n << 140n,
  setAbi: 1n << 16n,
  setAbiAdmin: 1n << 144n,
  setInterface: 1n << 20n,
  setInterfaceAdmin: 1n << 148n,
  setName: 1n << 24n,
  setNameAdmin: 1n << 152n,
  setAlias: 1n << 28n,
  setAliasAdmin: 1n << 156n,
  clear: 1n << 32n,
  clearAdmin: 1n << 160n,
  setData: 1n << 36n,
  setDataAdmin: 1n << 164n,
  canName: 1n << 120n,
  canNameAdmin: 1n << 248n,
  upgrade: 1n << 124n,
  upgradeAdmin: 1n << 252n,
} as const;

export type ResolverRole = (typeof resolverRoles)[keyof typeof resolverRoles];
