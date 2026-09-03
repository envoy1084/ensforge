---
title: getResolverApprovals
description: Lists indexed ENSv2 resolver delegate approvals.
---

# getResolverApprovals

Lists indexed ENSv2 resolver delegate approvals.

## Import

```ts
import { getResolverApprovals } from "@ensforge/core/indexer";
```

## Usage

::: code-group

```ts [index.ts]
import { getResolverApprovals } from "@ensforge/core/indexer";
import { config } from "./config";

const result = await getResolverApprovals(config, {
  filter: {
    resolver: "0x0000000000000000000000000000000000000000",
    approved: true,
  },
  pageSize: 20,
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="indexer.getResolverApprovals" />

## Parameters

```ts
import type { GetResolverApprovalsParametersType } from "@ensforge/core/indexer";
```

### filter

<!--@include: @/shared/indexer/v2-approval-filter.md-->

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetResolverApprovalsResultType } from "@ensforge/core/indexer";
```

When supported, each item contains resolver, namehash, context, delegate, approval state, chain position, and source.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

<!--@include: @/shared/indexer/v2-result.md-->

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getResolverApprovals.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetResolverApprovalsError } from "@ensforge/core/indexer";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.indexer.getResolverApprovals`](/sdk/api/indexer/resolvers/get-resolver-approvals)
- [`useResolverApprovals`](/react/api/hooks/indexer/resolvers/use-resolver-approvals)
