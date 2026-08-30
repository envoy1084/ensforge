---
title: getOrCreateResolver
description: Returns a compatible resolver or creates one.
---

# getOrCreateResolver

Returns a compatible resolver or creates one.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.resolution.getOrCreateResolver({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetOrCreateResolverParameters } from "@ensforge/sdk/resolution";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### salt

`bigint | undefined`

Value used for `salt` by this method.

### admin

`string | undefined`

Value used for `admin` by this method.

### roles

`bigint | undefined`

Role bitmask to inspect, grant, or revoke.

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
import type { GetOrCreateResolverResult } from "@ensforge/sdk/resolution";
```

| Property         | Type                                     | Description                                            |
| ---------------- | ---------------------------------------- | ------------------------------------------------------ |
| `status`         | `"existing" \| "selected" \| "deployed"` | Current query, transaction, batch, or workflow status. |
| `protocol`       | `"v1" \| "v2" \| "v1" \| "v2"`           | ENS protocol route used for the result.                |
| `resolver`       | `&#96;0x${string}&#96;`                  | The resolver value returned by the operation.          |
| `inherited`      | `false`                                  | The inherited value returned by the operation.         |
| `implementation` | `&#96;0x${string}&#96; \| undefined`     | The implementation value returned by the operation.    |
| `factory`        | `&#96;0x${string}&#96; \| undefined`     | The factory value returned by the operation.           |
| `call`           | `CallExecutionResult \| undefined`       | The call value returned by the operation.              |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.resolution.getOrCreateResolver.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetOrCreateResolverError } from "@ensforge/sdk/resolution";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getOrCreateResolver`](/core/api/actions/resolution/get-or-create-resolver)
