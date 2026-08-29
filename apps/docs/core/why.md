---
title: Why Ensforge
description: Learn why Ensforge Core exists and when to use it.
---

# Why Ensforge

ENS applications need to work with names in different protocol states. A name may still use ENSv1,
be reserved for migration, or already use ENSv2. The correct registry, registrar, resolver, and write
route can change with that state.

Ensforge presents those states through one typed API.

## One action per intent

You call `getOwner`, `renewName`, or `setText`. Ensforge normalizes the name, discovers its current
state, and selects the supported contract path. Application code does not need separate V1 and V2
branches.

```ts
const state = await getNameState(config, { name: "example.eth" });
const owner = await getOwner(config, { name: "example.eth" });
```

Results preserve protocol details when they matter. For example, `getNameState` returns a
discriminated union, while `getOwner` returns the ownership fields most applications need.

## Promise and Effect

Every action is implemented as an Effect and exposed through two interfaces:

```ts
const owner = await getOwner(config, { name: "ens.eth" });

const ownerEffect = getOwner.effect(config, { name: "ens.eth" });
```

Use the Promise interface in ordinary TypeScript. Use `.effect` when you want typed errors,
concurrency, retries, interruption, tracing, or composition with other Effect programs. Both forms
execute the same implementation.

## Reads compose

Read actions expose a `.request` helper. Combine requests with `readBatch` to use Multicall where it
is safe and preserve the result type of every entry.

```ts
const profile = await readBatch(config, {
  owner: getOwner.request({ name: "ens.eth" }),
  resolver: getResolver.request({ name: "ens.eth" }),
  avatar: getAvatar.request({ name: "ens.eth" }),
});
```

Calls that require CCIP Read or cannot share a Multicall are executed through the appropriate path.

## Writes adapt to wallets

Write actions resolve authorization, simulate calls by default, and use the connected wallet's
capabilities. Multi-call workflows can use wallet call batching when available and fall back to safe
sequential execution when it is not.

Long-running workflows such as registration and migration return resumable progress instead of
hiding intermediate transactions.

## Built on focused primitives

Ensforge uses viem for Ethereum clients and encoding, Wagmi when you provide an existing Wagmi
configuration, and Effect for its execution model. It does not replace those libraries. It adds the
ENS-specific routing and domain model on top of them.

## When to use another package

- Use [`@ensforge/sdk`](/sdk/) when you want to bind configuration once and call grouped methods.
- Use [`@ensforge/react`](/react/) when you need reactive queries, mutations, Suspense, and caching.
- Use [`@ensforge/contracts`](/contracts/) when you only need deployment addresses or ABI fragments.
