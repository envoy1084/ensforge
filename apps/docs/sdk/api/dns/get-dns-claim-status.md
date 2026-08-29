---
title: getDnsClaimStatus
description: Gets dns claim status for DNS and DNSSEC.
---

# getDnsClaimStatus

Gets dns claim status for DNS and DNSSEC.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.dns.getDnsClaimStatus({
  name: "example.eth",
});
```

## Parameters

```ts
type GetDnsClaimStatusParameters = Parameters<typeof sdk.dns.getDnsClaimStatus>[0];
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
type GetDnsClaimStatusResult = Awaited<ReturnType<typeof sdk.dns.getDnsClaimStatus>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.dns.getDnsClaimStatus.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.dns.getDnsClaimStatus.request(parameters);
```

## Action

- [`getDnsClaimStatus`](/core/api/actions/dns/get-dns-claim-status)
