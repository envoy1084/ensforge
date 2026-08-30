import type { EnsV1Deployment } from "./types.js";

/** Legacy ENSv1 contracts retained on Sepolia for compatibility and migration. */
export const sepoliaV1Deployment = {
  id: "sepolia-v1",
  chainId: 11155111,
  protocol: "v1",
  status: "legacy",
  contracts: {
    registry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    baseRegistrar: "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85",
    ethRegistrarController: "0xfb3cE5D01e0f33f41DbB39035dB9745962F1f968",
    bulkRenewal: "0x7f86d816165BaF4fD68bFd9A0706601cDD666ac4",
    priceOracle: "0x6810DbCE73C67506f785A225F818b30D8f209AAb",
    nameWrapper: "0x0635513f179D50A207757E05759CbD106d7dFcE8",
    publicResolver: "0x5239A812ec9A62F46dbb5de8f346C8eFe7553A9f",
    universalResolver: "0xeEeEEEeE14D718C2B47D9923Deab1335E144EeEe",
    reverseRegistrar: "0xA0a1AbcDAe1a2a4A2EF8e9113Ff0e02DD81DC0C6",
    defaultReverseRegistrar: "0x4F382928805ba0e23B30cFB75fC9E848e82DFD47",
    dnsRegistrar: "0x5a07C75Ae469Bf3ee2657B588e8E6ABAC6741b4f",
    dnssecOracle: "0xe62E4b6cE018Ad6e916fcC24545e20a33b9d8653",
    offchainDnsResolver: "0x179Be112b24Ad4cFC392eF8924DfA08C20Ad8583",
  },
  provenance: {
    repository: "https://github.com/ensdomains/ens-contracts",
    ref: "v1.7.0",
    commit: "9b034936a42f462fc04bc0a929a419ede5e18d59",
    documentation: "https://docs.ens.domains/learn/deployments/",
  },
} as const satisfies EnsV1Deployment;
