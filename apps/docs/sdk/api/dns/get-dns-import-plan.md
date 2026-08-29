---
title: getDnsImportPlan
description: Gets dns import plan for DNS and DNSSEC.
---

# getDnsImportPlan

Gets dns import plan for DNS and DNSSEC.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.dns.getDnsImportPlan({
  name: "example.eth",
});
```

## Parameters

```ts
type GetDnsImportPlanParameters = Parameters<typeof sdk.dns.getDnsImportPlan>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetDnsImportPlanResult = Awaited<ReturnType<typeof sdk.dns.getDnsImportPlan>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.dns.getDnsImportPlan.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.dns.getDnsImportPlan.request(parameters);
```

## Action

- [`getDnsImportPlan`](/core/api/actions/dns/get-dns-import-plan)
