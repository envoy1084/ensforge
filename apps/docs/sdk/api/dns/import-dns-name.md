---
title: importDnsName
description: Runs the resumable DNSSEC import workflow.
---

# importDnsName

Runs the resumable DNSSEC import workflow.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.dns.importDnsName({
  name: "example.eth",
  proof: [],
});
```

## Parameters

```ts
type ImportDnsNameParameters = Parameters<typeof sdk.dns.importDnsName>[0];
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

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

### mode

`WriteMode | undefined`

Execution mode. `auto` selects wallet batching when available.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

### resume

`ImportDnsNameResult | undefined`

Previously returned progress used to continue the workflow.

## Return Type

```ts
type ImportDnsNameResult = Awaited<ReturnType<typeof sdk.dns.importDnsName>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.dns.importDnsName.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`importDnsName`](/core/api/actions/dns/import-dns-name)
