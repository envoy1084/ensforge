---
title: Writes
description: Execute direct and resumable writes through the grouped SDK.
---

# Writes

Configure a wallet when creating the SDK, or construct it from a Wagmi config.

```ts
const sdk = new Ensforge({
  network: "mainnet",
  publicClient,
  walletClient,
});
```

Direct methods execute immediately:

```ts
const result = await sdk.records.setText({ name, key: "url", value });
```

Use `.call` to defer execution and compose writes. Resumable workflow methods accept their previously
returned progress through `resume`.

```ts
const progress = await sdk.registration.registerName(parameters);
const completed = await sdk.registration.registerName({ ...parameters, resume: progress });
```

Configuration defaults control simulation and confirmation. Action parameters override them where
the public type includes those fields.
