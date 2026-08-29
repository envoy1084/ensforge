---
title: Batching
description: Batch typed reads and wallet writes with Ensforge Core.
---

# Batching

Ensforge supports two different forms of batching: aggregated RPC reads and wallet-aware write calls.
They use different execution rules because reads are stateless while writes depend on account and
wallet capabilities.

## Batch reads

Every compatible read action exposes `.request`. A request describes the read but does not execute it.

```ts
import { getOwner, getResolver, getText, readBatch } from "@ensforge/core";

const profile = await readBatch(config, {
  owner: getOwner.request({ name: "ens.eth" }),
  resolver: getResolver.request({ name: "ens.eth" }),
  url: getText.request({ name: "ens.eth", key: "url" }),
});
```

The object keys are preserved in the result. Each value keeps the return type and failure type of its
source action.

Ensforge groups calls by execution requirements. Compatible onchain reads use Multicall3. CCIP Read,
resolver-specific aggregation, or other non-Multicall work is executed through the required path.

### Settled results

`readBatch` fails when an entry fails. Use `readBatchSettled` when partial results are useful.

```ts
import { readBatchSettled } from "@ensforge/core";

const results = await readBatchSettled(config, {
  owner: getOwner.request({ name: "ens.eth" }),
  url: getText.request({ name: "ens.eth", key: "url" }),
});

if (results.url.status === "failure") {
  console.error(results.url.error);
}
```

### Block consistency

Set `blockNumber` or `blockTag` on individual requests when you need historical reads. Requests with
incompatible block constraints are not forced into the same Multicall.

## Batch writes

Write actions expose `.call`, which produces a typed write intent without sending a transaction.

```ts
import { sendCalls, setText } from "@ensforge/core";

const result = await sendCalls(config, {
  calls: [
    setText.call({ name: "example.eth", key: "url", value: "https://example.com" }),
    setText.call({ name: "example.eth", key: "com.github", value: "example" }),
  ],
  mode: "auto",
});
```

In `auto` mode, Ensforge uses wallet call batching when supported and falls back to sequential
transactions. Set an explicit atomicity requirement when the operation must not be partially applied.

Complex operations such as registration use staged write plans. See [Writes](/core/guides/writes).
