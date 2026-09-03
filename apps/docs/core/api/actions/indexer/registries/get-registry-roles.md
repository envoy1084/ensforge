---
title: getRegistryRoles
description: Lists ENSv2 registry role assignments.
---

# getRegistryRoles

Lists ENSv2 registry role assignments.

## Import

```ts
import { getRegistryRoles } from "@ensforge/core/indexer";
```

## Usage

::: code-group

```ts [index.ts]
import { getRegistryRoles } from "@ensforge/core/indexer";
import { config } from "./config";

const result = await getRegistryRoles(config, {
  registry: "0x0000000000000000000000000000000000000000",
  filter: { active: true },
  pageSize: 20,
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="indexer.getRegistryRoles" />

## Parameters

```ts
import type { GetRegistryRolesParametersType } from "@ensforge/core/indexer";
```

### registry

`0x${string}`

Registry contract whose assignments should be queried.

### filter

<!--@include: @/shared/indexer/v2-role-filter.md-->

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetRegistryRolesResultType } from "@ensforge/core/indexer";
```

When supported, each item contains the account, resource, optional name, role bitmap, decoded permissions, state, and chain position.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

<!--@include: @/shared/indexer/v2-result.md-->

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getRegistryRoles.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetRegistryRolesError } from "@ensforge/core/indexer";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.indexer.getRegistryRoles`](/sdk/api/indexer/registries/get-registry-roles)
- [`useIndexedRegistryRoles`](/react/api/hooks/indexer/registries/use-indexed-registry-roles)
