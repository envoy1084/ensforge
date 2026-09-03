---
title: getRegistrations
description: Lists ENS registrations across protocol versions.
---

# getRegistrations

Lists ENS registrations across protocol versions.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.indexer.getRegistrations({
  filter: { protocols: ["v1", "v2"] },
  order: { field: "expiry", direction: "asc" },
  pageSize: 20,
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="indexer.getRegistrations" />

## Parameters

```ts
import type { GetRegistrationsParametersType } from "@ensforge/sdk/indexer";
```

### filter

<!--@include: @/shared/indexer/registration-filter.md-->

### order

`RegistrationOrder | undefined`

Orders by `registeredAt`, `expiry`, or `name`. Defaults to newest registration first.

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetRegistrationsResultType } from "@ensforge/sdk/indexer";
```

Each registration includes protocol, name identity, registrant, current owner, registration and expiry times, normalized cost, referrer, and source metadata.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

Enabled ENSv1 and ENSv2 sources are queried concurrently. Results are normalized, deduplicated, and merged into one stable page; partial mode records source failures in the result.

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.indexer.getRegistrations.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetRegistrationsError } from "@ensforge/sdk/indexer";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getRegistrations`](/core/api/actions/indexer/registrations/get-registrations)

## Hook

- [`useRegistrations`](/react/api/hooks/indexer/registrations/use-registrations)
