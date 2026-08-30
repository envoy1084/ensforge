---
title: useImportDnsName
description: Hook for importing dns name.
---

# useImportDnsName

Hook for importing dns name.

## Import

```tsx
import { useImportDnsName } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useImportDnsName } from "@ensforge/react";

function Component() {
  const mutation = useImportDnsName();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          proof: [],
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
import type { ImportDnsNameParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useImportDnsName>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createImportDnsNameMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createImportDnsNameMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`importDnsName`](/core/api/actions/dns/import-dns-name)
- [`sdk.dns.importDnsName`](/sdk/api/dns/import-dns-name)
