import { it } from "@effect/vitest";
import { Effect, Schema } from "effect";

import { expect } from "vitest";

import { DevnetDeploymentManifest } from "../../src/deployments/index.js";

it.effect("accepts a local ENS deployment manifest", () =>
  Effect.sync(() => {
    const manifest = Schema.decodeUnknownSync(DevnetDeploymentManifest)({
      chainId: 31337,
      contracts: {
        ENSRegistry: "0x0000000000000000000000000000000000000001",
        RootRegistry: "0x0000000000000000000000000000000000000002",
      },
    });

    expect(manifest.chainId).toBe(31337);
    expect(manifest.contracts.ENSRegistry).toBe("0x0000000000000000000000000000000000000001");
  }),
);

it.effect("rejects an invalid local contract address", () =>
  Effect.sync(() => {
    expect(() =>
      Schema.decodeUnknownSync(DevnetDeploymentManifest)({
        chainId: 31337,
        contracts: { ENSRegistry: "0x1234" },
      }),
    ).toThrow();
  }),
);

it.effect("rejects a deployment manifest for another chain", () =>
  Effect.sync(() => {
    expect(() =>
      Schema.decodeUnknownSync(DevnetDeploymentManifest)({
        chainId: 1,
        contracts: {
          ENSRegistry: "0x0000000000000000000000000000000000000001",
        },
      }),
    ).toThrow();
  }),
);
