---
title: getWrapperPermissions
description: Gets wrapper permissions for capability and authorization discovery.
---

# getWrapperPermissions

Gets wrapper permissions for capability and authorization discovery.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.capabilities.getWrapperPermissions({
  name: "example.eth",
  account: {},
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { AccountCapabilityParameters } from "@ensforge/sdk";
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
type GetWrapperPermissionsResult = Awaited<ReturnType<typeof getWrapperPermissions>>;
```

| Property            | Type                                         | Description                                                  |
| ------------------- | -------------------------------------------- | ------------------------------------------------------------ |
| `supported`         | `false \| true`                              | Whether the selected protocol supports this operation.       |
| `protocol`          | `"v1" \| "v2" \| "v1" \| "v2"`               | ENS protocol route used for the result.                      |
| `reason`            | `"NAME_NOT_WRAPPED" \| undefined`            | The reason value returned by the operation.                  |
| `wrapper`           | `&#96;0x${string}&#96; \| undefined`         | The wrapper value returned by the operation.                 |
| `account`           | `&#96;0x${string}&#96; \| undefined`         | The account value returned by the operation.                 |
| `owner`             | `&#96;0x${string}&#96; \| undefined`         | Current owner address, or `null` when the name has no owner. |
| `tokenId`           | `bigint \| undefined`                        | The tokenId value returned by the operation.                 |
| `fuses`             | `number \| undefined`                        | The fuses value returned by the operation.                   |
| `expiry`            | `bigint \| undefined`                        | The expiry value returned by the operation.                  |
| `approved`          | `&#96;0x${string}&#96; \| null \| undefined` | The approved value returned by the operation.                |
| `operatorApproved`  | `boolean \| undefined`                       | The operatorApproved value returned by the operation.        |
| `canModify`         | `boolean \| undefined`                       | The canModify value returned by the operation.               |
| `canExtendSubnames` | `boolean \| undefined`                       | The canExtendSubnames value returned by the operation.       |
| `canUnwrap`         | `boolean \| undefined`                       | The canUnwrap value returned by the operation.               |
| `canTransfer`       | `boolean \| undefined`                       | The canTransfer value returned by the operation.             |
| `canSetResolver`    | `boolean \| undefined`                       | The canSetResolver value returned by the operation.          |
| `canSetTtl`         | `boolean \| undefined`                       | The canSetTtl value returned by the operation.               |
| `canCreateSubname`  | `boolean \| undefined`                       | The canCreateSubname value returned by the operation.        |
| `canApprove`        | `boolean \| undefined`                       | The canApprove value returned by the operation.              |
| `resource`          | `bigint \| undefined`                        | The resource value returned by the operation.                |
| `roles`             | `bigint \| undefined`                        | The roles value returned by the operation.                   |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.capabilities.getWrapperPermissions.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = sdk.capabilities.getWrapperPermissions.request(parameters);
```

## Error

```ts
import type { GetWrapperPermissionsError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`getWrapperPermissions`](/core/api/actions/capabilities/get-wrapper-permissions)
