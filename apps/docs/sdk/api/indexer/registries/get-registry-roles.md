---
title: getRegistryRoles
description: Lists ENSv2 registry role assignments.
---

# getRegistryRoles

Lists ENSv2 registry role assignments.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.indexer.getRegistryRoles({
  registry: "0x0000000000000000000000000000000000000000",
  filter: { active: true },
  pageSize: 20,
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="indexer.getRegistryRoles" />

## Parameters

```ts
import type { GetRegistryRolesParametersType } from "@ensforge/sdk/indexer";
```

### registry

`0x${string}`

Registry contract whose assignments should be queried.

### filter

<!--@include: @/shared/indexer/v2-role-filter.md-->

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetRegistryRolesResultType } from "@ensforge/sdk/indexer";
```

When supported, each item contains the account, resource, optional name, role bitmap, decoded permissions, state, and chain position.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

<!--@include: @/shared/indexer/v2-result.md-->

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.indexer.getRegistryRoles.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetRegistryRolesError } from "@ensforge/sdk/indexer";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getRegistryRoles`](/core/api/actions/indexer/registries/get-registry-roles)

## Hook

- [`useIndexedRegistryRoles`](/react/api/hooks/indexer/registries/use-indexed-registry-roles)
