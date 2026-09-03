---
title: getResolvedNamesForAddress
description: Lists names whose indexed resolved address matches an Ethereum address.
---

# getResolvedNamesForAddress

Lists names whose indexed resolved address matches an Ethereum address.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.indexer.getResolvedNamesForAddress({
  address: "0x0000000000000000000000000000000000000000",
  pageSize: 20,
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="indexer.getResolvedNamesForAddress" />

## Parameters

```ts
import type { GetResolvedNamesForAddressParametersType } from "@ensforge/sdk/indexer";
```

### address

`0x${string}`

Address matched against indexed resolution data.

### filter

<!--@include: @/shared/indexer/name-filter.md-->

### order

<!--@include: @/shared/indexer/name-order.md-->

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetResolvedNamesForAddressResultType } from "@ensforge/sdk/indexer";
```

Each item contains the indexed name, requested address, and `verification: "indexed-unverified"`. Verify forward resolution onchain before authentication.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

This is indexer discovery rather than ENSIP-19 verification. Matching names come from enabled ENSv1 and ENSv2 sources.

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.indexer.getResolvedNamesForAddress.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetResolvedNamesForAddressError } from "@ensforge/sdk/indexer";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getResolvedNamesForAddress`](/core/api/actions/indexer/names/get-resolved-names-for-address)

## Hook

- [`useResolvedNamesForAddress`](/react/api/hooks/indexer/names/use-resolved-names-for-address)
