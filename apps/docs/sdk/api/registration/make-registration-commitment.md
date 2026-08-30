---
title: makeRegistrationCommitment
description: make registration commitment for registration and renewal.
---

# makeRegistrationCommitment

make registration commitment for registration and renewal.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.registration.makeRegistrationCommitment({
  name: "example.eth",
  duration: 365n * 24n * 60n * 60n,
  owner: "0x0000000000000000000000000000000000000001",
  secret: "0x0000000000000000000000000000000000000000000000000000000000000001",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
type Parameters = Parameters<typeof sdk.registration.makeRegistrationCommitment>[0];
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

32-byte registration secret.

### resolver

`EthereumAddress | undefined`

Resolver address used by the method.

### subregistry

`EthereumAddress | undefined`

Value used for `subregistry` by this method.

### records

`ReadonlyArray<Hex> | undefined`

Records selected, read, or written.

### reverseRecord

`0 | 1 | 2 | undefined`

Value used for `reverseRecord` by this method.

### referrer

`Bytes32 | undefined`

Value used for `referrer` by this method.

## Return Type

```ts
type MakeRegistrationCommitmentResult = Awaited<ReturnType<typeof makeRegistrationCommitment>>;
```

| Property     | Type                               | Description                                     |
| ------------ | ---------------------------------- | ----------------------------------------------- |
| `name`       | `string & Brand<"NormalizedName">` | Normalized ENS name.                            |
| `protocol`   | `"v1" \| "v2"`                     | ENS protocol route used for the result.         |
| `registrar`  | `&#96;0x${string}&#96;`            | The registrar value returned by the operation.  |
| `commitment` | `&#96;0x${string}&#96;`            | The commitment value returned by the operation. |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.registration.makeRegistrationCommitment.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.registration.makeRegistrationCommitment.request(parameters);
```

## Error

```ts
import type { MakeRegistrationCommitmentError } from "@ensforge/sdk";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`makeRegistrationCommitment`](/core/api/actions/registration/make-registration-commitment)
