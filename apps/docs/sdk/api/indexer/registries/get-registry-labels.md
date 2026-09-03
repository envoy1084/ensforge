---
title: getRegistryLabels
description: Lists ENSv2 names managed by or referring to a registry.
---

# getRegistryLabels

Lists ENSv2 names managed by or referring to a registry.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.indexer.getRegistryLabels({
  address: "0x0000000000000000000000000000000000000000",
  relationship: "label",
  pageSize: 20,
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="indexer.getRegistryLabels" />

## Parameters

```ts
import type { GetRegistryLabelsParametersType } from "@ensforge/sdk/indexer";
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
import type { GetRegistryLabelsResultType } from "@ensforge/sdk/indexer";
```

When supported, each item contains its relationship and normalized ENSv2 name.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

<!--@include: @/shared/indexer/v2-result.md-->

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.indexer.getRegistryLabels.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetRegistryLabelsError } from "@ensforge/sdk/indexer";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getRegistryLabels`](/core/api/actions/indexer/registries/get-registry-labels)

## Hook

- [`useRegistryLabels`](/react/api/hooks/indexer/registries/use-registry-labels)
