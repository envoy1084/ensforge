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

::: code-group

```ts [index.ts]
import { ens } from "./client";

const result = await ens.dns.importDnsName({
  name: "example.eth",
  proof: [],
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { ImportDnsNameParameters } from "@ensforge/sdk";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

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

Viem wallet client override for this operation. Defaults to the wallet resolved from the config.

### account

`Account | Address | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

### mode

`WriteMode | undefined`

Write execution strategy. `auto` uses wallet capabilities and falls back to sequential transactions.

### confirmation

`ConfirmationPolicy | undefined`

Controls whether the action returns after submission or waits for one or more confirmations.

### resume

`ImportDnsNameResult | undefined`

Previously returned progress used to continue the workflow.

## Return Type

```ts
import type { ImportDnsNameResult } from "@ensforge/sdk";
```

| Property   | Type                                             | Description                                                  |
| ---------- | ------------------------------------------------ | ------------------------------------------------------------ |
| `status`   | `"completed" \| "not-required" \| "partial"`     | Current query, transaction, batch, or workflow status.       |
| `name`     | `string & Brand<"NormalizedName">`               | Normalized ENS name.                                         |
| `owner`    | `&#96;0x${string}&#96; \| null`                  | Current owner address, or `null` when the name has no owner. |
| `resolver` | `&#96;0x${string}&#96; \| null \| null`          | The resolver value returned by the operation.                |
| `write`    | `WritePlanProgress \| null \| WritePlanProgress` | Progress for the write plan used by the workflow.            |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { ens } from "./client";

const program = ens.dns.importDnsName.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { ImportDnsNameError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`importDnsName`](/core/api/actions/dns/import-dns-name)
