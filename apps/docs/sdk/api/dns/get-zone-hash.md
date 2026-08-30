---
title: getZoneHash
description: Gets zone hash for DNS and DNSSEC.
---

# getZoneHash

Gets zone hash for DNS and DNSSEC.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.dns.getZoneHash({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetZoneHashParameters } from "@ensforge/sdk";
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

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.dns.getZoneHash.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.dns.getZoneHash.request(parameters);
```

## Error

```ts
import type { GetZoneHashError } from "@ensforge/sdk";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getZoneHash`](/core/api/actions/dns/get-zone-hash)
