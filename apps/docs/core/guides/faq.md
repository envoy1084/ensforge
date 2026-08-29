---
title: FAQ
description: Common questions about ensforge Core.
---

# FAQ

## Do I need to know whether a name uses ENSv1 or ENSv2?

Usually, no. Public actions route from the configured network and current name state. Use
`getNameState` when the distinction matters to your interface.

## Does ensforge replace viem?

No. ensforge uses viem clients and primitives. It provides ENS-specific actions, routing, codecs,
batching, and workflows.

## Do I have to use Effect?

No. Call an action directly for a Promise. The `.effect` form is available when you want Effect's
typed failure and composition model.

## Can I use my existing Wagmi config?

Yes. Pass `wagmiConfig` to `createConfig`. Do not also pass `publicClient` or `walletClient`.

## Does batch reading support CCIP Read?

Yes. `readBatch` does not force every read through Multicall3. It routes calls that require CCIP Read
through the compatible execution path and combines the typed results.

## Are batch writes atomic?

Only when the wallet and selected execution path can provide the requested atomicity. `auto` mode
may fall back to sequential transactions. Inspect the returned execution result and use an explicit
atomicity requirement when partial completion is unacceptable.

## Can I read at a historical block?

Read actions accept either `blockNumber` or `blockTag`. These fields are mutually exclusive.

## Where do contract addresses come from?

They are selected from versioned deployment metadata in `@ensforge/contracts`. The action config
validates that the client chain and deployment chain match.
