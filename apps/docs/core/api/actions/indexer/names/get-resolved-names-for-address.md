---
title: getResolvedNamesForAddress
description: Lists names whose indexed resolved address matches an Ethereum address.
---

# getResolvedNamesForAddress

Lists names whose indexed resolved address matches an Ethereum address.

## Import

```ts
import { getResolvedNamesForAddress } from "@ensforge/core/indexer";
```

## Usage

::: code-group

```ts [index.ts]
import { getResolvedNamesForAddress } from "@ensforge/core/indexer";
import { config } from "./config";

const result = await getResolvedNamesForAddress(config, {
  address: "0x0000000000000000000000000000000000000000",
  pageSize: 20,
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="indexer.getResolvedNamesForAddress" />

## Parameters

```ts
import type { GetResolvedNamesForAddressParametersType } from "@ensforge/core/indexer";
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
import type { GetResolvedNamesForAddressResultType } from "@ensforge/core/indexer";
```

Each item contains the indexed name, requested address, and `verification: "indexed-unverified"`. Verify forward resolution onchain before authentication.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

This is indexer discovery rather than ENSIP-19 verification. Matching names come from enabled ENSv1 and ENSv2 sources.

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getResolvedNamesForAddress.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetResolvedNamesForAddressError } from "@ensforge/core/indexer";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.indexer.getResolvedNamesForAddress`](/sdk/api/indexer/names/get-resolved-names-for-address)
- [`useResolvedNamesForAddress`](/react/api/hooks/indexer/names/use-resolved-names-for-address)
