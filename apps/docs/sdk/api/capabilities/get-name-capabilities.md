---
title: getNameCapabilities
description: Gets name capabilities for capability and authorization discovery.
---

# getNameCapabilities

Gets name capabilities for capability and authorization discovery.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.capabilities.getNameCapabilities({
  name: "example.eth",
  account: {},
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetNameCapabilitiesParameters } from "@ensforge/sdk";
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

Records selected, read, or written.

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

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.capabilities.getNameCapabilities.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.capabilities.getNameCapabilities.request(parameters);
```

## Error

```ts
import type { GetNameCapabilitiesError } from "@ensforge/sdk";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getNameCapabilities`](/core/api/actions/capabilities/get-name-capabilities)
