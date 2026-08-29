---
title: setDnsRecords
description: Sets dns records for DNSSEC names and DNS resolver records.
---

# setDnsRecords

Sets dns records for DNSSEC names and DNS resolver records.

This action belongs to DNSSEC names and DNS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setDnsRecords } from "@ensforge/core";
```

## Usage

```ts
import { setDnsRecords } from "@ensforge/core";
import { config } from "./config";

const result = await setDnsRecords(config, {
  name: "example.eth",
  data: "0x",
});
```

## Parameters

```ts
type SetDnsRecordsParameters = Parameters<typeof setDnsRecords>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### data

`Hex`

Raw calldata or resolver bytes.

## Return Type

```ts
type SetDnsRecordsResult = Awaited<ReturnType<typeof setDnsRecords>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setDnsRecords.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setDnsRecords.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetDnsRecordsError = Effect.Effect.Error<ReturnType<typeof setDnsRecords.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
