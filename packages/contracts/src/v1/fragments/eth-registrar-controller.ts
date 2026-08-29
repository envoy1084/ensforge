import type { Abi } from "viem";

const ethRegistrarControllerV1Errors = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "commitment",
        type: "bytes32",
      },
    ],
    name: "CommitmentNotFound",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "commitment",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "minimumCommitmentTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentTimestamp",
        type: "uint256",
      },
    ],
    name: "CommitmentTooNew",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "commitment",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "maximumCommitmentTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentTimestamp",
        type: "uint256",
      },
    ],
    name: "CommitmentTooOld",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "DurationTooShort",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientValue",
    type: "error",
  },
  {
    inputs: [],
    name: "MaxCommitmentAgeTooHigh",
    type: "error",
  },
  {
    inputs: [],
    name: "MaxCommitmentAgeTooLow",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "NameNotAvailable",
    type: "error",
  },
  {
    inputs: [],
    name: "ResolverRequiredForReverseRecord",
    type: "error",
  },
  {
    inputs: [],
    name: "ResolverRequiredWhenDataSupplied",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "commitment",
        type: "bytes32",
      },
    ],
    name: "UnexpiredCommitmentExists",
    type: "error",
  },
] as const satisfies Abi;

export const ethRegistrarControllerV1MinRegistrationDurationAbi = [
  ...ethRegistrarControllerV1Errors,
  {
    inputs: [],
    name: "MIN_REGISTRATION_DURATION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;

export const ethRegistrarControllerV1CommitmentsAbi = [
  ...ethRegistrarControllerV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "commitments",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;

export const ethRegistrarControllerV1MakeCommitmentAbi = [
  ...ethRegistrarControllerV1Errors,
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "label",
            type: "string",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "secret",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "resolver",
            type: "address",
          },
          {
            internalType: "bytes[]",
            name: "data",
            type: "bytes[]",
          },
          {
            internalType: "uint8",
            name: "reverseRecord",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "referrer",
            type: "bytes32",
          },
        ],
        internalType: "struct IETHRegistrarController.Registration",
        name: "registration",
        type: "tuple",
      },
    ],
    name: "makeCommitment",
    outputs: [
      {
        internalType: "bytes32",
        name: "commitment",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const satisfies Abi;

export const ethRegistrarControllerV1MaxCommitmentAgeAbi = [
  ...ethRegistrarControllerV1Errors,
  {
    inputs: [],
    name: "maxCommitmentAge",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;

export const ethRegistrarControllerV1MinCommitmentAgeAbi = [
  ...ethRegistrarControllerV1Errors,
  {
    inputs: [],
    name: "minCommitmentAge",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;

export const ethRegistrarControllerV1PricesAbi = [
  ...ethRegistrarControllerV1Errors,
  {
    inputs: [],
    name: "prices",
    outputs: [
      {
        internalType: "contract IPriceOracle",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;

export const ethRegistrarControllerV1RegisterAbi = [
  ...ethRegistrarControllerV1Errors,
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "label",
            type: "string",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "secret",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "resolver",
            type: "address",
          },
          {
            internalType: "bytes[]",
            name: "data",
            type: "bytes[]",
          },
          {
            internalType: "uint8",
            name: "reverseRecord",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "referrer",
            type: "bytes32",
          },
        ],
        internalType: "struct IETHRegistrarController.Registration",
        name: "registration",
        type: "tuple",
      },
    ],
    name: "register",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const satisfies Abi;

export const ethRegistrarControllerV1RenewAbi = [
  ...ethRegistrarControllerV1Errors,
  {
    inputs: [
      {
        internalType: "string",
        name: "label",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "referrer",
        type: "bytes32",
      },
    ],
    name: "renew",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const satisfies Abi;

export const ethRegistrarControllerV1RentPriceAbi = [
  ...ethRegistrarControllerV1Errors,
  {
    inputs: [
      {
        internalType: "string",
        name: "label",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "rentPrice",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "base",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "premium",
            type: "uint256",
          },
        ],
        internalType: "struct IPriceOracle.Price",
        name: "price",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;
