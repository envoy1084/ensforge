import type { Abi } from "viem";

const verifiableFactoryV2Errors = [
  {
    inputs: [
      {
        internalType: "address",
        name: "proxy",
        type: "address",
      },
    ],
    name: "VerificationFailed",
    type: "error",
  },
] as const satisfies Abi;

export const verifiableFactoryV2DeployProxyAbi = [
  ...verifiableFactoryV2Errors,
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "salt",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "deployProxy",
    outputs: [
      {
        internalType: "address",
        name: "proxy",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const verifiableFactoryV2VerifyContractAbi = [
  ...verifiableFactoryV2Errors,
  {
    inputs: [
      {
        internalType: "address",
        name: "proxy",
        type: "address",
      },
    ],
    name: "verifyContract",
    outputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;

export const verifiableFactoryV2ProxyLogicAbi = [
  {
    inputs: [],
    name: "proxyLogic",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;
