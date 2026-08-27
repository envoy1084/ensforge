/** Reads the complete routing state for a second-level `.eth` registration. */
export const getExpiryV2EthRegistryAbi = [
  {
    type: "function",
    name: "getState",
    stateMutability: "view",
    inputs: [{ name: "anyId", type: "uint256" }],
    outputs: [
      {
        name: "state",
        type: "tuple",
        components: [
          { name: "status", type: "uint8" },
          { name: "expiry", type: "uint64" },
          { name: "latestOwner", type: "address" },
          { name: "tokenId", type: "uint256" },
          { name: "resource", type: "uint256" },
        ],
      },
    ],
  },
] as const;

/** Reads a label expiry from its ENSv2 parent registry. */
export const getExpiryV2TemporalRegistryAbi = [
  {
    type: "function",
    name: "findExpiry",
    stateMutability: "view",
    inputs: [{ name: "label", type: "string" }],
    outputs: [{ name: "", type: "uint64" }],
  },
] as const;

/** Reads the configured grace period from either ENSv2 ETH renewal contract. */
export const getExpiryV2GracePeriodAbi = [
  {
    type: "function",
    name: "GRACE_PERIOD",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint64" }],
  },
] as const;

/** Finds the registry that directly contains an ENSv2 name. */
export const getExpiryV2UniversalResolverAbi = [
  {
    type: "function",
    name: "findParentRegistry",
    stateMutability: "view",
    inputs: [{ name: "name", type: "bytes" }],
    outputs: [{ name: "", type: "address" }],
  },
] as const;
