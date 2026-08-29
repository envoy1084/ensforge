---
title: getResolverDelegateApproval
description: Gets resolver delegate approval for ENS permissions and contract capabilities.
---

# getResolverDelegateApproval

Gets resolver delegate approval for ENS permissions and contract capabilities.

This action belongs to ENS permissions and contract capabilities. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getResolverDelegateApproval } from "@ensforge/core";
```

## Usage

```ts
import { getResolverDelegateApproval } from "@ensforge/core";
import { config } from "./config";

const result = await getResolverDelegateApproval(config, {
  name: "example.eth",
  owner: "0x0000000000000000000000000000000000000001",
  delegate: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type GetResolverDelegateApprovalParameters = Parameters<typeof getResolverDelegateApproval>[1];
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

### owner

`EthereumAddress`

Address that should own the resulting name or resource.

### delegate

`EthereumAddress`

Delegate address whose resolver permissions are read or changed.

## Return Type

```ts
type GetResolverDelegateApprovalResult = Awaited<ReturnType<typeof getResolverDelegateApproval>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getResolverDelegateApproval.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getResolverDelegateApproval.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetResolverDelegateApprovalError = Effect.Effect.Error<
  ReturnType<typeof getResolverDelegateApproval.effect>
>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
