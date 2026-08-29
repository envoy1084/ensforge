---
title: FAQ
description: Common questions about the Ensforge SDK.
---

# FAQ

## Is the SDK different from Core?

It exposes the same actions with configuration bound and methods grouped by capability.

## Should I create one instance?

Create one instance per network and client configuration. The instance is immutable and safe to
share.

## Can I use Wagmi?

Yes. Pass `wagmiConfig` to the constructor. Wallet changes are resolved when write methods execute.

## Can SDK methods be batched?

Yes. Read methods retain `.request`, and write methods retain `.call`.

## Can I use Effect?

Yes. Every method exposes a config-bound `.effect` form.
