import { Effect } from "effect";

import { describe, expect, it } from "vitest";

import { mapDevnetDeployments } from "../../src/deployments/profile.js";
import { deploymentManifest } from "../fixtures/deployment-manifest.js";

describe("devnet deployment profiles", () => {
  it("maps official deployment names into v1 and v2 SDK profiles", async () => {
    const deployments = await Effect.runPromise(mapDevnetDeployments(deploymentManifest));

    expect(deployments.v1).toMatchObject({
      id: "devnet-v1",
      chainId: 31337,
      protocol: "v1",
      contracts: {
        registry: deploymentManifest.contracts.ENSRegistry,
        publicResolver: deploymentManifest.contracts.PublicResolver,
      },
    });
    expect(deployments.v2).toMatchObject({
      id: "devnet-v2",
      chainId: 31337,
      protocol: "v2",
      contracts: {
        rootRegistry: deploymentManifest.contracts.RootRegistry,
        publicResolver: deploymentManifest.contracts.PublicResolverV2,
      },
      migration: {
        ethRenewerV1: deploymentManifest.contracts.ETHRenewerV1,
      },
    });
    expect(deployments.multicall3).toBe(deploymentManifest.contracts.Multicall3);
    expect(deployments.requiredAddresses).toContain(
      deploymentManifest.contracts.WrapperRegistryImpl,
    );
  });

  it("fails when an SDK-required deployment is absent", async () => {
    const { ENSRegistry: _, ...contracts } = deploymentManifest.contracts;
    const error = await Effect.runPromise(
      Effect.flip(
        mapDevnetDeployments({
          chainId: 31337,
          contracts,
        }),
      ),
    );

    expect(error.code).toBe("DEPLOYMENTS_INVALID");
  });
});
