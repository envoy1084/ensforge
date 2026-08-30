import type { EnsV2Deployment } from "./types.js";

/** Beta ENSv2 transition deployment on Sepolia. */
export const sepoliaV2Deployment = {
  id: "sepolia-v2",
  chainId: 11155111,
  protocol: "v2",
  status: "beta",
  contracts: {
    universalResolver: "0xeEeEEEeE14D718C2B47D9923Deab1335E144EeEe",
    rootRegistry: "0x8115186E8f2E0B0281e86ab91f0f48Ba90364354",
    ethRegistry: "0xBDC85dD5b15D7ecb354cd7cb6f2c50b4f2c4F0E2",
    ethRegistrar: "0xa88553F454b77203B0D036A05c894d555EAAa2Cc",
    rentPriceOracle: "0x8914b66260EB8C4fff795650c3AE8Cd335958987",
    ensV2Resolver: "0x508cb4E4596429Ca98a1bB3112d88D18F92456b5",
    publicResolver: "0xe7B9A25607E02da8145E4eB1836CA539e53F11f7",
    verifiableFactory: "0x10dC6333CDFe1FCEf624c6e0a8221b91804Cd7ef",
    labelStore: "0x532CD0CC4AC0793d838F71A67d29B2D790D18777",
    contractNamer: "0xA48EB920950D7f4963D1D87F15f195624FbfbD6a",
    reverseRegistrarAdapter: "0x035ae6188ac22ab79b5018039dFbda4FFe7990e9",
    defaultReverseRegistrarAdapter: "0x7a84e241f862D73960D73c26d68c3C8F89F0B18F",
  },
  implementations: {
    universalResolver: "0x4A1817d13E9cF196f471725176355C1234b63C70",
    permissionedResolver: "0x9EAe5C2730a7dD16BDD1DeE6421a1B91e3B0365e",
    userRegistry: "0x624a25d67B59D587752EbEc8DdeD8827dAe52050",
    wrapperRegistry: "0x433F81a3E8921Fc868ae1A04576f135d9A75B0f2",
    contractNamer: "0xe2Dda913aCf8378616A2142B820d3cA775b0332d",
  },
  migration: {
    ensV1Resolver: "0xae66c62AcAE72098BdAc57d8E8AED53EF000b2Ba",
    ethRenewerV1: "0x4ad56feb5Fc7B8298db06E88fd5CBc41D64602Fa",
    unlockedMigrationController: "0x2FCf83232b93bD29C59dB18AaA1D4b62e9f9FC73",
    lockedMigrationController: "0x5c39E36a69A9897F08954c71aCB1F36E0Bd4f409",
    migrationHelper: "0x1D8c7aA9862F9b823309Ad87A4864Fb27C575e85",
    graveyard: "0xF83Fe2658F702A072f3c7b0DC4A0ab8c7b044750",
    publicResolverSet: "0xf2794eBD70C1fa74094A9eC653DA1c2dF9f5a5A9",
    registryUpgradeSet: "0x18D2A9dEDE9B2347f9443783b96954e37E3b7AE6",
  },
  infrastructure: {
    managedUniversalResolverProxy: "0x6d80F2172CFdEc5730fE683860C33d26fC42e6F1",
    batchRegistrar: "0x8B16d15F3e51074D0E06F3cf4A0053f7Cb92A7FB",
    dnsV1MirrorRootBatchRegistrar: "0xDc5C31F7eA5e31EFc6d5C68dd568f4c4A169804B",
  },
  experimental: {
    hca: {
      ownerAndSessionValidator: "0x976d90c51afb2c11660eaee94bd42a7e84751d08",
      upgradeGate: "0x3A121Fc283E53d2F45564edf97dC8685Ede35005",
      standaloneFactory: "0x900FF7cF617Ef9D802178B4ef480491e3A782672",
      standaloneImplementation: "0xd213de41421fed3a5e475943f9d634a0cf64a385",
      trustedSet: "0xb3240a0E6c80984C14def037f4F540eDc3502B48",
    },
  },
  testTokens: {
    dai: "0x5472C5725A00B7bA11F0794A79D08ade6F4683bD",
    usdc: "0x768F42455A2D082E23ceeF7d51e5787C82d67a39",
  },
  provenance: {
    repository: "https://github.com/ensdomains/contracts-v2",
    ref: "deploy/sepolia-build-info",
    commit: "09bf3ac64a6fb1b215573c019b17e8c501bb3ca0",
    documentation: "https://docs.ens.domains/learn/deployments/",
  },
} as const satisfies EnsV2Deployment;
