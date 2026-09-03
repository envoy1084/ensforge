---
title: Actions
description: Understand the Promise, Effect, request, and call interfaces of Core actions.
---

# Actions

Core actions are standalone functions that receive an `EnsforgeConfig` and operation parameters.

```ts
const owner = await getOwner(config, { name: "ens.eth" });
```

## Promise interface

Calling an action directly returns a Promise. Expected failures reject with the tagged error objects
documented by the action.

```ts
const result = await getAddress(config, {
  name: "ens.eth",
  coinType: 60n,
});
```

## Effect interface

Every action exposes the Effect that implements it.

```ts
const effect = getAddress.effect(config, {
  name: "ens.eth",
  coinType: 60n,
});
```

The success and failure channels remain available to Effect operators. The callable Promise form is
equivalent to running this value with `Effect.runPromise`.

## Read requests

Read actions expose `.request`. It captures parameters and the typed decoder without starting work.

```ts
const request = getAddress.request({ name: "ens.eth" });
```

Pass requests to `readBatch` or `readBatchSettled`. ensforge decides which requests can share a
Multicall and which require another path such as CCIP Read.

## Write intents

Direct write actions expose `.call`.

```ts
const intent = setText.call({
  name: "example.eth",
  key: "url",
  value: "https://example.com",
});
```

A write intent defers name routing, authorization, target selection, and calldata preparation until
execution. It can be simulated, estimated, or sent with other intents.

## Workflows

Registration, migration, DNS import, and other multi-stage actions expose Promise and Effect forms
but may not expose `.call`. They build and execute write plans, returning progress that can be passed
back through `resume`.

## Indexer actions

Indexer actions are exported from the isolated `@ensforge/core/indexer` entrypoint. They use
GraphQL sources for search, filtering, pagination, and historical state while preserving the same
Promise and `.effect` interfaces as other Core actions.

```ts
import { getNamesForAddress } from "@ensforge/core/indexer";

const page = await getNamesForAddress(config, {
  address: account,
  first: 25,
});
```

They do not expose `.request` because GraphQL operations cannot be added to an RPC Multicall. Use
their cursor pagination and run independent Effects concurrently when composing larger queries.

## Defining actions

`defineAction`, `defineReadAction`, and `defineWriteAction` are public for integrations that need to
follow the same dual-interface convention. Application code normally consumes the included actions
instead of defining new ones.
