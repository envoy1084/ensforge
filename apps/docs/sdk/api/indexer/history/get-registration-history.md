---
title: getRegistrationHistory
description: Lists registration and renewal history for one ENS name.
---

# getRegistrationHistory

Lists registration and renewal history for one ENS name.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.indexer.getRegistrationHistory({
  name: "example.eth",
  pageSize: 20,
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetRegistrationHistoryParameters } from "@ensforge/sdk/indexer";
```

### name

`string | undefined`

ENS name to look up. Provide either `name` or `namehash`; names are normalized before querying.

### namehash

`` `0x${string}` | undefined ``

Namehash to use when the plaintext name is unavailable. Provide either `namehash` or `name`.

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetRegistrationHistoryResult } from "@ensforge/sdk/indexer";
```

Items are discriminated by semantic `kind` and contain normalized chain position, protocol, name identity, raw metadata, and kind-specific fields.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

Compatible events from enabled ENSv1 and ENSv2 sources are normalized and merged by chain position.

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.indexer.getRegistrationHistory.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetRegistrationHistoryError } from "@ensforge/sdk/indexer";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getRegistrationHistory`](/core/api/actions/indexer/history/get-registration-history)

## Hook

- [`useRegistrationHistory`](/react/api/hooks/indexer/history/use-registration-history)
