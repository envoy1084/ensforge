---
title: EnsforgeProvider
description: Provide an ensforge SDK and Effect Atom registry to React hooks.
---

# EnsforgeProvider

Provides the SDK, query defaults, and Effect Atom registry used by every hook.

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

### SDK

```tsx
<EnsforgeProvider sdk={sdk}>
  <App />
</EnsforgeProvider>
```

Provide exactly one of `config` or `sdk`.

## Parameters

### config

`CreateConfigParameters | undefined`

Creates one SDK instance on the provider's first render.

### sdk

`ensforge | undefined`

Existing SDK instance to share.

### defaults

`EnsforgeReactDefaults | undefined`

Default query cache, retry, refetch, and freshness options.

### registry

`AtomRegistry | undefined`

Existing Effect Atom registry. When omitted, the provider creates a `RegistryProvider`.

### defaultIdleTTL

`number | undefined`

Idle lifetime passed to the internally created registry.

### children

`ReactNode`

React subtree that can use ensforge hooks.

## Context

Use `useEnsforge` to access the SDK and `useEnsforgeRegistry` to access the registry.
