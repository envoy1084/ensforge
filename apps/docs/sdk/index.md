---
title: SDK
description: A config-bound ENS client with grouped operations.
---

# SDK

An immutable, config-bound ENS client with grouped operations.

```ts
const owner = await sdk.name.getOwner({ name: "ens.eth" });
const avatar = await sdk.records.getAvatar({ name: "ens.eth" });
```

The SDK exposes the complete Core action surface while binding configuration once. Start with
[Why Ensforge](/sdk/why) or [Getting Started](/sdk/getting-started).
