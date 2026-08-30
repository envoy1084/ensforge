import type { EnsV1Deployment } from "./types.js";

/** Current ENSv1 contracts on Ethereum mainnet. */
export const mainnetV1Deployment = {
  id: "mainnet-v1",
  chainId: 1,
  protocol: "v1",
  status: "active",
  contracts: {
    registry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    baseRegistrar: "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85",
    ethRegistrarController: "0x253553366Da8546fC250F225fe3d25d0C782303b",
    wrappedEthRegistrarController: "0x253553366Da8546fC250F225fe3d25d0C782303b",
    bulkRenewal: "0xa12159e5131b1eEf6B4857EEE3e1954744b5033A",
    priceOracle: "0x7542565191d074cE84fBfA92cAE13AcB84788CA9",
    nameWrapper: "0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401",
    publicResolver: "0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63",
    universalResolver: "0x5a9236e72a66D3e08B83dcf489B4d850792B6009",
    reverseRegistrar: "0xa58E81fe9b61B5c3fE2AFD33CF304c454AbFc7Cb",
    defaultReverseRegistrar: "0x283F227c4Bd38ecE252C4Ae7ECE650B0e913f1f9",
    dnsRegistrar: "0xB32cB5677a7C971689228EC835800432B339bA2B",
    dnssecOracle: "0x0fc3152971714E5ed7723FAFa650F86A4BaF30C5",
    offchainDnsResolver: "0xF142B308cF687d4358410a4cB885513b30A42025",
  },
  provenance: {
    repository: "https://github.com/ensdomains/ens-contracts",
    ref: "v1.7.0",
    commit: "9b034936a42f462fc04bc0a929a419ede5e18d59",
    documentation: "https://docs.ens.domains/learn/deployments/",
  },
} as const satisfies EnsV1Deployment;
