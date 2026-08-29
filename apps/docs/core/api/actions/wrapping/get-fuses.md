---
title: getFuses
description: Gets fuses for wrapped names, expiries, and fuses.
---

# getFuses

Gets fuses for wrapped names, expiries, and fuses.

## Import

```ts
import { getFuses } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getFuses } from "@ensforge/core";
import { config } from "./config";

const result = await getFuses(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { WrapperReadParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
import type { GetFusesResult } from "@ensforge/core";
```

| Property           | Type                                                                                                                                                                                                                                   | Description                                            |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `protocol`         | `"v1" \| "v2"`                                                                                                                                                                                                                         | ENS protocol route used for the result.                |
| `supported`        | `true \| false`                                                                                                                                                                                                                        | Whether the selected protocol supports this operation. |
| `wrapped`          | `boolean \| undefined`                                                                                                                                                                                                                 | Whether the name is held by the ENS Name Wrapper.      |
| `value`            | `number \| undefined`                                                                                                                                                                                                                  | Decoded value returned by the contract or resolver.    |
| `active`           | `readonly ("cannotUnwrap" \| "cannotBurnFuses" \| "cannotTransfer" \| "cannotSetResolver" \| "cannotSetTtl" \| "cannotCreateSubdomain" \| "cannotApprove" \| "parentCannotControl" \| "isDotEth" \| "canExtendExpiry")[] \| undefined` | The active value returned by the operation.            |
| `ownerControlled`  | `number \| undefined`                                                                                                                                                                                                                  | The ownerControlled value returned by the operation.   |
| `parentControlled` | `number \| undefined`                                                                                                                                                                                                                  | The parentControlled value returned by the operation.  |
| `reason`           | `"FUSES_NOT_SUPPORTED" \| undefined`                                                                                                                                                                                                   | The reason value returned by the operation.            |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getFuses.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getFuses.request(parameters);
```

## Error

```ts
import type { GetFusesError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.wrapping.getFuses`](/sdk/api/wrapping/get-fuses)
