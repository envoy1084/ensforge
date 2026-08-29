---
title: Migration Helper
description: Focused, tree-shakable ABI fragments for Migration Helper.
---

# Migration Helper

Focused, tree-shakable ABI fragments for Migration Helper.

## Import

```ts
import {
  migrationHelperV2NameWrapperAbi,
  migrationHelperV2MigrateAbi,
} from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: migrationHelperV2NameWrapperAbi,
  client: publicClient,
});
```

## Exports

| Export                            | Description                                             |
| --------------------------------- | ------------------------------------------------------- |
| `migrationHelperV2NameWrapperAbi` | Immutable ABI value with viem-compatible literal types. |
| `migrationHelperV2MigrateAbi`     | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
