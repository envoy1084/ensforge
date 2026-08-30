---
title: EnsforgeProvider
description: Provide an ensforge SDK and Effect Atom registry to React hooks.
---

# EnsforgeProvider

Provides the SDK, atom defaults, and Effect Atom registry used by every ensforge hook.

## Import

```tsx
import { EnsforgeProvider } from "@ensforge/react";
```

## Usage

### Config

```tsx
<EnsforgeProvider config={{ network: "mainnet", wagmiConfig }}>
  <App />
</EnsforgeProvider>
```

### Existing SDK

```tsx
import { Ensforge } from "@ensforge/react";

const ens = new Ensforge({ network: "mainnet", publicClient, walletClient });

<EnsforgeProvider sdk={ens}>
  <App />
</EnsforgeProvider>;
```

Provide exactly one of `config` or `sdk`.

## Parameters

```ts
import type { EnsforgeProviderProps } from "@ensforge/react";
```

### config

`CreateConfigParameters | undefined`

Configuration used to create one SDK instance on the provider's first render. Changes to the object
after mounting do not recreate the SDK.

### sdk

`Ensforge | undefined`

Existing SDK instance to share. Use this when non-React code and hooks should use the same client.

### defaults

`EnsforgeReactDefaults | undefined`

Default atom and mutation behavior. A hook's `atom` options or mutation options take precedence.

### registry

`AtomRegistry | undefined`

Application-owned Effect Atom registry. When omitted, the provider creates and owns a
`RegistryProvider`.

### defaultIdleTTL

`number | undefined`

Idle lifetime passed to the internally created registry. Individual reads can override it with
`atom.idleTTL`.

### children

`ReactNode`

React subtree that can access ensforge hooks and context.

## Context hooks

`useEnsforge` returns the SDK and `useEnsforgeRegistry` returns the active registry. Both throw a
clear provider error when called outside `EnsforgeProvider`.
