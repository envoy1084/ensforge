/** Reads registration expiry and grace-period configuration from the ENSv1 Base Registrar. */
export const getExpiryV1RegistrarAbi = [
  {
    type: "function",
    name: "nameExpires",
    stateMutability: "view",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "GRACE_PERIOD",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;

/** Reads wrapped-name expiry from the ENSv1 Name Wrapper. */
export const getExpiryV1NameWrapperAbi = [
  {
    type: "function",
    name: "getData",
    stateMutability: "view",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: [
      { name: "owner", type: "address" },
      { name: "fuses", type: "uint32" },
      { name: "expiry", type: "uint64" },
    ],
  },
] as const;
