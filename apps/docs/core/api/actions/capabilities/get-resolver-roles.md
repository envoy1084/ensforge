---
title: getResolverRoles
description: Gets resolver roles for ENS permissions and contract capabilities.
---

# getResolverRoles

Gets resolver roles for ENS permissions and contract capabilities.

## Import

```ts
import { getResolverRoles } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getResolverRoles } from "@ensforge/core";
import { config } from "./config";

const result = await getResolverRoles(config, {
  name: "example.eth",
  account: {},
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetResolverRolesParameters } from "@ensforge/core";
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

### record

`ResolverRecord | undefined`

Resolver record used by this operation.

## Return Type

```ts
type GetResolverRolesResult = Awaited<ReturnType<typeof getResolverRoles>>;
```

| Property    | Type                                                                        | Description                                            |
| ----------- | --------------------------------------------------------------------------- | ------------------------------------------------------ |
| `supported` | `false \| true`                                                             | Whether the selected protocol supports this operation. |
| `protocol`  | `"v1" \| "v2" \| "v2"`                                                      | ENS protocol route used for the result.                |
| `reason`    | `"RESOLVER_NOT_FOUND" \| "ROLE_BASED_PERMISSIONS_UNSUPPORTED" \| undefined` | The reason value returned by the operation.            |
| `resolver`  | `&#96;0x${string}&#96; \| undefined`                                        | The resolver value returned by the operation.          |
| `resource`  | `bigint \| undefined`                                                       | The resource value returned by the operation.          |
| `account`   | `&#96;0x${string}&#96; \| undefined`                                        | The account value returned by the operation.           |
| `roles`     | `bigint \| undefined`                                                       | The roles value returned by the operation.             |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getResolverRoles.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getResolverRoles.request(parameters);
```

## Error

```ts
import type { GetResolverRolesError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.capabilities.getResolverRoles`](/sdk/api/capabilities/get-resolver-roles)
