---
title: useRecords
description: Hook for fetching records.
---

# useRecords

Hook for fetching records.

## Import

```tsx
import { useRecords } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useRecords({
    name: "example.eth",
    records: [],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useRecords>[0];
```

### name

`string`

ENS name used by the query or mutation.

### records

`Selection`

Records selected, read, or written.

### gatewayUrls

`AssetGatewayUrls | undefined`

Value used for `gatewayUrls` by this operation.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

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

Returns [`EnsAtomResult`](/react/api/atom-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refresh controls.

```ts
type Result = ReturnType<typeof useRecords>;
```

## Effect Atom

```ts
import { getRecordsAtom } from "@ensforge/react/atoms";

const atom = getRecordsAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getRecords`](/core/api/actions/records/get-records)
- [`sdk.records.getRecords`](/sdk/api/records/get-records)
