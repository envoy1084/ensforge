---
title: Atom Options
description: Configure Effect Atom caching, retries, refreshes, and stale-while-revalidate behavior in ensforge React hooks.
---

# Atom Options

Read hooks accept Effect Atom behavior through the `atom` property. Hook-only controls such as
`enabled` and `map` stay at the top level.

```ts
import type { EnsAtomOptions, UseEnsAtomParameters } from "@ensforge/react";
```

## enabled

`boolean | undefined`

Defaults to `true`. Set it to `false` to subscribe to an initial atom without executing the action.
Suspense hooks always execute and do not accept this property.

```tsx
const owner = useOwner({
  name,
  enabled: name.endsWith(".eth"),
});
```

## map

`(value: Success) => Mapped | undefined`

Maps successful data for the current hook. It does not change the value cached by the underlying
atom, so multiple components can derive different values from the same read.

```tsx
const owner = useOwner({
  name: "example.eth",
  map: (result) => result.owner,
});
```

## atom

`EnsAtomOptions<Failure> | undefined`

### idleTTL

`Duration.Input | undefined`

Defaults to five minutes. Controls how long an unused atom remains alive before Effect Atom
disposes it. Duration strings, milliseconds, and Effect `Duration` values are accepted.

```tsx
const owner = useOwner({
  name: "example.eth",
  atom: { idleTTL: "10 minutes" },
});
```

### refreshInterval

`false | Duration.Input | undefined`

Defaults to `false`. Uses `Atom.withRefresh` to refresh the read while the atom remains subscribed.
The timer is disposed with the atom.

```tsx
const expiry = useExpiry({
  name: "example.eth",
  atom: { refreshInterval: "30 seconds" },
});
```

### retry

`false | Schedule<unknown, Failure> | undefined`

Defaults to `false`. Pass an Effect `Schedule` to control retry count, delay, backoff, and error
filtering without reducing failures to an untyped number.

```tsx
import { Schedule } from "effect";

const owner = useOwner({
  name: "example.eth",
  atom: { retry: Schedule.recurs(2) },
});
```

### swr

`false | EnsAtomSwrOptions | undefined`

Stale-while-revalidate is enabled by default with a 30-second `staleTime`. It is implemented by
`Atom.swr`, so mount and focus refreshes follow the atom lifecycle rather than React timers.

```tsx
const owner = useOwner({
  name: "example.eth",
  atom: {
    swr: {
      staleTime: "1 minute",
      revalidateOnMount: true,
      revalidateOnFocus: "always",
    },
  },
});
```

Set `swr: false` to disable stale-while-revalidate behavior.

## Provider defaults

Provider defaults are applied first. Per-hook atom options override them.

```tsx
import { Schedule } from "effect";

<EnsforgeProvider
  config={config}
  defaults={{
    atoms: {
      idleTTL: "10 minutes",
      retry: Schedule.recurs(2),
      swr: {
        staleTime: "1 minute",
        revalidateOnFocus: true,
      },
    },
  }}
>
  <App />
</EnsforgeProvider>;
```

`enabled` and `map` are intentionally per-hook and cannot be provider defaults.
