---
title: useSetDnsRecords
description: Hook for setting dns records.
---

# useSetDnsRecords

Hook for setting dns records.

## Import

```tsx
import { useSetDnsRecords } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetDnsRecords } from "@ensforge/react";

function Component() {
  const mutation = useSetDnsRecords();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          data: "0x",
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
import type { SetDnsRecordsParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetDnsRecords>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetDnsRecordsMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetDnsRecordsMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setDnsRecords`](/core/api/actions/dns/set-dns-records)
- [`sdk.dns.setDnsRecords`](/sdk/api/dns/set-dns-records)
