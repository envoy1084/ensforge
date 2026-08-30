import { describe, expect, it } from "vitest";

import {
  mainnetV1Deployment,
  sepoliaV1Deployment,
  sepoliaV2Deployment,
} from "../../src/deployments/index.js";

// ensdomains/ensjs packages/ensjs/src/clients/l1.ts at this reviewed revision.
const ensjsRevision = "9c942510e468ac0d630c8cfab090cc15057ae4ef";

describe(`ENSjs L1 deployment conformance (${ensjsRevision.slice(0, 7)})`, () => {
  it("matches overlapping Mainnet contract addresses", () => {
    expect(mainnetV1Deployment.contracts).toMatchObject({
      registry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      baseRegistrar: "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85",
      ethRegistrarController: "0x253553366Da8546fC250F225fe3d25d0C782303b",
      bulkRenewal: "0xa12159e5131b1eEf6B4857EEE3e1954744b5033A",
      dnsRegistrar: "0xB32cB5677a7C971689228EC835800432B339bA2B",
      dnssecOracle: "0x0fc3152971714E5ed7723FAFa650F86A4BaF30C5",
      nameWrapper: "0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401",
      publicResolver: "0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63",
      reverseRegistrar: "0xa58E81fe9b61B5c3fE2AFD33CF304c454AbFc7Cb",
      universalResolver: "0x5a9236e72a66D3e08B83dcf489B4d850792B6009",
    });
  });

  it("matches overlapping Sepolia V1 contract addresses", () => {
    expect(sepoliaV1Deployment.contracts).toMatchObject({
      registry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      baseRegistrar: "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85",
      ethRegistrarController: "0xfb3cE5D01e0f33f41DbB39035dB9745962F1f968",
      bulkRenewal: "0x7f86d816165BaF4fD68bFd9A0706601cDD666ac4",
      dnsRegistrar: "0x5a07C75Ae469Bf3ee2657B588e8E6ABAC6741b4f",
      dnssecOracle: "0xe62E4b6cE018Ad6e916fcC24545e20a33b9d8653",
      nameWrapper: "0x0635513f179D50A207757E05759CbD106d7dFcE8",
      publicResolver: "0x5239A812ec9A62F46dbb5de8f346C8eFe7553A9f",
      reverseRegistrar: "0xA0a1AbcDAe1a2a4A2EF8e9113Ff0e02DD81DC0C6",
      universalResolver: "0xeEeEEEeE14D718C2B47D9923Deab1335E144EeEe",
    });
  });

  it("matches overlapping Sepolia V2 contract addresses", () => {
    expect(sepoliaV2Deployment).toMatchObject({
      contracts: {
        ethRegistry: "0xBDC85dD5b15D7ecb354cd7cb6f2c50b4f2c4F0E2",
        ethRegistrar: "0xa88553F454b77203B0D036A05c894d555EAAa2Cc",
        universalResolver: "0xeEeEEEeE14D718C2B47D9923Deab1335E144EeEe",
        verifiableFactory: "0x10dC6333CDFe1FCEf624c6e0a8221b91804Cd7ef",
      },
      implementations: {
        permissionedResolver: "0x9EAe5C2730a7dD16BDD1DeE6421a1B91e3B0365e",
        userRegistry: "0x624a25d67B59D587752EbEc8DdeD8827dAe52050",
      },
      migration: {
        ethRenewerV1: "0x4ad56feb5Fc7B8298db06E88fd5CBc41D64602Fa",
        lockedMigrationController: "0x5c39E36a69A9897F08954c71aCB1F36E0Bd4f409",
        migrationHelper: "0x1D8c7aA9862F9b823309Ad87A4864Fb27C575e85",
        unlockedMigrationController: "0x2FCf83232b93bD29C59dB18AaA1D4b62e9f9FC73",
      },
      testTokens: {
        dai: "0x5472C5725A00B7bA11F0794A79D08ade6F4683bD",
        usdc: "0x768F42455A2D082E23ceeF7d51e5787C82d67a39",
      },
    });
  });
});
