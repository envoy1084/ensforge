---
title: FAQ
description: Common questions about ensforge React.
---

# FAQ

## Does ensforge React use TanStack Query?

No. It uses Effect Atom and exposes `AsyncResult` while providing familiar query and mutation state.

## Do I pass an SDK to every hook?

No. `EnsforgeProvider` creates or accepts the SDK once.

## Can I use the atoms directly?

Yes. The atom factories used by hooks are public.

## How do I refresh data after a write?

Use `useInvalidateEnsforge` with a name, group, action, or all-cache selector.

## Are Suspense hooks separate?

Yes. Every standard query hook has an explicitly named `Suspense` counterpart.
