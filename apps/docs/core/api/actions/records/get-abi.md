---
title: getAbi
description: Gets abi for ENS resolver records.
---

# getAbi

Gets abi for ENS resolver records.

## Import

```ts
import { getAbi } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getAbi } from "@ensforge/core";
import { config } from "./config";

const result = await getAbi(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetAbiParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### contentTypes

`ReadonlyArray<AbiContentType> | undefined`

ABI content types attempted in priority order.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetAbiResult = Awaited<ReturnType<typeof getAbi>>;
```

| Property      | Type                                                     | Description                                               |
| ------------- | -------------------------------------------------------- | --------------------------------------------------------- |
| `contentType` | `"json" \| "zlib-json" \| "cbor" \| "uri" \| null`       | The contentType value returned by the operation.          |
| `value`       | `Abi \| string \| null`                                  | Decoded value returned by the contract or resolver.       |
| `raw`         | `&#96;0x${string}&#96; & Brand<"AbiRecordData"> \| null` | Raw resolver bytes, or `null` when the record is not set. |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getAbi.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getAbi.request(parameters);
```

## Error

```ts
import type { GetAbiError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.records.getAbi`](/sdk/api/records/get-abi)
