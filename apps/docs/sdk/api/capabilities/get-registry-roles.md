---
title: getRegistryRoles
description: Gets registry roles for capability and authorization discovery.
---

# getRegistryRoles

Gets registry roles for capability and authorization discovery.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.capabilities.getRegistryRoles({
  name: "example.eth",
  account: {},
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="capabilities.getRegistryRoles" />

## Parameters

```ts
import type { AccountCapabilityParameters } from "@ensforge/sdk/capabilities";
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

### account

`EthereumAddress`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

## Return Type

```ts
type GetRegistryRolesResult = Awaited<ReturnType<typeof getRegistryRoles>>;
```

| Property    | Type                                                                        | Description                                            |
| ----------- | --------------------------------------------------------------------------- | ------------------------------------------------------ |
| `supported` | `false \| true`                                                             | Whether the selected protocol supports this operation. |
| `protocol`  | `"v1" \| "v2" \| "v2"`                                                      | ENS protocol route used for the result.                |
| `reason`    | `"RESOLVER_NOT_FOUND" \| "ROLE_BASED_PERMISSIONS_UNSUPPORTED" \| undefined` | The reason value returned by the operation.            |
| `registry`  | `&#96;0x${string}&#96; \| undefined`                                        | The registry value returned by the operation.          |
| `resource`  | `bigint \| undefined`                                                       | The resource value returned by the operation.          |
| `account`   | `&#96;0x${string}&#96; \| undefined`                                        | The account value returned by the operation.           |
| `roles`     | `bigint \| undefined`                                                       | The roles value returned by the operation.             |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.capabilities.getRegistryRoles.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.capabilities.getRegistryRoles.request(parameters);
```

## Error

```ts
import type { GetRegistryRolesError } from "@ensforge/sdk/capabilities";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getRegistryRoles`](/core/api/actions/capabilities/get-registry-roles)
