---
title: getResolverCapabilities
description: Gets resolver capabilities for capability and authorization discovery.
---

# getResolverCapabilities

Gets resolver capabilities for capability and authorization discovery.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.capabilities.getResolverCapabilities({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { NameCapabilityParameters } from "@ensforge/sdk";
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
type GetResolverCapabilitiesResult = Awaited<ReturnType<typeof getResolverCapabilities>>;
```

| Property        | Type                                                                                                                                                                                                                                                                          | Description                                            |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `address`       | `&#96;0x${string}&#96; \| null`                                                                                                                                                                                                                                               | Decoded address, or `null` when the record is not set. |
| `node`          | `&#96;0x${string}&#96; & Brand<"Namehash">`                                                                                                                                                                                                                                   | The node value returned by the operation.              |
| `inherited`     | `boolean`                                                                                                                                                                                                                                                                     | The inherited value returned by the operation.         |
| `extended`      | `boolean`                                                                                                                                                                                                                                                                     | The extended value returned by the operation.          |
| `permissioned`  | `boolean`                                                                                                                                                                                                                                                                     | The permissioned value returned by the operation.      |
| `authorization` | `"unknown" \| "none" \| "owner-delegate" \| "role"`                                                                                                                                                                                                                           | The authorization value returned by the operation.     |
| `profiles`      | `{ readonly address: boolean; readonly text: boolean; readonly contentHash: boolean; readonly abi: boolean; readonly pubkey: boolean; readonly interface: boolean; readonly name: boolean; readonly data: boolean; readonly dnsRecord: boolean; readonly dnsZone: boolean; }` | The profiles value returned by the operation.          |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.capabilities.getResolverCapabilities.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = sdk.capabilities.getResolverCapabilities.request(parameters);
```

## Error

```ts
import type { GetResolverCapabilitiesError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`getResolverCapabilities`](/core/api/actions/capabilities/get-resolver-capabilities)
