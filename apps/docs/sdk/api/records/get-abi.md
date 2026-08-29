---
title: getAbi
description: Gets abi for resolver records.
---

# getAbi

Gets abi for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { ens } from "./client";

const result = await ens.records.getAbi({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetAbiParameters } from "@ensforge/sdk";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### contentTypes

`ReadonlyArray<AbiContentType> | undefined`

Value used for `contentTypes` by this method.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetAbiResult = Awaited<ReturnType<typeof getAbi>>;
```

| Property      | Type                                                     | Description                                               |
| ------------- | -------------------------------------------------------- | --------------------------------------------------------- |
| `contentType` | `"json" \| "zlib-json" \| "cbor" \| "uri" \| null`       | The contentType value returned by the operation.          |
| `value`       | `Abi \| string \| null`                                  | Decoded value returned by the contract or resolver.       |
| `raw`         | `&#96;0x${string}&#96; & Brand<"AbiRecordData"> \| null` | Raw resolver bytes, or `null` when the record is not set. |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { ens } from "./client";

const program = ens.records.getAbi.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = ens.records.getAbi.request(parameters);
```

## Error

```ts
import type { GetAbiError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`getAbi`](/core/api/actions/records/get-abi)
