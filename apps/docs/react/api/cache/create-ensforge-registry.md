---
title: createEnsforgeRegistry
description: Create an Effect Atom registry configured for ensforge React.
---

# createEnsforgeRegistry

Creates an application-owned Effect Atom registry using React-compatible task scheduling.

## Import

```ts
import { createEnsforgeRegistry } from "@ensforge/react/cache";
```

## Usage

```ts
const registry = createEnsforgeRegistry({
  defaultIdleTTL: 5 * 60_000,
  timeoutResolution: 10,
});

<EnsforgeProvider sdk={sdk} registry={registry}>
  <App />
</EnsforgeProvider>;
```

## Parameters

`defaultIdleTTL` controls the default lifetime of unused atoms. `timeoutResolution` configures the
registry scheduler's timer resolution. Both fields are optional.

## Return Type

`AtomRegistry`
