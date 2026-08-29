---
title: ABI Fragments
description: Use focused ABI fragments for tree-shakable contract calls.
---

# ABI Fragments

A focused fragment contains the function or event needed by one capability plus the custom errors
required to decode relevant reverts.

```ts
import { ensRegistryV1OwnerAbi } from "@ensforge/contracts/v1";

await publicClient.readContract({
  address: deployment.contracts.registry,
  abi: ensRegistryV1OwnerAbi,
  functionName: "owner",
  args: [node],
});
```

Use a complete ABI when building a contract explorer, decoding many event families, or interacting
with several unrelated functions from the same contract.

Fragments are immutable `as const` values and retain viem's function-name, argument, and result
inference.
