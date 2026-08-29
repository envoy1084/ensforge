---
title: SDK
description: A config-bound ENS client with grouped operations.
---

# SDK

An immutable, config-bound ENS client with grouped operations.

```ts
const owner = await sdk.name.getOwner({ name: "sdk.eth" });
const avatar = await sdk.records.getAvatar({ name: "sdk.eth" });
```

The SDK exposes the complete Core action surface while binding configuration once. Start with
[Why ensforge](/sdk/why) or [Getting Started](/sdk/getting-started).
