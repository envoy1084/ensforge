---
title: Write Plans
description: Model staged, resumable ENS writes.
---

# Write Plans

A `WritePlan` describes ordered stages that can contain calls or time-based waits. Plans power
registration, migration, DNS import, and other operations that cannot complete in one transaction.

```ts
import type { WritePlan } from "@ensforge/core";

const plan: WritePlan = {
  id: "profile-setup",
  stages: [
    {
      type: "calls",
      id: "records",
      calls: [setText.call({ name, key: "url", value })],
      mode: "auto",
      atomicity: "preferred",
      confirmation: { type: "confirmed" },
    },
  ],
};
```

## Execute

```ts
const progress = await executeWritePlan(config, { plan });
```

`WritePlanProgress` records completed stages, submitted batches, receipts, the next action time, and
any typed failure.

## Resume

```ts
const resumed = await executeWritePlan(config, {
  plan,
  resume: progress,
});
```

The plan ID and completed stage identities must match. ensforge does not replay completed stages.

## Status

- `waiting`: a time condition such as commitment age has not been reached.
- `partial`: at least one stage completed, but the plan needs another execution.
- `submitted`: calls were submitted under a submitted-only confirmation policy.
- `completed`: every stage completed under its confirmation policy.

Persist progress before leaving the workflow screen. Progress values contain no wallet secret, but
the application should still associate them with the correct account, chain, and user session.
