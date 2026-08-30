---
title: useReadBatch
description: Hook for running read batch.
---

# useReadBatch

Hook for running read batch.

## Import

```tsx
import { useReadBatch } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useReadBatch({});

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useReadBatch>[0];
```

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
type Result = ReturnType<typeof useReadBatch>;
```

## Effect Atom

```ts
import { readBatchAtom } from "@ensforge/react/atoms";

const atom = readBatchAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`readBatch`](/core/api/actions/batch/read-batch)
- [`sdk.batch.readBatch`](/sdk/api/batch/read-batch)
