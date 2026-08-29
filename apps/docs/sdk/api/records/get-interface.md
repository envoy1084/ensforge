---
title: getInterface
description: Gets interface for resolver records.
---

# getInterface

Gets interface for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { ens } from "./client";

const result = await ens.records.getInterface({
  name: "example.eth",
  interfaceId: "0x01ffc9a7",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetInterfaceParameters } from "@ensforge/sdk";
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
import { ens } from "./client";

const program = ens.records.getInterface.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = ens.records.getInterface.request(parameters);
```

## Error

```ts
import type { GetInterfaceError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`getInterface`](/core/api/actions/records/get-interface)
