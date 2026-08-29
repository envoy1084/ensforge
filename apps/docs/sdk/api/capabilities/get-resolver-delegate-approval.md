---
title: getResolverDelegateApproval
description: Gets resolver delegate approval for capability and authorization discovery.
---

# getResolverDelegateApproval

Gets resolver delegate approval for capability and authorization discovery.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.capabilities.getResolverDelegateApproval({
  name: "example.eth",
  owner: "0x0000000000000000000000000000000000000001",
  delegate: "0x0000000000000000000000000000000000000001",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetResolverDelegateApprovalParameters } from "@ensforge/sdk";
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

### owner

`EthereumAddress`

Address that should own the resulting name or resource.

### delegate

`EthereumAddress`

Resolver delegate whose approval or roles are read or changed.

## Return Type

```ts
type GetResolverDelegateApprovalResult = Awaited<ReturnType<typeof getResolverDelegateApproval>>;
```

| Property    | Type                                                                   | Description                                                  |
| ----------- | ---------------------------------------------------------------------- | ------------------------------------------------------------ |
| `supported` | `false \| true`                                                        | Whether the selected protocol supports this operation.       |
| `protocol`  | `"v1" \| "v2"`                                                         | ENS protocol route used for the result.                      |
| `reason`    | `"RESOLVER_NOT_FOUND" \| "DELEGATE_APPROVAL_UNSUPPORTED" \| undefined` | The reason value returned by the operation.                  |
| `resolver`  | `&#96;0x${string}&#96; \| undefined`                                   | The resolver value returned by the operation.                |
| `owner`     | `&#96;0x${string}&#96; \| undefined`                                   | Current owner address, or `null` when the name has no owner. |
| `delegate`  | `&#96;0x${string}&#96; \| undefined`                                   | The delegate value returned by the operation.                |
| `approved`  | `boolean \| undefined`                                                 | The approved value returned by the operation.                |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.capabilities.getResolverDelegateApproval.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = sdk.capabilities.getResolverDelegateApproval.request(parameters);
```

## Error

```ts
import type { GetResolverDelegateApprovalError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`getResolverDelegateApproval`](/core/api/actions/capabilities/get-resolver-delegate-approval)
