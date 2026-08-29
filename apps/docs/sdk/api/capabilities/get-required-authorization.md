---
title: getRequiredAuthorization
description: Gets required authorization for capability and authorization discovery.
---

# getRequiredAuthorization

Gets required authorization for capability and authorization discovery.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { ens } from "./client";

const result = await ens.capabilities.getRequiredAuthorization({
  name: "example.eth",
  account: {},
  operation: {},
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetRequiredAuthorizationParameters } from "@ensforge/sdk";
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

### operation

`WriteOperation`

Value used for `operation` by this method.

## Return Type

```ts
type GetRequiredAuthorizationResult = Awaited<ReturnType<typeof getRequiredAuthorization>>;
```

| Property        | Type                                                                                                                                                                                                                                                                                        | Description                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `account`       | `&#96;0x${string}&#96;`                                                                                                                                                                                                                                                                     | The account value returned by the operation.       |
| `operation`     | `{ readonly type: "address"; readonly coinType: bigint; } \| { readonly type: "text"; readonly key: string; } \| { readonly type: "contentHash"; } \| { readonly type: "pubkey"; } \| { readonly type: "abi"; readonly contentType?: bigint \| undefined; } \| ... 12 more ... \| { ...; }` | The operation value returned by the operation.     |
| `target`        | `{ readonly available: false; readonly protocol: "v1" \| "v2"; readonly reason: "NAME_NOT_REGISTERED" \| "RESOLVER_NOT_FOUND" \| "OPERATION_UNSUPPORTED"; } \| { readonly available: true; ... 7 more ...; readonly inheritedResolver: boolean; }`                                          | The target value returned by the operation.        |
| `authorization` | `{ readonly status: "authorized"; readonly source: "owner" \| "operator-approval" \| "token-approval" \| "resolver-delegate" \| "registry-role" \| "resolver-role" \| "wrapper-permission"; } \| { ...; } \| { ...; }`                                                                      | The authorization value returned by the operation. |
| `blockers`      | `readonly ("NAME_NOT_REGISTERED" \| "RESOLVER_NOT_FOUND" \| "OPERATION_UNSUPPORTED" \| "WRAPPER_FUSE" \| "TRANSFER_ROLE")[]`                                                                                                                                                                | The blockers value returned by the operation.      |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { ens } from "./client";

const program = ens.capabilities.getRequiredAuthorization.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = ens.capabilities.getRequiredAuthorization.request(parameters);
```

## Error

```ts
import type { GetRequiredAuthorizationError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`getRequiredAuthorization`](/core/api/actions/capabilities/get-required-authorization)
