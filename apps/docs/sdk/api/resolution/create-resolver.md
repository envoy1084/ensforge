---
title: createResolver
description: Creates resolver for resolution and resolver lifecycle.
---

# createResolver

Creates resolver for resolution and resolver lifecycle.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.resolution.createResolver({
  salt: 1n,
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { CreateResolverParameters } from "@ensforge/sdk";
```

### salt

`bigint`

Value used for `salt` by this method.

### admin

`string | undefined`

Value used for `admin` by this method.

### roles

`bigint | undefined`

Role bitmask to inspect, grant, or revoke.

### setters

`ReadonlyArray<Hex> | undefined`

Value used for `setters` by this method.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this operation. Defaults to the wallet resolved from the config.

### account

`Account | Address | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

### confirmation

`ConfirmationPolicy | undefined`

Controls whether the action returns after submission or waits for one or more confirmations.

## Return Type

```ts
import type { CreateResolverResult } from "@ensforge/sdk";
```

| Property         | Type                    | Description                                            |
| ---------------- | ----------------------- | ------------------------------------------------------ |
| `status`         | `"deployed"`            | Current query, transaction, batch, or workflow status. |
| `resolver`       | `&#96;0x${string}&#96;` | The resolver value returned by the operation.          |
| `implementation` | `&#96;0x${string}&#96;` | The implementation value returned by the operation.    |
| `factory`        | `&#96;0x${string}&#96;` | The factory value returned by the operation.           |
| `call`           | `CallExecutionResult`   | The call value returned by the operation.              |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.resolution.createResolver.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

Use `.call` to prepare this write for simulation, wallet batching, or a custom execution policy.

```ts
const call = sdk.resolution.createResolver.call(parameters);
```

## Error

```ts
import type { CreateResolverError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`createResolver`](/core/api/actions/resolution/create-resolver)
