---
title: claimDnsName
description: Claims dns name through DNSSEC names and DNS resolver records.
---

# claimDnsName

Claims dns name through DNSSEC names and DNS resolver records.

This action belongs to DNSSEC names and DNS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { claimDnsName } from "@ensforge/core";
```

## Usage

```ts
import { claimDnsName } from "@ensforge/core";
import { config } from "./config";

const result = await claimDnsName(config, {
  name: "example.eth",
  proof: [],
});
```

## Parameters

```ts
type ClaimDnsNameParameters = Parameters<typeof claimDnsName>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### proof

`ReadonlyArray<DnssecProof>`

DNSSEC proof records supplied to the import.

### resolver

`string | undefined`

Resolver address used by the operation.

### address

`string | undefined`

Address used by this operation.

## Return Type

```ts
type ClaimDnsNameResult = Awaited<ReturnType<typeof claimDnsName>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = claimDnsName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = claimDnsName.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type ClaimDnsNameError = Effect.Effect.Error<ReturnType<typeof claimDnsName.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
