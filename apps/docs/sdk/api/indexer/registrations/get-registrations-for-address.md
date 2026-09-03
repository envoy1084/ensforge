---
title: getRegistrationsForAddress
description: Lists ENS registrations associated with a registrant address.
---

# getRegistrationsForAddress

Lists ENS registrations associated with a registrant address.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.indexer.getRegistrationsForAddress({
  address: "0x0000000000000000000000000000000000000000",
  filter: { protocols: ["v1", "v2"] },
  pageSize: 20,
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetRegistrationsForAddressParameters } from "@ensforge/sdk/indexer";
```

### address

`0x${string}`

Registrant address to match.

### filter

`{ protocols?, expiryAfter?, expiryBefore? } | undefined`

Narrows matches by protocol or expiry bounds.

### order

`RegistrationOrder | undefined`

Orders by registration time, expiry, or name.

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetRegistrationsForAddressResult } from "@ensforge/sdk/indexer";
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

const program = sdk.indexer.getRegistrationsForAddress.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetRegistrationsForAddressError } from "@ensforge/sdk/indexer";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getRegistrationsForAddress`](/core/api/actions/indexer/registrations/get-registrations-for-address)

## Hook

- [`useRegistrationsForAddress`](/react/api/hooks/indexer/registrations/use-registrations-for-address)
