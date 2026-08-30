---
title: useSetZoneHash
description: Hook for setting zone hash.
---

# useSetZoneHash

Hook for setting zone hash.

## Import

```tsx
import { useSetZoneHash } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetZoneHash } from "@ensforge/react";

function Component() {
  const mutation = useSetZoneHash();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          value: "https://example.com",
        })
      }
    >
      Submit
    </button>
  );
}
```

<<< @/snippets/react/provider.tsx

:::

<!--@include: @/shared/react/mutation-options.md-->

## Mutation Parameters

```ts
import type { SetZoneHashParameters } from "@ensforge/sdk/dns";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetZoneHash>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetZoneHashMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetZoneHashMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setZoneHash`](/core/api/actions/dns/set-zone-hash)
- [`sdk.dns.setZoneHash`](/sdk/api/dns/set-zone-hash)
