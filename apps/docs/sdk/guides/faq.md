---
title: FAQ
description: Frequently asked questions about the ensforge SDK.
---

# FAQ

## Is the SDK a replacement for Core?

No. `@ensforge/sdk` binds the same Core actions to one config and organizes them into domain groups.
Use Core for standalone functions and request composition; use the SDK when a long-lived client is
more convenient.

## Can I use viem clients directly?

Yes. Pass `publicClient` and, for writes, `walletClient` to the constructor. The SDK does not create
transports or manage accounts for you.

## Can I use a Wagmi config?

Yes. Pass `wagmiConfig` instead of viem clients. Reads use Wagmi's public client and writes resolve
the connected wallet when they execute.

## Can I use Effect without using React?

Yes. Every bound action exposes `.effect` and keeps its typed error channel. The Promise method is a
convenience wrapper around the same Effect implementation.

```ts
import { Effect } from "effect";
import { ens } from "./client";

const program = Effect.all({
  owner: ens.name.getOwner.effect({ name: "example.eth" }),
  avatar: ens.records.getAvatar.effect({ name: "example.eth" }),
});
```

## Does the SDK support ENSv1 and ENSv2 names?

Yes. Public methods are protocol-neutral. They inspect the configured network and name state, then
route to the appropriate contracts. Results expose a discriminant when protocol differences matter.

## Are names normalized automatically?

Yes. Actions normalize names before hashing or contract interaction. Invalid names fail with a
typed `NameError`.

## Does batching work with CCIP Read?

Yes. Resolver requests that require offchain lookup keep their CCIP Read behavior. ensforge only
uses onchain multicall for compatible request segments and executes incompatible segments through
the public client.

## Are batched writes atomic?

Only when the connected wallet advertises atomic batch support. `mode: "auto"` checks capabilities
and falls back to sequential execution. Inspect the returned execution result instead of assuming
all wallets provide the same guarantee.

## Can I override a client for one method?

Write parameters accept `walletClient` and `account` overrides. Read actions use the public client
held by the SDK config.

## Where are contract addresses and ABIs exported?

Use [`@ensforge/contracts`](/contracts/getting-started) when you need deployment metadata or ABI
fragments directly.
