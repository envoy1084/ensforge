---
title: getRegistryRoles
description: Gets registry roles for ENS permissions and contract capabilities.
---

# getRegistryRoles

Gets registry roles for ENS permissions and contract capabilities.

This action belongs to ENS permissions and contract capabilities. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getRegistryRoles } from "@ensforge/core";
```

## Usage

```ts
import { getRegistryRoles } from "@ensforge/core";
import { config } from "./config";

const result = await getRegistryRoles(config, {
  name: "example.eth",
  account: {},
});
```

## Parameters

```ts
type GetRegistryRolesParameters = Parameters<typeof getRegistryRoles>[1];
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
type GetRegistryRolesResult = Awaited<ReturnType<typeof getRegistryRoles>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getRegistryRoles.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getRegistryRoles.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetRegistryRolesError = Effect.Effect.Error<ReturnType<typeof getRegistryRoles.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
