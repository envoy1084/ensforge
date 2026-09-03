---
title: useDecodedName
description: React hook that recovers a human-readable ENS name from indexed encoded-label evidence.
---

# useDecodedName

React hook that recovers a human-readable ENS name from indexed encoded-label evidence.

## Import

```tsx
import { useDecodedName } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useDecodedName } from "@ensforge/react";

function Component() {
  const result = useDecodedName({
    name: "example.eth",
    allowIncomplete: true,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetDecodedNameParametersType } from "@ensforge/sdk/indexer";
```

### name

`string`

Name to decode. Normalized labels are preserved and encoded labels are recovered from indexer evidence.

### allowIncomplete

`boolean | undefined`

Returns a partially decoded name when only some labels can be recovered. Defaults to `false`.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useDecodedName>;
```

Successful `data` has type `GetDecodedNameResult`.

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useDecodedNameSuspense` beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useDecodedNameSuspense } from "@ensforge/react";
```

### Usage

```tsx
const result = useDecodedNameSuspense({
  name: "example.eth",
  allowIncomplete: true,
});
```

### Parameters

`useDecodedNameSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useDecodedNameSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getDecodedNameAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getDecodedNameAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Actions

- [`getDecodedName`](/core/api/actions/indexer/names/get-decoded-name)
- [`sdk.indexer.getDecodedName`](/sdk/api/indexer/names/get-decoded-name)
