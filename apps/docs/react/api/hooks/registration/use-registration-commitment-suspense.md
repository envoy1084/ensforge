---
title: useRegistrationCommitmentSuspense
description: Suspense hook for creating registration commitment.
---

# useRegistrationCommitmentSuspense

Suspense hook for creating registration commitment.

## Import

```tsx
import { useRegistrationCommitmentSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useRegistrationCommitmentSuspense({
    name: "example.eth",
    duration: 365n * 24n * 60n * 60n,
    owner: "0x0000000000000000000000000000000000000001",
    secret: "0x0000000000000000000000000000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useRegistrationCommitmentSuspense>[0];
```

### name

`string`

ENS name used by the query or mutation.

### duration

`bigint`

Duration in seconds.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

### owner

`EthereumAddress`

Address that should own the name or resource.

### secret

`Bytes32`

32-byte registration secret.

### resolver

`EthereumAddress | undefined`

Resolver address used by the operation.

### subregistry

`EthereumAddress | undefined`

Value used for `subregistry` by this operation.

### records

`ReadonlyArray<Hex> | undefined`

Records selected, read, or written.

### reverseRecord

`0 | 1 | 2 | undefined`

Value used for `reverseRecord` by this operation.

### referrer

`Bytes32 | undefined`

Value used for `referrer` by this operation.

### map

`(value: Success) => Mapped | undefined`

Maps successful data for this hook without changing the value stored by the underlying atom.

### atom

`EnsAtomOptions<Failure> | undefined`

Controls retries, refreshes, disposal, and stale-while-revalidate behavior. Suspense hooks always execute and do not accept `enabled`.

| Property          | Type                         | Default       | Description                                     |
| ----------------- | ---------------------------- | ------------- | ----------------------------------------------- |
| `idleTTL`         | `Duration.Input`             | `"5 minutes"` | Retains an unused atom before it is disposed.   |
| `refreshInterval` | `false \| Duration.Input`    | `false`       | Refreshes the atom while it remains subscribed. |
| `retry`           | `false \| Schedule`          | `false`       | Retries typed failures with an Effect schedule. |
| `swr`             | `false \| EnsAtomSwrOptions` | enabled       | Configures stale-while-revalidate behavior.     |

See [Atom Options](/react/api/atom-options) for focused examples.

## Return Type

Returns `EnsSuspenseAtomResult` with successful data, `isWaiting`, and `updatedAt`. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useRegistrationCommitmentSuspense>;
```

## Effect Atom

```ts
import { makeRegistrationCommitmentAtom } from "@ensforge/react/atoms";

const atom = makeRegistrationCommitmentAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`makeRegistrationCommitment`](/core/api/actions/registration/make-registration-commitment)
- [`sdk.registration.makeRegistrationCommitment`](/sdk/api/registration/make-registration-commitment)
