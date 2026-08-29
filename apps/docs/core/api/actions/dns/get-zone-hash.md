---
title: getZoneHash
description: Gets zone hash for DNSSEC names and DNS resolver records.
---

# getZoneHash

Gets zone hash for DNSSEC names and DNS resolver records.

This action belongs to DNSSEC names and DNS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getZoneHash } from "@ensforge/core";
```

## Usage

```ts
import { getZoneHash } from "@ensforge/core";
import { config } from "./config";

const result = await getZoneHash(config, {
  name: "example.eth",
});
```

## Parameters

```ts
type GetZoneHashParameters = Parameters<typeof getZoneHash>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetZoneHashResult = Awaited<ReturnType<typeof getZoneHash>>;
```

`{ readonly name: string & Brand<"NormalizedName">; readonly resolver: `0x${string}` | null; readonly value: `0x${string}` | null; }`

## Effect

```ts
const effect = getZoneHash.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getZoneHash.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetZoneHashError = Effect.Effect.Error<ReturnType<typeof getZoneHash.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
