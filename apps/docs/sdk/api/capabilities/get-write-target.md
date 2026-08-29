---
title: getWriteTarget
description: Gets write target for capability and authorization discovery.
---

# getWriteTarget

Gets write target for capability and authorization discovery.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { ens } from "./client";

const result = await ens.capabilities.getWriteTarget({
  name: "example.eth",
  operation: {},
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetWriteTargetParameters } from "@ensforge/sdk";
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

### operation

`WriteOperation`

Value used for `operation` by this method.

## Return Type

```ts
type GetWriteTargetResult = Awaited<ReturnType<typeof getWriteTarget>>;
```

| Property            | Type                                                                                                                                                                                                                                                                                                     | Description                                            |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `available`         | `false \| true`                                                                                                                                                                                                                                                                                          | The available value returned by the operation.         |
| `protocol`          | `"v1" \| "v2"`                                                                                                                                                                                                                                                                                           | ENS protocol route used for the result.                |
| `reason`            | `"NAME_NOT_REGISTERED" \| "RESOLVER_NOT_FOUND" \| "OPERATION_UNSUPPORTED" \| undefined`                                                                                                                                                                                                                  | The reason value returned by the operation.            |
| `kind`              | `"registry" \| "name-wrapper" \| "wrapper-registry" \| "resolver" \| "registrar" \| undefined`                                                                                                                                                                                                           | The kind value returned by the operation.              |
| `address`           | `&#96;0x${string}&#96; \| undefined`                                                                                                                                                                                                                                                                     | Decoded address, or `null` when the record is not set. |
| `operation`         | `{ readonly type: "address"; readonly coinType: bigint; } \| { readonly type: "text"; readonly key: string; } \| { readonly type: "contentHash"; } \| { readonly type: "pubkey"; } \| { readonly type: "abi"; readonly contentType?: bigint \| undefined; } \| ... 12 more ... \| { ...; } \| undefined` | The operation value returned by the operation.         |
| `node`              | `&#96;0x${string}&#96; & Brand<"Namehash"> \| undefined`                                                                                                                                                                                                                                                 | The node value returned by the operation.              |
| `tokenId`           | `bigint \| null \| undefined`                                                                                                                                                                                                                                                                            | The tokenId value returned by the operation.           |
| `resource`          | `bigint \| null \| undefined`                                                                                                                                                                                                                                                                            | The resource value returned by the operation.          |
| `inheritedResolver` | `boolean \| undefined`                                                                                                                                                                                                                                                                                   | The inheritedResolver value returned by the operation. |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { ens } from "./client";

const program = ens.capabilities.getWriteTarget.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = ens.capabilities.getWriteTarget.request(parameters);
```

## Error

```ts
import type { GetWriteTargetError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`getWriteTarget`](/core/api/actions/capabilities/get-write-target)
