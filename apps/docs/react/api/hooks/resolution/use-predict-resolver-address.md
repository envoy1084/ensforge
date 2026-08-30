---
title: usePredictResolverAddress
description: Hook for running predict resolver address.
---

# usePredictResolverAddress

Hook for running predict resolver address.

## Import

```tsx
import { usePredictResolverAddress } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { usePredictResolverAddress } from "@ensforge/react";

function Component() {
  const result = usePredictResolverAddress({
    salt: 1n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { CreateResolverParameters, UseEnsAtomParameters } from "@ensforge/react";
```

### salt

`bigint`

Value used for `salt` by this operation.

### admin

`string | undefined`

Value used for `admin` by this operation.

### roles

`bigint | undefined`

Role bitmask to inspect, grant, or revoke.

### setters

`ReadonlyArray<Hex> | undefined`

Value used for `setters` by this operation.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this mutation.

### account

`Account | Address | undefined`

Account used to authorize the mutation. Defaults to the active wallet account.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

### enabled

`boolean | undefined`

Defaults to `true`. Set it to `false` to keep the atom idle without executing the action.

### map

`(value: Success) => Mapped | undefined`

Maps successful data for this hook without changing the value stored by the underlying atom.

### atom

`EnsAtomOptions<Failure> | undefined`

Controls the Effect Atom lifecycle for this hook.

| Property          | Type                         | Default       | Description                                     |
| ----------------- | ---------------------------- | ------------- | ----------------------------------------------- |
| `idleTTL`         | `Duration.Input`             | `"5 minutes"` | Retains an unused atom before it is disposed.   |
| `refreshInterval` | `false \| Duration.Input`    | `false`       | Refreshes the atom while it remains subscribed. |
| `retry`           | `false \| Schedule`          | `false`       | Retries typed failures with an Effect schedule. |
| `swr`             | `false \| EnsAtomSwrOptions` | enabled       | Configures stale-while-revalidate behavior.     |

See [Atom Options](/react/api/atom-options) for focused examples.

## Return Type

```ts
type Result = ReturnType<typeof usePredictResolverAddress>;
```

Returns an [`EnsAtomResult`](/react/api/atom-result).

| Property        | Description                                             |
| --------------- | ------------------------------------------------------- |
| `data`          | Successful action data, or `undefined` before success.  |
| `error`         | Typed action failure, an unexpected `Error`, or `null`. |
| `cause`         | Complete Effect cause for the latest failure.           |
| `isInitial`     | No execution has completed yet.                         |
| `isWaiting`     | Initial or background work is running.                  |
| `isSuccess`     | The atom contains a successful value.                   |
| `isFailure`     | The atom contains a failed result.                      |
| `refresh`       | Refreshes the atom and returns a Promise.               |
| `refreshEffect` | Refreshes with a typed Effect error channel.            |
| `result`        | Underlying Effect `AsyncResult`.                        |
| `updatedAt`     | Timestamp of the latest successful value.               |

## Effect Atom

```ts
import { predictResolverAddressAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = predictResolverAddressAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`predictResolverAddress`](/core/api/actions/resolution/predict-resolver-address)
- [`sdk.resolution.predictResolverAddress`](/sdk/api/resolution/predict-resolver-address)
