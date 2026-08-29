---
title: getInterface
description: Gets interface for ENS resolver records.
---

# getInterface

Gets interface for ENS resolver records.

## Import

```ts
import { getInterface } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getInterface } from "@ensforge/core";
import { config } from "./config";

const result = await getInterface(config, {
  name: "example.eth",
  interfaceId: "0x01ffc9a7",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetInterfaceParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### interfaceId

`string`

Four-byte ERC-165 interface identifier.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetInterfaceResult = Awaited<ReturnType<typeof getInterface>>;
```

| Property      | Type                                           | Description                                      |
| ------------- | ---------------------------------------------- | ------------------------------------------------ |
| `interfaceId` | `&#96;0x${string}&#96; & Brand<"InterfaceId">` | The interfaceId value returned by the operation. |
| `implementer` | `&#96;0x${string}&#96; \| null`                | The implementer value returned by the operation. |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getInterface.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getInterface.request(parameters);
```

## Error

```ts
import type { GetInterfaceError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.records.getInterface`](/sdk/api/records/get-interface)
