---
title: hasRegistryRoles
description: Checks whether registry roles for ENS permissions and contract capabilities.
---

# hasRegistryRoles

Checks whether registry roles for ENS permissions and contract capabilities.

## Import

```ts
import { hasRegistryRoles } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { hasRegistryRoles } from "@ensforge/core";
import { config } from "./config";

const result = await hasRegistryRoles(config, {
  name: "example.eth",
  account: {},
  roles: 1n,
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { HasRegistryRolesParameters } from "@ensforge/core";
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

### roles

`bigint`

Role bitmask to read, grant, or revoke.

## Return Type

```ts
type HasRegistryRolesResult = Awaited<ReturnType<typeof hasRegistryRoles>>;
```

| Property     | Type                                                                        | Description                                            |
| ------------ | --------------------------------------------------------------------------- | ------------------------------------------------------ |
| `supported`  | `false \| true`                                                             | Whether the selected protocol supports this operation. |
| `protocol`   | `"v1" \| "v2" \| "v2"`                                                      | ENS protocol route used for the result.                |
| `reason`     | `"RESOLVER_NOT_FOUND" \| "ROLE_BASED_PERMISSIONS_UNSUPPORTED" \| undefined` | The reason value returned by the operation.            |
| `registry`   | `&#96;0x${string}&#96; \| undefined`                                        | The registry value returned by the operation.          |
| `resource`   | `bigint \| undefined`                                                       | The resource value returned by the operation.          |
| `account`    | `&#96;0x${string}&#96; \| undefined`                                        | The account value returned by the operation.           |
| `roles`      | `bigint \| undefined`                                                       | The roles value returned by the operation.             |
| `authorized` | `boolean \| undefined`                                                      | The authorized value returned by the operation.        |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = hasRegistryRoles.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = hasRegistryRoles.request(parameters);
```

## Error

```ts
import type { HasRegistryRolesError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.capabilities.hasRegistryRoles`](/sdk/api/capabilities/has-registry-roles)
