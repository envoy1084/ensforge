---
title: getRegistryLabels
description: Lists ENSv2 names managed by or referring to a registry.
---

# getRegistryLabels

Lists ENSv2 names managed by or referring to a registry.

## Import

```ts
import { getRegistryLabels } from "@ensforge/core/indexer";
```

## Usage

::: code-group

```ts [index.ts]
import { getRegistryLabels } from "@ensforge/core/indexer";
import { config } from "./config";

const result = await getRegistryLabels(config, {
  address: "0x0000000000000000000000000000000000000000",
  relationship: "label",
  pageSize: 20,
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetRegistryLabelsParametersType } from "@ensforge/core/indexer";
```

### address

`0x${string}`

Registry contract address.

### relationship

`"label" | "referenced-by" | undefined`

Selects directly managed labels, names referring to the registry, or both when omitted.

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetRegistryLabelsResultType } from "@ensforge/core/indexer";
```

When supported, each item contains its relationship and normalized ENSv2 name.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

<!--@include: @/shared/indexer/v2-result.md-->

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getRegistryLabels.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetRegistryLabelsError } from "@ensforge/core/indexer";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.indexer.getRegistryLabels`](/sdk/api/indexer/registries/get-registry-labels)
- [`useRegistryLabels`](/react/api/hooks/indexer/registries/use-registry-labels)
