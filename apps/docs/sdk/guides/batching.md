---
title: Batching
description: Batch SDK reads and writes with bound action requests and intents.
---

# Batching

Create requests through methods in any group, then execute them through `sdk.batch`.

```ts
const profile = await sdk.batch.readBatch({
  owner: sdk.name.getOwner.request({ name: "ens.eth" }),
  resolver: sdk.resolution.getResolver.request({ name: "ens.eth" }),
  avatar: sdk.records.getAvatar.request({ name: "ens.eth" }),
});
```

Use `readBatchSettled` when one failed entry should not discard successful entries.

Write methods expose `.call`:

```ts
const result = await sdk.batch.sendCalls({
  calls: [
    sdk.records.setText.call({ name, key: "url", value: url }),
    sdk.records.setText.call({ name, key: "com.github", value: github }),
  ],
  mode: "auto",
});
```

See the Core [Batching guide](/core/guides/batching) for execution and atomicity semantics.
