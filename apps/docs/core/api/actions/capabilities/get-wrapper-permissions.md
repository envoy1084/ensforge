---
title: getWrapperPermissions
description: Gets wrapper permissions for ENS permissions and contract capabilities.
---

# getWrapperPermissions

Gets wrapper permissions for ENS permissions and contract capabilities.

This action belongs to ENS permissions and contract capabilities. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getWrapperPermissions } from "@ensforge/core";
```

## Usage

```ts
import { getWrapperPermissions } from "@ensforge/core";
import { config } from "./config";

const result = await getWrapperPermissions(config, {
  name: "example.eth",
  account: {},
});
```

## Parameters

```ts
type GetWrapperPermissionsParameters = Parameters<typeof getWrapperPermissions>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

### account

`EthereumAddress`

Account used for authorization and wallet execution.

## Return Type

```ts
type GetWrapperPermissionsResult = Awaited<ReturnType<typeof getWrapperPermissions>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getWrapperPermissions.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getWrapperPermissions.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetWrapperPermissionsError = Effect.Effect.Error<
  ReturnType<typeof getWrapperPermissions.effect>
>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
