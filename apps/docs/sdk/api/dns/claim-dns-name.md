---
title: claimDnsName
description: claim dns name for DNS and DNSSEC.
---

# claimDnsName

claim dns name for DNS and DNSSEC.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.dns.claimDnsName({
  name: "example.eth",
  proof: [],
});
```

## Parameters

```ts
type ClaimDnsNameParameters = Parameters<typeof sdk.dns.claimDnsName>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### proof

`ReadonlyArray<DnssecProof>`

DNSSEC proof records.

### resolver

`string | undefined`

Resolver address used by the method.

### address

`string | undefined`

Address used by the method.

## Return Type

```ts
type ClaimDnsNameResult = Awaited<ReturnType<typeof sdk.dns.claimDnsName>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.dns.claimDnsName.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.dns.claimDnsName.call(parameters);
```

## Action

- [`claimDnsName`](/core/api/actions/dns/claim-dns-name)
