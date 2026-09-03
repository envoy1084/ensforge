---
title: getRegistrationPlan
description: Builds the current registration plan for a name.
---

# getRegistrationPlan

Builds the current registration plan for a name.

## Import

```ts
import { getRegistrationPlan } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getRegistrationPlan } from "@ensforge/core";
import { config } from "./config";

const result = await getRegistrationPlan(config, {
  name: "example.eth",
  duration: 365n * 24n * 60n * 60n,
  owner: "0x0000000000000000000000000000000000000001",
  secret: "0x0000000000000000000000000000000000000000000000000000000000000001",
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="registration.getRegistrationPlan" />

## Parameters

```ts
import type { GetRegistrationPlanParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### duration

`bigint`

Duration in seconds.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

### owner

`EthereumAddress`

Address that should own the resulting name or resource.

### secret

`Bytes32`

32-byte secret used to construct a registration commitment.

### resolver

`EthereumAddress | undefined`

Resolver address used by the operation.

### subregistry

`EthereumAddress | undefined`

ENSv2 subregistry assigned during registration.

### records

`ReadonlyArray<Hex> | undefined`

Records selected, read, or written by the operation.

### reverseRecord

`0 | 1 | 2 | undefined`

Reverse-record behavior requested during registration.

### referrer

`Bytes32 | undefined`

Optional protocol-specific referral identifier.

### paymentToken

`EthereumAddress | undefined`

ERC-20 token used when the registrar supports token payments.

## Return Type

```ts
type GetRegistrationPlanResult = Awaited<ReturnType<typeof getRegistrationPlan>>;
```

| Property           | Type                                                                                                                                                                                                                                                                                                                                                         | Description                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| `status`           | `"unavailable" \| "payment-token-required" \| "unsupported-payment-token" \| "ready" \| "commitment-required" \| "commitment-pending" \| "commitment-expired"`                                                                                                                                                                                               | Current query, transaction, batch, or workflow status. |
| `name`             | `string & Brand<"NormalizedName">`                                                                                                                                                                                                                                                                                                                           | Normalized ENS name.                                   |
| `paymentToken`     | `&#96;0x${string}&#96; \| undefined`                                                                                                                                                                                                                                                                                                                         | The paymentToken value returned by the operation.      |
| `parameters`       | `{ readonly protocol: "v1"; readonly registrar: &#96;0x${string}&#96;; readonly priceOracle: &#96;0x${string}&#96;; readonly minimumRegistrationDuration: bigint; readonly minimumRenewalDuration: bigint; readonly minimumCommitmentAge: bigint; readonly maximumCommitmentAge: bigint; readonly payment: { ...; }; } \| { ...; } \| undefined`             | The parameters value returned by the operation.        |
| `price`            | `{ readonly status: "available"; readonly name: string & Brand<"NormalizedName">; readonly protocol: "v1" \| "v2"; readonly registrar: &#96;0x${string}&#96;; readonly duration: bigint; readonly base: bigint; readonly premium: bigint; readonly total: bigint; readonly currency: { ...; } \| { ...; }; } \| { ...; } \| { ...; } \| { .... \| undefined` | The price value returned by the operation.             |
| `commitment`       | `{ readonly name: string & Brand<"NormalizedName">; readonly protocol: "v1" \| "v2"; readonly registrar: &#96;0x${string}&#96;; readonly commitment: &#96;0x${string}&#96;; } \| undefined`                                                                                                                                                                  | The commitment value returned by the operation.        |
| `commitmentStatus` | `{ readonly status: "not-found"; readonly protocol: "v1" \| "v2"; } \| { readonly status: "pending"; readonly protocol: "v1" \| "v2"; readonly submittedAt: bigint; readonly readyAt: bigint; readonly expiresAt: bigint; readonly remainingSeconds: bigint; } \| { ...; } \| { ...; } \| undefined`                                                         | The commitmentStatus value returned by the operation.  |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getRegistrationPlan.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getRegistrationPlan.request(parameters);
```

## Error

```ts
import type { GetRegistrationPlanError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.registration.getRegistrationPlan`](/sdk/api/registration/get-registration-plan)
