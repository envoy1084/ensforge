---
title: getNameState
description: Get the complete protocol-aware state of an ENS name.
---

# getNameState

Gets the complete application-facing state of an ENS name as a discriminated union.

## Import

```ts
import { getNameState } from "@ensforge/core";
```

## Usage

```ts
import { getNameState } from "@ensforge/core";
import { config } from "./config";

const state = await getNameState(config, { name: "example.eth" });

if (state.kind === "v2-reserved") {
  console.log("This name can be migrated to ENSv2");
}
```

Use this action when the interface needs several ownership, lifecycle, and migration fields together.
Use focused actions such as `getManager` or `isMigrated` when you only need one value.

## Parameters

```ts
import type { GetNameStateParameters } from "@ensforge/core";
```

### name

`string`

ENS name to inspect.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
import type { NameState } from "@ensforge/core";
```

`NameState`

The `kind` field identifies the route:

| `kind`         | Meaning                                               |
| -------------- | ----------------------------------------------------- |
| `available`    | No active registration owns the name.                 |
| `v1-unwrapped` | The name is managed directly through ENSv1.           |
| `v1-wrapped`   | The name is held by the ENSv1 Name Wrapper.           |
| `v2-native`    | The name was created directly in ENSv2.               |
| `v2-migrated`  | The name migrated from ENSv1 to ENSv2.                |
| `v2-reserved`  | ENSv2 reserves the name for its existing ENSv1 owner. |

Every variant contains:

```ts
{
  name: NormalizedName;
  kind: NameState["kind"];
  protocol: "v1" | "v2";
  status: "available" | "active" | "grace" | "expired" | "reserved";
  wrapped: boolean;
  migrated: boolean;
  owner: EthereumAddress | null;
  manager: EthereumAddress | null;
  registrant: EthereumAddress | null;
  registry: EthereumAddress;
  resolver: EthereumAddress | null;
  expiry: bigint | null;
  gracePeriodEnd: bigint | null;
  tokenId: bigint | null;
  resource: bigint | null;
  available: boolean;
  renewable: boolean;
}
```

## Effect

```ts
const effect = getNameState.effect(config, { name: "example.eth" });
// Effect.Effect<NameState, GetNameStateError>
```

## Request

```ts
const request = getNameState.request({ name: "example.eth" });
```

## Error

```ts
import type { GetNameStateError } from "@ensforge/core";
```

Can fail with `NameError`, `RpcError`, `ContractError`, or `CodecError`.
