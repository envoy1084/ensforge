---
title: getResolverApprovals
description: Lists indexed ENSv2 resolver delegate approvals.
---

# getResolverApprovals

Lists indexed ENSv2 resolver delegate approvals.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.indexer.getResolverApprovals({
  filter: {
    resolver: "0x0000000000000000000000000000000000000000",
    approved: true,
  },
  pageSize: 20,
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="indexer.getResolverApprovals" />

## Parameters

```ts
import type { GetResolverApprovalsParametersType } from "@ensforge/sdk/indexer";
```

### filter

<!--@include: @/shared/indexer/v2-approval-filter.md-->

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetResolverApprovalsResultType } from "@ensforge/sdk/indexer";
```

When supported, each item contains resolver, namehash, context, delegate, approval state, chain position, and source.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

<!--@include: @/shared/indexer/v2-result.md-->

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.indexer.getResolverApprovals.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetResolverApprovalsError } from "@ensforge/sdk/indexer";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getResolverApprovals`](/core/api/actions/indexer/resolvers/get-resolver-approvals)

## Hook

- [`useResolverApprovals`](/react/api/hooks/indexer/resolvers/use-resolver-approvals)
