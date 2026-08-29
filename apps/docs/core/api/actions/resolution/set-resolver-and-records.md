---
title: setResolverAndRecords
description: Sets a resolver and initial records through a resumable workflow.
---

# setResolverAndRecords

Sets a resolver and initial records through a resumable workflow.

## Import

```ts
import { setResolverAndRecords } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { setResolverAndRecords } from "@ensforge/core";
import { config } from "./config";

const result = await setResolverAndRecords(config, {
  name: "example.eth",
  records: [],
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { SetResolverAndRecordsParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### records

`ReadonlyArray<SetRecordInput>`

Records selected, read, or written by the operation.

### resolver

`string | undefined`

Resolver address used by the operation.

### salt

`bigint | undefined`

Deterministic deployment salt.

### admin

`string | undefined`

Value used for `admin` by this action.

### roles

`bigint | undefined`

Role bitmask to read, grant, or revoke.

### setters

`ReadonlyArray<Hex> | undefined`

Encoded initial resolver setter calls.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this operation. Defaults to the wallet resolved from the config.

### account

`Account | Address | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

### confirmation

`ConfirmationPolicy | undefined`

Controls whether the action returns after submission or waits for one or more confirmations.

### resume

`SetResolverAndRecordsProgress | undefined`

Previously returned progress used to continue an incomplete workflow.

## Return Type

```ts
import type { SetResolverAndRecordsProgress } from "@ensforge/core";
```

| Property         | Type                    | Description                                         |
| ---------------- | ----------------------- | --------------------------------------------------- |
| `protocol`       | `"v1" \| "v2"`          | ENS protocol route used for the result.             |
| `resolver`       | `&#96;0x${string}&#96;` | The resolver value returned by the operation.       |
| `resolverSource` | `ResolverSource`        | The resolverSource value returned by the operation. |
| `write`          | `WritePlanProgress`     | Progress for the write plan used by the workflow.   |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = setResolverAndRecords.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { SetResolverAndRecordsError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.resolution.setResolverAndRecords`](/sdk/api/resolution/set-resolver-and-records)
