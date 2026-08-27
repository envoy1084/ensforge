/** Resolver discovery shared by ENSv1 and ENSv2 Universal Resolvers. */
export const universalResolverFindResolverAbi = [
  {
    type: "function",
    name: "findResolver",
    stateMutability: "view",
    inputs: [{ name: "name", type: "bytes" }],
    outputs: [
      { name: "resolver", type: "address" },
      { name: "node", type: "bytes32" },
      { name: "resolverOffset", type: "uint256" },
    ],
  },
] as const;
