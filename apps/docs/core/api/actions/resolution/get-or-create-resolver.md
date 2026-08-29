---
title: getOrCreateResolver
description: Returns a compatible resolver or deploys one when required.
---

# getOrCreateResolver

Returns a compatible resolver or deploys one when required.

## Import

```ts
import { getOrCreateResolver } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getOrCreateResolver } from "@ensforge/core";
import { config } from "./config";

const result = await getOrCreateResolver(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetOrCreateResolverParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### salt

`bigint | undefined`

Deterministic deployment salt.

### admin

`string | undefined`

Value used for `admin` by this action.

### roles

`bigint | undefined`

Role bitmask to read, grant, or revoke.

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
import type { GetOrCreateResolverResult } from "@ensforge/core";
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

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getOrCreateResolver.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetOrCreateResolverError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.resolution.getOrCreateResolver`](/sdk/api/resolution/get-or-create-resolver)
