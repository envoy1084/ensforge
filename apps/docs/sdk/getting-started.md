---
title: Getting Started
description: Create an ensforge client and call Promise or Effect methods.
---

# Getting Started

The SDK binds one ensforge configuration and exposes actions through capability groups such as
`name`, `records`, and `registration`. Create the client once for a network and reuse it.

## Create a client

Create a viem `PublicClient`, then pass it to `Ensforge`.

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const owner = await sdk.name.getOwner({ name: "sdk.eth" });

if (owner === null) {
  console.log("The name has no owner");
} else {
  console.log(owner.address, owner.protocol);
}
```

<<< @/snippets/sdk/client.ts[client.ts]

:::

The selected `network` and viem client chain must match. A mainnet client cannot be used with
`network: "sepolia"`.

## Read resolver records

Methods are grouped by the ENS capability they operate on.

::: code-group

```ts [profile.ts]
import { sdk } from "./client";

const [address, avatar, url] = await Promise.all([
  sdk.records.getAddress({ name: "sdk.eth" }),
  sdk.records.getAvatar({ name: "sdk.eth" }),
  sdk.records.getText({ name: "sdk.eth", key: "url" }),
]);
```

<<< @/snippets/sdk/client.ts[client.ts]

:::

Use [`sdk.batch.readBatch`](/sdk/api/batch/read-batch) when compatible reads should share a
Multicall request while retaining their individual result types.

## Use Effect

Every method is Promise-first and also exposes the underlying Effect through `.effect`.

::: code-group

```ts [profile.ts]
import { Effect } from "effect";
import { sdk } from "./client";

const profile = Effect.gen(function* () {
  const owner = yield* sdk.name.getOwner.effect({ name: "sdk.eth" });
  const avatar = yield* sdk.records.getAvatar.effect({ name: "sdk.eth" });

  return { owner, avatar };
});

const result = await Effect.runPromise(profile);
```

<<< @/snippets/sdk/client.ts[client.ts]

:::

Both forms execute the same implementation. Use Promises at conventional application boundaries and
Effects when you need typed failures, interruption, retries, concurrency, or tracing.

## Use a Wagmi config

If the application already uses Wagmi, provide its config instead of creating viem clients twice.

::: code-group

```ts [client.ts]
import { Ensforge } from "@ensforge/sdk";
import { wagmiConfig } from "./wagmi";

export const sdk = new Ensforge({
  network: "mainnet",
  wagmiConfig,
});
```

<<< @/snippets/wagmi/config.ts[wagmi.ts]

:::

The public client is selected immediately. The wallet client is resolved when a write runs, so
account and connector changes do not require recreating the SDK.

## Next steps

- Learn the [`Ensforge` constructor](/sdk/api/ensforge).
- Browse [Grouped Actions](/sdk/guides/grouped-actions).
- Compose reads and writes in [Batching](/sdk/guides/batching).
- Handle typed failures in [Error Handling](/sdk/guides/error-handling).
