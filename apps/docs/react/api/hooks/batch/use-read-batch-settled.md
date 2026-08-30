---
title: useReadBatchSettled
description: Hook for running read batch settled.
---

# useReadBatchSettled

Hook for running read batch settled.

## Import

```tsx
import { useReadBatchSettled } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useReadBatchSettled({});

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useReadBatchSettled>[0];
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
type Result = ReturnType<typeof useReadBatchSettled>;
```

## Effect Atom

```ts
import { readBatchSettledAtom } from "@ensforge/react/atoms";

const atom = readBatchSettledAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`readBatchSettled`](/core/api/actions/batch/read-batch-settled)
- [`sdk.batch.readBatchSettled`](/sdk/api/batch/read-batch-settled)
