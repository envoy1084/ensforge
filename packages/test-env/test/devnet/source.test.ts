import { Effect } from "effect";

import { describe, expect, it } from "vitest";

import {
  ensContractsV2Commit,
  ensDevnetImageDigest,
  ensDevnetImageRepository,
  ensDevnetPublishedImage,
  verifyContractsSource,
} from "../../src/devnet/source.js";

describe("published ENS devnet image", () => {
  it("pins the image by digest independently from the contracts commit", () => {
    expect(ensContractsV2Commit).toBe("892311a7268bf6051d5fe65740f1eebfaf8db431");
    expect(ensDevnetImageRepository).toBe("ghcr.io/envoy1084/ensforge-devnet");
    expect(ensDevnetImageDigest).toBe(
      "sha256:5efb35e1f12153c605d37a913a162580749f56fe4a270466f7c62fbf927bcfeb",
    );
    expect(ensDevnetPublishedImage).toBe(`${ensDevnetImageRepository}@${ensDevnetImageDigest}`);
  });
});

it("reports a missing contracts checkout through the typed error channel", async () => {
  const error = await Effect.runPromise(
    Effect.flip(
      verifyContractsSource({
        directory: "/ensforge-test-source-that-does-not-exist",
      }),
    ),
  );

  expect(error.code).toBe("SOURCE_UNAVAILABLE");
});
