---
title: useRecordPermissions
description: Hook for fetching record permissions.
---

# useRecordPermissions

Hook for fetching record permissions.

## Import

```tsx
import { useRecordPermissions } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useRecordPermissions } from "@ensforge/react";

function Component() {
  const result = useRecordPermissions({
    name: "example.eth",
    account: {},
    records: [],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetRecordPermissionsParameters, UseEnsAtomParameters } from "@ensforge/react";
```

### name

`string`

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

### account

`EthereumAddress`

Account used to authorize the mutation. Defaults to the active wallet account.

### records

`ReadonlyArray<RecordOperation>`

Records selected, read, or written.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useRecordPermissions>;
```

<!--@include: @/shared/react/atom-result.md-->

## Effect Atom

```ts
import { getRecordPermissionsAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getRecordPermissionsAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getRecordPermissions`](/core/api/actions/capabilities/get-record-permissions)
- [`sdk.capabilities.getRecordPermissions`](/sdk/api/capabilities/get-record-permissions)
