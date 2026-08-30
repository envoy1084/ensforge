---
title: getZoneHash
description: Gets zone hash for DNSSEC names and DNS resolver records.
---

# getZoneHash

Gets zone hash for DNSSEC names and DNS resolver records.

## Import

```ts
import { getZoneHash } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getZoneHash } from "@ensforge/core";
import { config } from "./config";

const result = await getZoneHash(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetZoneHashParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetZoneHashResult = Awaited<ReturnType<typeof getZoneHash>>;
```

| Property   | Type                               | Description                                         |
| ---------- | ---------------------------------- | --------------------------------------------------- |
| `name`     | `string & Brand<"NormalizedName">` | Normalized ENS name.                                |
| `resolver` | `&#96;0x${string}&#96; \| null`    | The resolver value returned by the operation.       |
| `value`    | `&#96;0x${string}&#96; \| null`    | Decoded value returned by the contract or resolver. |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getZoneHash.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getZoneHash.request(parameters);
```

## Error

```ts
import type { GetZoneHashError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.dns.getZoneHash`](/sdk/api/dns/get-zone-hash)
