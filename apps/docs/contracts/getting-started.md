---
title: Getting Started
description: Read ENS contracts directly with typed deployments and ABI fragments.
---

# Getting Started

Import a deployment and the smallest ABI fragment required by the call.

```ts
import { mainnetV1Deployment } from "@ensforge/contracts/deployments";
import { ensRegistryV1OwnerAbi } from "@ensforge/contracts/v1";
import { namehash } from "viem/ens";

const owner = await publicClient.readContract({
  address: mainnetV1Deployment.contracts.registry,
  abi: ensRegistryV1OwnerAbi,
  functionName: "owner",
  args: [namehash("ens.eth")],
});
```

Use a complete ABI when the caller needs several unrelated functions or event decoding.

```ts
import { ensRegistryV1Abi } from "@ensforge/contracts/v1";
```

Focused fragments include the custom errors needed to decode relevant reverts. They are grouped by
contract capability so importing one action does not retain every ENS contract definition.
