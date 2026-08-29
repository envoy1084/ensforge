import { assert, describe, it } from "@effect/vitest";

import { mainnetV1Deployment, sepoliaV2Deployment } from "@ensforge/contracts/deployments";

import { getResolverAuthorizationModel } from "../../../../src/internal/capabilities/resolver-authorization.js";

const customResolver = "0x0000000000000000000000000000000000000001";

describe("resolver authorization model", () => {
  it("recognizes deployed public, permissioned, and custom resolvers", () => {
    assert.strictEqual(
      getResolverAuthorizationModel(mainnetV1Deployment.contracts.publicResolver, false, {
        protocol: "v1",
        v1: mainnetV1Deployment,
      }),
      "owner-delegate",
    );
    assert.strictEqual(
      getResolverAuthorizationModel(customResolver, true, {
        protocol: "v2",
        v2: sepoliaV2Deployment,
      }),
      "role",
    );
    assert.strictEqual(
      getResolverAuthorizationModel(customResolver, false, {
        protocol: "v2",
        v2: sepoliaV2Deployment,
      }),
      "unknown",
    );
  });
});
