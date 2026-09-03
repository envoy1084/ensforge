---
title: getRegistrations
description: Lists ENS registrations across protocol versions.
---

# getRegistrations

Lists ENS registrations across protocol versions.

## Import

```ts
import { getRegistrations } from "@ensforge/core/indexer";
```

## Usage

::: code-group

```ts [index.ts]
import { getRegistrations } from "@ensforge/core/indexer";
import { config } from "./config";

const result = await getRegistrations(config, {
  filter: { protocols: ["v1", "v2"] },
  order: { field: "expiry", direction: "asc" },
  pageSize: 20,
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="indexer.getRegistrations" />

## Parameters

```ts
import type { GetRegistrationsParametersType } from "@ensforge/core/indexer";
```

### filter

<!--@include: @/shared/indexer/registration-filter.md-->

### order

`RegistrationOrder | undefined`

Orders by `registeredAt`, `expiry`, or `name`. Defaults to newest registration first.

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetRegistrationsResultType } from "@ensforge/core/indexer";
```

Each registration includes protocol, name identity, registrant, current owner, registration and expiry times, normalized cost, referrer, and source metadata.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

Enabled ENSv1 and ENSv2 sources are queried concurrently. Results are normalized, deduplicated, and merged into one stable page; partial mode records source failures in the result.

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getRegistrations.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetRegistrationsError } from "@ensforge/core/indexer";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.indexer.getRegistrations`](/sdk/api/indexer/registrations/get-registrations)
- [`useRegistrations`](/react/api/hooks/indexer/registrations/use-registrations)
