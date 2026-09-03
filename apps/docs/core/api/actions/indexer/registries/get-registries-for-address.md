---
title: getRegistriesForAddress
description: Lists ENSv2 registries owned by an address.
---

# getRegistriesForAddress

Lists ENSv2 registries owned by an address.

## Import

```ts
import { getRegistriesForAddress } from "@ensforge/core/indexer";
```

## Usage

::: code-group

```ts [index.ts]
import { getRegistriesForAddress } from "@ensforge/core/indexer";
import { config } from "./config";

const result = await getRegistriesForAddress(config, {
  address: "0x0000000000000000000000000000000000000000",
  pageSize: 20,
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="indexer.getRegistriesForAddress" />

## Parameters

```ts
import type { GetRegistriesForAddressParametersType } from "@ensforge/core/indexer";
```

### address

`0x${string}`

Registry owner address to match.

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetRegistriesForAddressResultType } from "@ensforge/core/indexer";
```

When supported, `value` is a page of registries with managed names, ownership, parent, creation metadata, and aggregate counts.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

<!--@include: @/shared/indexer/v2-result.md-->

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getRegistriesForAddress.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetRegistriesForAddressError } from "@ensforge/core/indexer";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.indexer.getRegistriesForAddress`](/sdk/api/indexer/registries/get-registries-for-address)
- [`useRegistriesForAddress`](/react/api/hooks/indexer/registries/use-registries-for-address)
