---
title: makeRegistrationCommitment
description: make registration commitment for registration and renewal.
---

# makeRegistrationCommitment

make registration commitment for registration and renewal.

## Import

```ts
import { makeRegistrationCommitment } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { makeRegistrationCommitment } from "@ensforge/core";
import { config } from "./config";

const result = await makeRegistrationCommitment(config, {
  name: "example.eth",
  duration: 365n * 24n * 60n * 60n,
  owner: "0x0000000000000000000000000000000000000001",
  secret: "0x0000000000000000000000000000000000000000000000000000000000000001",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
type Parameters = Parameters<typeof makeRegistrationCommitment>[1];
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

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = makeRegistrationCommitment.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = makeRegistrationCommitment.request(parameters);
```

## Error

```ts
import type { MakeRegistrationCommitmentError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.registration.makeRegistrationCommitment`](/sdk/api/registration/make-registration-commitment)
