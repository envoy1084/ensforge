/** ENSIP-10 wildcard resolution profile. */
export const extendedResolverAbi = [
  {
    type: "function",
    name: "resolve",
    stateMutability: "view",
    inputs: [
      { name: "name", type: "bytes" },
      { name: "data", type: "bytes" },
    ],
    outputs: [{ name: "", type: "bytes" }],
  },
] as const;

export const extendedResolverInterfaceId = "0x9061b923" as const;

/** Extended DNS resolution profile with caller-provided context. */
export const extendedDnsResolverAbi = [
  {
    type: "function",
    name: "resolve",
    stateMutability: "view",
    inputs: [
      { name: "name", type: "bytes" },
      { name: "data", type: "bytes" },
      { name: "context", type: "bytes" },
    ],
    outputs: [{ name: "", type: "bytes" }],
  },
] as const;

export const extendedDnsResolverInterfaceId = "0x8ef98a7e" as const;
