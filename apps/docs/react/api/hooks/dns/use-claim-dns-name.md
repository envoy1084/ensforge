---
title: useClaimDnsName
description: Hook for claiming dns name.
---

# useClaimDnsName

Hook for claiming dns name.

## Import

```tsx
import { useClaimDnsName } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useClaimDnsName } from "@ensforge/react";

function Component() {
  const mutation = useClaimDnsName();

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
import type { ClaimDnsNameParameters } from "@ensforge/sdk/dns";
```

## Return Type

```ts
type Result = ReturnType<typeof useClaimDnsName>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createClaimDnsNameMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createClaimDnsNameMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`claimDnsName`](/core/api/actions/dns/claim-dns-name)
- [`sdk.dns.claimDnsName`](/sdk/api/dns/claim-dns-name)
