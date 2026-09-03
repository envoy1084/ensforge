---
title: getRegistrationParameters
description: Gets registration parameters for registration and renewal.
---

# getRegistrationParameters

Gets registration parameters for registration and renewal.

## Import

```ts
import { getRegistrationParameters } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getRegistrationParameters } from "@ensforge/core";
import { config } from "./config";

const result = await getRegistrationParameters(config, {});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="registration.getRegistrationParameters" />

## Parameters

```ts
import type { BlockParameters } from "@ensforge/core";
```

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetRegistrationParametersResult = Awaited<ReturnType<typeof getRegistrationParameters>>;
```

| Property                      | Type                                                                                      | Description                                                      |
| ----------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `protocol`                    | `"v1" \| "v2"`                                                                            | ENS protocol route used for the result.                          |
| `registrar`                   | `&#96;0x${string}&#96;`                                                                   | The registrar value returned by the operation.                   |
| `priceOracle`                 | `&#96;0x${string}&#96;`                                                                   | The priceOracle value returned by the operation.                 |
| `minimumRegistrationDuration` | `bigint`                                                                                  | The minimumRegistrationDuration value returned by the operation. |
| `minimumRenewalDuration`      | `bigint`                                                                                  | The minimumRenewalDuration value returned by the operation.      |
| `minimumCommitmentAge`        | `bigint`                                                                                  | The minimumCommitmentAge value returned by the operation.        |
| `maximumCommitmentAge`        | `bigint`                                                                                  | The maximumCommitmentAge value returned by the operation.        |
| `payment`                     | `{ readonly kind: "native"; } \| { readonly kind: "erc20"; readonly enumerable: false; }` | The payment value returned by the operation.                     |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getRegistrationParameters.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getRegistrationParameters.request(parameters);
```

## Error

```ts
import type { GetRegistrationParametersError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.registration.getRegistrationParameters`](/sdk/api/registration/get-registration-parameters)
