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

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getRegistrationParameters.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getRegistrationParameters.request(parameters);
```

## Error

```ts
import type { GetRegistrationParametersError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.registration.getRegistrationParameters`](/sdk/api/registration/get-registration-parameters)
