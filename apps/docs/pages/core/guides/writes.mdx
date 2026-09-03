---
title: Writes
description: Simulate, authorize, submit, batch, and resume ENS writes.
---

# Writes

Write actions prepare the target contract and calldata from the current state of a name. They then
resolve the wallet account, check the required authorization, simulate by default, and execute using
the configured confirmation policy.

## Configure a wallet

Provide a viem `WalletClient` or a Wagmi config with an active connection.

```ts
const config = createConfig({
  network: "mainnet",
  publicClient,
  walletClient,
  writes: {
    simulation: "required",
    confirmation: { type: "confirmed", confirmations: 1 },
  },
});
```

An action can override account, wallet, execution mode, or confirmation when its parameter type
supports those fields.

## Prepare without sending

Direct write actions expose `.call`.

```ts
const intent = setText.call({
  name: "example.eth",
  key: "url",
  value: "https://example.com",
});
```

The intent can be simulated, estimated, or combined with other intents before it reaches a wallet.

## Confirmation

`{ type: "confirmed" }` waits for a receipt and is the default. Use `{ type: "submitted" }` when the
transaction hash is sufficient and your application tracks confirmation separately.

## Resumable workflows

Registration, migration, renewal batches, and other multi-stage operations return progress that can
be persisted and passed back through `resume`.

```ts
const progress = await registerName(config, parameters);

if (progress.status !== "completed") {
  await saveProgress(progress);
}

const resumed = await registerName(config, {
  ...parameters,
  resume: await loadProgress(),
});
```

Resume with the same semantic inputs. ensforge validates the plan identity before continuing and
does not repeat stages already recorded as complete.

## User rejection

Wallet rejection is returned as a typed `WalletError`. Treat it as a normal user-controlled outcome;
do not automatically retry or show it as an infrastructure failure.
