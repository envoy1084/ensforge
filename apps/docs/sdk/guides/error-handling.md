---
title: Error Handling
description: Handle typed ensforge errors with Promises or Effect.
---

# Error Handling

SDK methods preserve the same typed errors as their Core actions. Use JavaScript control flow with
the Promise API, or match tagged errors directly with Effect.

## Promise errors

Import the error classes you want to handle from `@ensforge/sdk`.

```ts [index.ts]
import { ContractError, NameError, RpcError } from "@ensforge/sdk";
import { sdk } from "./client";

try {
  const owner = await sdk.name.getOwner({ name: "example.eth" });
  console.log(owner.address);
} catch (error) {
  if (error instanceof NameError) {
    console.error("Invalid ENS name", error.code);
  } else if (error instanceof RpcError) {
    console.error("RPC request failed", error.code);
  } else if (error instanceof ContractError) {
    console.error("Contract call failed", error.code);
  } else {
    throw error;
  }
}
```

<<< @/snippets/sdk/client.ts

Every ensforge error has a stable `_tag`, `code`, and `message`. Errors produced at an external
boundary also retain the original value in `cause`.

## Effect errors

The `.effect` API exposes the error channel at compile time. `Effect.catchTag` narrows the selected
error without hiding the remaining failures.

```ts [index.ts]
import { Effect } from "effect";
import { sdk } from "./client";

const owner = sdk.name.getOwner.effect({ name: "example.eth" }).pipe(
  Effect.catchTag("NameError", (error) =>
    Effect.logWarning(`Invalid name: ${error.code}`).pipe(Effect.as(null)),
  ),
  Effect.catchTag("RpcError", (error) =>
    Effect.logError(`RPC unavailable: ${error.code}`).pipe(Effect.as(null)),
  ),
);

const result = await Effect.runPromise(owner);
```

<<< @/snippets/sdk/client.ts

Use `Effect.catchTags` when several failures share one recovery policy, and `Effect.retry` for
transient read failures. Avoid retrying writes unless the operation is explicitly resumable.

## Configuration errors

The `Ensforge` constructor throws `ConfigError` synchronously when the selected network and client
chain do not match, or when neither a viem client nor Wagmi config can supply the required client.

```ts
import { ConfigError, Ensforge } from "@ensforge/sdk";

try {
  const ens = new Ensforge({ network: "mainnet", publicClient });
} catch (error) {
  if (error instanceof ConfigError) console.error(error.code, error.message);
}
```

See [Core Error Handling](/core/guides/error-handling) for the complete error taxonomy.
