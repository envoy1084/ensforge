---
title: Getting Started
description: Configure ensforge React and render your first ENS query and mutation.
---

# Getting Started

## Add the provider

Place `EnsforgeProvider` once near the root of your client application. It accepts SDK configuration
directly, so you do not need to construct an SDK just for React.

::: code-group

<<< @/snippets/react/provider.tsx

<<< @/snippets/wagmi/config.ts

:::

The provider creates one immutable SDK and one Effect Atom registry. If you already have an
`Ensforge` instance, pass it through `sdk` instead of `config`.

## Read a name

Read hooks execute below the provider and share Effect Atom work for identical parameters.

```tsx [profile.tsx]
import { useAvatar, useOwner } from "@ensforge/react";

export function Profile({ name }: { name: string }) {
  const owner = useOwner({ name });
  const avatar = useAvatar({ name });

  if (owner.isInitial || avatar.isInitial) return <p>Loading…</p>;
  if (owner.isFailure) return <p>{owner.error.message}</p>;
  if (avatar.isFailure) return <p>{avatar.error.message}</p>;

  return (
    <article>
      {avatar.data?.url && <img alt="" src={avatar.data.url} />}
      <p>{owner.data?.owner ?? "Unowned"}</p>
    </article>
  );
}
```

Use top-level `enabled` for conditional reads and `map` to expose only the value needed by a
component. Configure caching, retries, and refreshes through the nested `atom` options.

## Write a record

Mutation hooks are idle until one of their execution functions is called.

```tsx [website-form.tsx]
import { useSetText } from "@ensforge/react";

export function WebsiteForm({ name }: { name: string }) {
  const update = useSetText({
    onExit: (exit) => console.log("Record update finished", exit),
  });

  return (
    <button
      disabled={update.isWaiting}
      onClick={() => update.mutate({ name, key: "url", value: "https://example.com" })}
    >
      {update.isWaiting ? "Updating…" : "Update website"}
    </button>
  );
}
```

Use `mutate` for `Exit` callbacks, `mutateAsync` for Promise control flow, or `mutateEffect` to stay inside
Effect.

## Next steps

- Configure [atom options](/react/api/atom-options).
- Learn [caching and invalidation](/react/guides/caching).
- Use [Effect Atom](/react/guides/effect-atom) directly.
- Browse all [hooks](/react/api/hooks/records/use-address).
