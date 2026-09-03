---
title: Writes
description: Configure a wallet and execute ENS writes through the SDK.
---

# Writes

Write methods simulate the contract call before sending it. The SDK resolves the correct ENS
contract and authorization route from the name state.

## Configure a wallet

Create public and wallet clients once, then pass them to `Ensforge`.

```ts [client.ts]
import { Ensforge } from "@ensforge/sdk";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { mainnet } from "viem/chains";

const publicClient = createPublicClient({ chain: mainnet, transport: http() });
const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});

export const ens = new Ensforge({ network: "mainnet", publicClient, walletClient });
```

```ts [profile.ts]
import { sdk } from "./client";

const result = await sdk.records.setText({
  name: "example.eth",
  key: "url",
  value: "https://example.com",
});

console.log(result.hash);
```

When configured with Wagmi, the active wallet client is resolved when the method runs. Account and
connector changes therefore do not require a new SDK instance.

## Execution policy

Write methods accept common execution controls in addition to their action-specific parameters.

- `mode` controls whether eligible calls use wallet batching or sequential transactions.
- `confirmation` controls whether the method returns after submission or waits for a receipt.
- `account` and `walletClient` override the configured wallet for one call.

```ts
const result = await sdk.records.setText({
  name: "example.eth",
  key: "com.github",
  value: "envoy1084",
  mode: "auto",
  confirmation: { confirmations: 2 },
});
```

`mode: "auto"` inspects wallet capabilities and uses the safest supported execution path. A batch
is only atomic when the wallet reports atomic batch support.

## Prepare calls

Write methods expose `.call` when the operation can be represented as a prepared call. This is
useful for previews, custom wallet flows, and [`sendCalls`](/sdk/api/batch/send-calls).

```ts
const call = sdk.records.setText.call({
  name: "example.eth",
  key: "url",
  value: "https://example.com",
});

const prepared = await sdk.batch.prepareCalls({ calls: [call] });
const simulation = await sdk.batch.simulateCalls(prepared);
```

## Resumable workflows

Registration and migration can span several transactions or a protocol waiting period. Their
result is a progress snapshot that can be persisted and passed back as `resume`.

```ts
const progress = await sdk.registration.registerName({
  name: "example.eth",
  owner: account.address,
  duration: 365n * 24n * 60n * 60n,
  secret,
});

if (progress.status !== "completed") {
  const completed = await sdk.registration.registerName({
    name: "example.eth",
    owner: account.address,
    duration: 365n * 24n * 60n * 60n,
    secret,
    resume: progress,
  });
}
```

Persist the complete progress value rather than reconstructing it. This keeps transaction hashes,
completed steps, and protocol timing intact.
