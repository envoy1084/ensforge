---
title: getNameCapabilities
description: Gets name capabilities for ENS permissions and contract capabilities.
---

# getNameCapabilities

Gets name capabilities for ENS permissions and contract capabilities.

## Import

```ts
import { getNameCapabilities } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getNameCapabilities } from "@ensforge/core";
import { config } from "./config";

const result = await getNameCapabilities(config, {
  name: "example.eth",
  account: {},
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetNameCapabilitiesParameters } from "@ensforge/core";
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

### account

`EthereumAddress`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

### records

`ReadonlyArray<RecordOperation> | undefined`

Records selected, read, or written by the operation.

## Return Type

```ts
type GetNameCapabilitiesResult = Awaited<ReturnType<typeof getNameCapabilities>>;
```

| Property    | Type                                                                                                                                                                                                                                                                                                                                      | Description                                    |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `name`      | `string & Brand<"NormalizedName">`                                                                                                                                                                                                                                                                                                        | Normalized ENS name.                           |
| `account`   | `&#96;0x${string}&#96;`                                                                                                                                                                                                                                                                                                                   | The account value returned by the operation.   |
| `registry`  | `{ readonly address: &#96;0x${string}&#96;; readonly protocol: "v1" \| "v2"; readonly kind: "registry" \| "name-wrapper" \| "permissioned-registry" \| "wrapper-registry"; readonly owned: boolean; ... 8 more ...; readonly setExpiry: boolean; }`                                                                                       | The registry value returned by the operation.  |
| `resolver`  | `{ readonly address: &#96;0x${string}&#96; \| null; readonly node: &#96;0x${string}&#96; & Brand<"Namehash">; readonly inherited: boolean; readonly extended: boolean; readonly permissioned: boolean; readonly authorization: "unknown" \| ... 2 more ... \| "role"; readonly profiles: { ...; }; }`                                     | The resolver value returned by the operation.  |
| `records`   | `readonly { readonly record: { readonly type: "address"; readonly coinType: bigint; } \| { readonly type: "text"; readonly key: string; } \| { readonly type: "contentHash"; } \| { readonly type: "pubkey"; } \| { readonly type: "abi"; readonly contentType?: bigint \| undefined; } \| ... 6 more ... \| { ...; }; readonly suppo...` | The records value returned by the operation.   |
| `ownership` | `{ readonly setOwner: boolean; readonly setResolver: boolean; readonly createSubname: boolean; readonly transfer: boolean; readonly setExpiry: boolean; }`                                                                                                                                                                                | The ownership value returned by the operation. |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getNameCapabilities.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getNameCapabilities.request(parameters);
```

## Error

```ts
import type { GetNameCapabilitiesError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.capabilities.getNameCapabilities`](/sdk/api/capabilities/get-name-capabilities)
