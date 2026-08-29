---
title: Why ensforge
description: Learn when to use the grouped ensforge SDK.
---

# Why ensforge

The SDK is the config-bound interface to ensforge. It keeps large applications organized without
changing the behavior or types of Core actions.

```ts
const sdk = new Ensforge({ network: "mainnet", publicClient });

await sdk.name.getOwner({ name: "ens.eth" });
await sdk.records.getAvatar({ name: "ens.eth" });
await sdk.registration.getRenewalPrice({ name: "ens.eth", duration });
```

Methods are grouped by ENS capability: name, records, registration, resolution, ownership,
permissions, migration, wrapping, subnames, reverse records, DNS, events, and batching.

Each method preserves the corresponding Core extensions. Read methods expose `.request`, write
methods expose `.call`, and every method exposes `.effect` without requiring the config argument.

Use Core when standalone functions or minimal imports fit your architecture better. Use the SDK when
you want one immutable client that can be passed between services and application modules.
