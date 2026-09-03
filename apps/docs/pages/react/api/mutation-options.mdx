---
title: Mutation Options
description: Configure Effect schedules and Exit handlers for ensforge mutation hooks.
---

# Mutation Options

Mutation hooks accept an optional `EnsMutationOptions` object.

```ts
import type { EnsMutationExecutionOptions, EnsMutationOptions } from "@ensforge/react";
```

## retry

`false | Schedule<unknown, Failure> | undefined`

Defaults to `false`. Pass an Effect `Schedule` to control retries while preserving the mutation's
typed failure channel.

```tsx
import { Schedule } from "effect";

const setText = useSetText({
  retry: Schedule.recurs(2),
});
```

Only retry a write when repeating the operation is known to be safe. A submitted transaction may
succeed even when local receipt tracking is interrupted or times out.

## onExit

`(exit: Exit<Success, Failure>, parameters: Parameters) => void`

Runs after `mutate` or `mutateAsync` execution with the complete Effect `Exit` and exact mutation
parameters. It handles success, typed failure, defects, and interruption through one lossless
callback. `mutateEffect` returns the Effect directly, so its exit is handled through Effect
operators instead.

```tsx
import { Exit } from "effect";

const setText = useSetText({
  onExit: Exit.match({
    onFailure: (cause) => console.error(cause),
    onSuccess: (result) => console.log(result),
  }),
});
```

## Per-call options

`mutate` accepts a per-execution `onExit` handler. The hook-level handler runs first.

```tsx
setText.mutate(
  { name: "example.eth", key: "url", value: "https://example.com" },
  {
    onExit(exit, parameters) {
      console.log(parameters.name, exit);
    },
  },
);
```

`mutateAsync` reports through its Promise. `mutateEffect` returns the typed Effect directly, so
normal Effect operators such as `Effect.tap`, `Effect.catchTag`, and `Effect.timeout` can be used.

## Provider defaults

Provider defaults can supply a retry schedule for all mutations. Per-hook options take precedence.

```tsx
import { Schedule } from "effect";

<EnsforgeProvider config={config} defaults={{ mutations: { retry: Schedule.recurs(1) } }}>
  <App />
</EnsforgeProvider>;
```
