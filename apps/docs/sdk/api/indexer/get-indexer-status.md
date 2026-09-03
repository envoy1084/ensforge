---
title: getIndexerStatus
description: Returns health and indexed-block metadata for every configured indexer source.
---

# getIndexerStatus

Returns health and indexed-block metadata for every configured indexer source.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.indexer.getIndexerStatus();
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="indexer.getIndexerStatus" />

## Parameters

This operation does not accept parameters.

## Return Type

```ts
import type { IndexerStatusType } from "@ensforge/sdk/indexer";
```

| Property  | Type                             | Description                                                                 |
| --------- | -------------------------------- | --------------------------------------------------------------------------- |
| `network` | `"mainnet" \| "sepolia"`         | Configured ENS network.                                                     |
| `sources` | `readonly IndexerSourceStatus[]` | A `ready`, `failed`, `disabled`, or `unavailable` status for each protocol. |

## Protocol Sources

ENSv1 and ENSv2 are checked independently. Endpoint failures are captured in source status values instead of failing the complete operation.

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.indexer.getIndexerStatus.effect();

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Action

- [`getIndexerStatus`](/core/api/actions/indexer/get-indexer-status)

## Hook

- [`useIndexerStatus`](/react/api/hooks/indexer/use-indexer-status)
