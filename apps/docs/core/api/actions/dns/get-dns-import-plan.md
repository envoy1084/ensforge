---
title: getDnsImportPlan
description: Builds the DNSSEC proof and write plan required to import a DNS name.
---

# getDnsImportPlan

Builds the DNSSEC proof and write plan required to import a DNS name.

This action belongs to DNSSEC names and DNS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getDnsImportPlan } from "@ensforge/core";
```

## Usage

```ts
import { getDnsImportPlan } from "@ensforge/core";
import { config } from "./config";

const result = await getDnsImportPlan(config, {
  name: "example.eth",
});
```

## Parameters

```ts
type GetDnsImportPlanParameters = Parameters<typeof getDnsImportPlan>[1];
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
type GetDnsImportPlanResult = Awaited<ReturnType<typeof getDnsImportPlan>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getDnsImportPlan.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getDnsImportPlan.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetDnsImportPlanError = Effect.Effect.Error<ReturnType<typeof getDnsImportPlan.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
