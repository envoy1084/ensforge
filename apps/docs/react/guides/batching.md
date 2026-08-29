---
title: Batching
description: Batch ENS reads and wallet writes from React.
---

# Batching

Use `useReadBatch` with requests from the SDK shared by the provider.

```tsx
const sdk = useEnsforge();
const profile = useReadBatch({
  requests: {
    owner: sdk.name.getOwner.request({ name }),
    avatar: sdk.records.getAvatar.request({ name }),
  },
});
```

Use `useReadBatchSettled` when individual failures should remain in the returned object.

For writes, construct intents and pass them to `useSendCalls`, or use a higher-level mutation such as
`useSetRecords` that already selects resolver and wallet aggregation.

Wallet batching is capability-aware. `auto` can fall back to sequential transactions; an explicit
atomicity requirement can reject unsupported execution instead.
