---
title: getWriteTarget
description: Resolves the contract, resource, and authorization required for an ENS write.
---

# getWriteTarget

Resolves the contract, resource, and authorization required for an ENS write.

## Import

```ts
import { getWriteTarget } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getWriteTarget } from "@ensforge/core";
import { config } from "./config";

const result = await getWriteTarget(config, {
  name: "example.eth",
  operation: {},
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetWriteTargetParameters } from "@ensforge/core";
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

Write operation whose authorization should be resolved.

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

const program = getWriteTarget.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getWriteTarget.request(parameters);
```

## Error

```ts
import type { GetWriteTargetError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.capabilities.getWriteTarget`](/sdk/api/capabilities/get-write-target)
