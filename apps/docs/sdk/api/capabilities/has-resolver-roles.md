---
title: hasResolverRoles
description: Checks whether resolver roles for capability and authorization discovery.
---

# hasResolverRoles

Checks whether resolver roles for capability and authorization discovery.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.capabilities.hasResolverRoles({
  name: "example.eth",
  account: {},
  roles: 1n,
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { HasResolverRolesParameters } from "@ensforge/sdk";
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

Role bitmask to inspect, grant, or revoke.

### record

`ResolverRecord | undefined`

Value used for `record` by this method.

## Return Type

```ts
type HasResolverRolesResult = Awaited<ReturnType<typeof hasResolverRoles>>;
```

| Property     | Type                                                                        | Description                                            |
| ------------ | --------------------------------------------------------------------------- | ------------------------------------------------------ |
| `supported`  | `false \| true`                                                             | Whether the selected protocol supports this operation. |
| `protocol`   | `"v1" \| "v2" \| "v2"`                                                      | ENS protocol route used for the result.                |
| `reason`     | `"RESOLVER_NOT_FOUND" \| "ROLE_BASED_PERMISSIONS_UNSUPPORTED" \| undefined` | The reason value returned by the operation.            |
| `resolver`   | `&#96;0x${string}&#96; \| undefined`                                        | The resolver value returned by the operation.          |
| `resource`   | `bigint \| undefined`                                                       | The resource value returned by the operation.          |
| `account`    | `&#96;0x${string}&#96; \| undefined`                                        | The account value returned by the operation.           |
| `roles`      | `bigint \| undefined`                                                       | The roles value returned by the operation.             |
| `authorized` | `boolean \| undefined`                                                      | The authorized value returned by the operation.        |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.capabilities.hasResolverRoles.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = sdk.capabilities.hasResolverRoles.request(parameters);
```

## Error

```ts
import type { HasResolverRolesError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`hasResolverRoles`](/core/api/actions/capabilities/has-resolver-roles)
