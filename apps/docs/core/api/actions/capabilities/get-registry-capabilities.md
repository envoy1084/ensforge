---
title: getRegistryCapabilities
description: Gets registry capabilities for ENS permissions and contract capabilities.
---

# getRegistryCapabilities

Gets registry capabilities for ENS permissions and contract capabilities.

## Import

```ts
import { getRegistryCapabilities } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getRegistryCapabilities } from "@ensforge/core";
import { config } from "./config";

const result = await getRegistryCapabilities(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="capabilities.getRegistryCapabilities" />

## Parameters

```ts
import type { NameCapabilityParameters } from "@ensforge/core";
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
type GetRegistryCapabilitiesResult = Awaited<ReturnType<typeof getRegistryCapabilities>>;
```

| Property        | Type                                                                            | Description                                            |
| --------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `address`       | `&#96;0x${string}&#96;`                                                         | Decoded address, or `null` when the record is not set. |
| `protocol`      | `"v1" \| "v2"`                                                                  | ENS protocol route used for the result.                |
| `kind`          | `"registry" \| "name-wrapper" \| "permissioned-registry" \| "wrapper-registry"` | The kind value returned by the operation.              |
| `owned`         | `boolean`                                                                       | The owned value returned by the operation.             |
| `permissioned`  | `boolean`                                                                       | The permissioned value returned by the operation.      |
| `temporal`      | `boolean`                                                                       | The temporal value returned by the operation.          |
| `tokenized`     | `boolean`                                                                       | The tokenized value returned by the operation.         |
| `wrapped`       | `boolean`                                                                       | Whether the name is held by the ENS Name Wrapper.      |
| `setOwner`      | `boolean`                                                                       | The setOwner value returned by the operation.          |
| `setResolver`   | `boolean`                                                                       | The setResolver value returned by the operation.       |
| `createSubname` | `boolean`                                                                       | The createSubname value returned by the operation.     |
| `transfer`      | `boolean`                                                                       | The transfer value returned by the operation.          |
| `setExpiry`     | `boolean`                                                                       | The setExpiry value returned by the operation.         |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getRegistryCapabilities.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getRegistryCapabilities.request(parameters);
```

## Error

```ts
import type { GetRegistryCapabilitiesError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.capabilities.getRegistryCapabilities`](/sdk/api/capabilities/get-registry-capabilities)
