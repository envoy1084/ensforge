---
title: getRegistrationsForAddress
description: Lists ENS registrations associated with a registrant address.
---

# getRegistrationsForAddress

Lists ENS registrations associated with a registrant address.

## Import

```ts
import { getRegistrationsForAddress } from "@ensforge/core/indexer";
```

## Usage

::: code-group

```ts [index.ts]
import { getRegistrationsForAddress } from "@ensforge/core/indexer";
import { config } from "./config";

const result = await getRegistrationsForAddress(config, {
  address: "0x0000000000000000000000000000000000000000",
  filter: { protocols: ["v1", "v2"] },
  pageSize: 20,
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="indexer.getRegistrationsForAddress" />

## Parameters

```ts
import type { GetRegistrationsForAddressParameters } from "@ensforge/core/indexer";
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
import type { GetRegistrationsForAddressResult } from "@ensforge/core/indexer";
```

Each registration includes protocol, name identity, registrant, current owner, registration and expiry times, normalized cost, referrer, and source metadata.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

Enabled ENSv1 and ENSv2 sources are queried concurrently. Results are normalized, deduplicated, and merged into one stable page; partial mode records source failures in the result.

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getRegistrationsForAddress.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetRegistrationsForAddressError } from "@ensforge/core/indexer";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.indexer.getRegistrationsForAddress`](/sdk/api/indexer/registrations/get-registrations-for-address)
- [`useRegistrationsForAddress`](/react/api/hooks/indexer/registrations/use-registrations-for-address)
