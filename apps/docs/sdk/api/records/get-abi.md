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
import { sdk } from "./client";

const result = await sdk.records.getAbi({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="records.getAbi" />

## Parameters

```ts
import type { GetAbiParameters } from "@ensforge/sdk/records";
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

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.records.getAbi.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.records.getAbi.request(parameters);
```

## Error

```ts
import type { GetAbiError } from "@ensforge/sdk/records";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getAbi`](/core/api/actions/records/get-abi)
