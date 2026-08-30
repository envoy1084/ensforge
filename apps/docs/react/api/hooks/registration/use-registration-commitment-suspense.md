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

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { makeRegistrationCommitmentAtom } from "@ensforge/react/atoms";

const atom = makeRegistrationCommitmentAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`makeRegistrationCommitment`](/core/api/actions/registration/make-registration-commitment)
- [`sdk.registration.makeRegistrationCommitment`](/sdk/api/registration/make-registration-commitment)
