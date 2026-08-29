---
title: useEnsforge
description: Returns the Ensforge SDK from the nearest provider.
---

# useEnsforge

Returns the Ensforge SDK from the nearest provider.

## Import

```tsx
import { useEnsforge } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const sdk = useEnsforge();
  // ...
}
```

## Parameters

None.

## Return Type

`Ensforge`

The value belongs to the nearest [`EnsforgeProvider`](/react/api/ensforge-provider).
