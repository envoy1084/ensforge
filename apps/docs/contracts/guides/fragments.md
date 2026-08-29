---
title: ABI Fragments
description: Use focused ABI fragments for tree-shakable contract calls.
---

# ABI Fragments

A focused fragment contains the function or event needed by one capability plus the custom errors
required to decode relevant reverts.

::: code-group

```ts [owner.ts]
import { ensRegistryV1OwnerAbi } from "@ensforge/contracts/v1";
import { mainnetV1Deployment } from "@ensforge/contracts/deployments";
import { publicClient } from "./client";

await publicClient.readContract({
  address: mainnetV1Deployment.contracts.registry,
  abi: ensRegistryV1OwnerAbi,
  functionName: "owner",
  args: [node],
});
```

<<< @/snippets/contracts/client.ts

:::

Use a complete ABI when building a contract explorer, decoding many event families, or interacting
with several unrelated functions from the same contract.

Fragments are immutable `as const` values and retain viem's function-name, argument, and result
inference.

## Compose fragments

Combine focused fragments locally when one call site needs a small set of related capabilities.

```ts
import { ensRegistryV1OwnerAbi, ensRegistryV1ResolverAbi } from "@ensforge/contracts/v1";

const registryReadAbi = [...ensRegistryV1OwnerAbi, ...ensRegistryV1ResolverAbi] as const;
```

Keep the composition close to the consumer. Re-exporting a large aggregate ABI from a shared module
can make it harder for a bundler to remove unused fragments.

## Errors

Action fragments include relevant custom error definitions alongside the selected function. This
lets viem decode contract reverts without retaining the contract's complete ABI.
