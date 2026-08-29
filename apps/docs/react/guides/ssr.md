---
title: SSR and Frameworks
description: Use Ensforge React with server-rendered React applications.
---

# SSR and Frameworks

`@ensforge/react` is a client package. Place the provider and hook-using components behind your
framework's client-component boundary.

```tsx
"use client";

export function Providers({ children }: { children: React.ReactNode }) {
  return <EnsforgeProvider config={config}>{children}</EnsforgeProvider>;
}
```

Create browser wallet transports only in client code. A server can create a read-only SDK and Effect
Atom registry for prefetching, then pass serializable results through the framework's normal data
boundary.

Do not share a mutable wallet connection or per-user registry between server requests. Create or
scope those values per request.
