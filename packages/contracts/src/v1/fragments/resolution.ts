import type { Abi } from "viem";

export const universalResolverV1ResolveWithResolverAbi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "dns",
        type: "bytes",
      },
    ],
    name: "DNSDecodingFailed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "ens",
        type: "string",
      },
    ],
    name: "DNSEncodingFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "EmptyAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "status",
        type: "uint16",
      },
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "HttpError",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidBatchGatewayResponse",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "string[]",
        name: "urls",
        type: "string[]",
      },
      {
        internalType: "bytes",
        name: "callData",
        type: "bytes",
      },
      {
        internalType: "bytes4",
        name: "callbackFunction",
        type: "bytes4",
      },
      {
        internalType: "bytes",
        name: "extraData",
        type: "bytes",
      },
    ],
    name: "OffchainLookup",
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
        internalType: "bytes",
        name: "errorData",
        type: "bytes",
      },
    ],
    name: "ResolverError",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "name",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "resolver",
        type: "address",
      },
    ],
    name: "ResolverNotContract",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "name",
        type: "bytes",
      },
    ],
    name: "ResolverNotFound",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "primary",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "primaryAddress",
        type: "bytes",
      },
    ],
    name: "ReverseAddressMismatch",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "selector",
        type: "bytes4",
      },
    ],
    name: "UnsupportedResolverProfile",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "resolver",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "name",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "string[]",
        name: "gateways",
        type: "string[]",
      },
    ],
    name: "resolveWithResolver",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;
