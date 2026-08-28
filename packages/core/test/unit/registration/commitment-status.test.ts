import { assert, describe, it } from "@effect/vitest";

import { classifyCommitmentStatus } from "../../../src/internal/registration/commitment-status.js";

describe("commitment status", () => {
  it("classifies missing, pending, ready, and expired commitments at exact boundaries", () => {
    assert.deepEqual(
      classifyCommitmentStatus({
        protocol: "v2",
        submittedAt: 0n,
        minimumAge: 60n,
        maximumAge: 300n,
        currentTime: 100n,
      }),
      { status: "not-found", protocol: "v2" },
    );

    const pending = classifyCommitmentStatus({
      protocol: "v1",
      submittedAt: 100n,
      minimumAge: 60n,
      maximumAge: 300n,
      currentTime: 159n,
    });
    assert.strictEqual(pending.status, "pending");
    if (pending.status === "pending") assert.strictEqual(pending.remainingSeconds, 1n);

    const ready = classifyCommitmentStatus({
      protocol: "v1",
      submittedAt: 100n,
      minimumAge: 60n,
      maximumAge: 300n,
      currentTime: 160n,
    });
    assert.strictEqual(ready.status, "ready");

    const expired = classifyCommitmentStatus({
      protocol: "v2",
      submittedAt: 100n,
      minimumAge: 60n,
      maximumAge: 300n,
      currentTime: 400n,
    });
    assert.strictEqual(expired.status, "expired");
  });
});
