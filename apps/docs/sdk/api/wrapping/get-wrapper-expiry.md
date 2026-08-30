---
title: getWrapperExpiry
description: Gets wrapper expiry for wrapped names.
---

# getWrapperExpiry

Gets wrapper expiry for wrapped names.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.wrapping.getWrapperExpiry({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { WrapperReadParameters } from "@ensforge/sdk";
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
import type { GetWrapperExpiryResult } from "@ensforge/sdk";
```

| Property    | Type                                          | Description                                            |
| ----------- | --------------------------------------------- | ------------------------------------------------------ |
| `protocol`  | `"v1" \| "v2"`                                | ENS protocol route used for the result.                |
| `supported` | `true \| false`                               | Whether the selected protocol supports this operation. |
| `wrapped`   | `boolean \| undefined`                        | Whether the name is held by the ENS Name Wrapper.      |
| `expiry`    | `bigint \| null \| undefined`                 | The expiry value returned by the operation.            |
| `reason`    | `"WRAPPER_EXPIRY_NOT_SUPPORTED" \| undefined` | The reason value returned by the operation.            |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.wrapping.getWrapperExpiry.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.wrapping.getWrapperExpiry.request(parameters);
```

## Error

```ts
import type { GetWrapperExpiryError } from "@ensforge/sdk";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getWrapperExpiry`](/core/api/actions/wrapping/get-wrapper-expiry)
