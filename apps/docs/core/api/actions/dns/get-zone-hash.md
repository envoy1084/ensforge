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

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getZoneHash.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getZoneHash.request(parameters);
```

## Error

```ts
import type { GetZoneHashError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.dns.getZoneHash`](/sdk/api/dns/get-zone-hash)
