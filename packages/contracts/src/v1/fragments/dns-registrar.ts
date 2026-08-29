import type { Abi } from "viem";

const dnsRegistrarV1Errors = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "name",
        type: "bytes",
      },
    ],
    name: "InvalidPublicSuffix",
    type: "error",
  },
  {
    inputs: [],
    name: "NoOwnerRecordFound",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offset",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "OffsetOutOfBoundsError",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "PermissionDenied",
    type: "error",
  },
  {
    inputs: [],
    name: "PreconditionNotMet",
    type: "error",
  },
  {
    inputs: [],
    name: "StaleProof",
    type: "error",
  },
] as const satisfies Abi;

export const dnsRegistrarV1InceptionsAbi = [
  ...dnsRegistrarV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "inceptions",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;

export const dnsRegistrarV1OracleAbi = [
  ...dnsRegistrarV1Errors,
  {
    inputs: [],
    name: "oracle",
    outputs: [
      {
        internalType: "contract DNSSEC",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;

export const dnsRegistrarV1ProveAndClaimAbi = [
  ...dnsRegistrarV1Errors,
  {
    inputs: [
      {
        internalType: "bytes",
        name: "name",
        type: "bytes",
      },
      {
        components: [
          {
            internalType: "bytes",
            name: "rrset",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "sig",
            type: "bytes",
          },
        ],
        internalType: "struct DNSSEC.RRSetWithSignature[]",
        name: "input",
        type: "tuple[]",
      },
    ],
    name: "proveAndClaim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const dnsRegistrarV1ProveAndClaimWithResolverAbi = [
  ...dnsRegistrarV1Errors,
  {
    inputs: [
      {
        internalType: "bytes",
        name: "name",
        type: "bytes",
      },
      {
        components: [
          {
            internalType: "bytes",
            name: "rrset",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "sig",
            type: "bytes",
          },
        ],
        internalType: "struct DNSSEC.RRSetWithSignature[]",
        name: "input",
        type: "tuple[]",
      },
      {
        internalType: "address",
        name: "resolver",
        type: "address",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "proveAndClaimWithResolver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;
