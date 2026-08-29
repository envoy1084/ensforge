---
title: getOwner
description: Gets the effective owner and ownership source of an ENS name.
---

# getOwner

Gets the effective owner and ownership source of an ENS name.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.name.getOwner({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetOwnerParameters } from "@ensforge/sdk";
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
type GetOwnerResult = Awaited<ReturnType<typeof getOwner>>;
```

| Property         | Type                                                      | Description                                                  |
| ---------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
| `name`           | `string & Brand<"NormalizedName"> \| undefined`           | Normalized ENS name.                                         |
| `owner`          | `&#96;0x${string}&#96; \| null \| undefined`              | Current owner address, or `null` when the name has no owner. |
| `registrant`     | `&#96;0x${string}&#96; \| null \| undefined`              | The registrant value returned by the operation.              |
| `protocol`       | `"v1" \| "v2" \| undefined`                               | ENS protocol route used for the result.                      |
| `ownershipLevel` | `"registry" \| "registrar" \| "nameWrapper" \| undefined` | The ownershipLevel value returned by the operation.          |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.name.getOwner.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = sdk.name.getOwner.request(parameters);
```

## Error

```ts
import type { GetOwnerError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`getOwner`](/core/api/actions/name/get-owner)
