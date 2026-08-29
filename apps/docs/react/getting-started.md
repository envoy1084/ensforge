---
title: Getting Started
description: Configure EnsforgeProvider and render your first ENS query.
---

# Getting Started

Add `EnsforgeProvider` near the root of the client application. It accepts either SDK configuration
or an existing `Ensforge` instance.

```tsx
import { EnsforgeProvider } from "@ensforge/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EnsforgeProvider config={{ network: "mainnet", wagmiConfig }}>{children}</EnsforgeProvider>
  );
}
```

Use query hooks below the provider.

```tsx
import { useOwner } from "@ensforge/react";

export function Owner({ name }: { name: string }) {
  const owner = useOwner({ name });

  if (owner.isLoading) return <span>Loading…</span>;
  if (owner.isError) return <span>{owner.error.message}</span>;
  return <span>{owner.data?.owner ?? "No owner"}</span>;
}
```

Write hooks return mutation controls and state.

```tsx
const setText = useSetText();

setText.mutate({
  name: "example.eth",
  key: "url",
  value: "https://example.com",
});
```
