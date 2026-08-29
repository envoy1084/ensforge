---
title: Getting Started
description: Read ENS contracts directly with typed deployments and ABI fragments.
---

# Getting Started

Import a deployment and the smallest ABI fragment required by the call. Deployment objects keep the
chain, support status, contract addresses, and source commit together.

::: code-group

```ts [owner.ts]
import { mainnetV1Deployment } from "@ensforge/contracts/deployments";
import { ensRegistryV1OwnerAbi } from "@ensforge/contracts/v1";
import { namehash } from "viem/ens";
import { publicClient } from "./client";

const owner = await publicClient.readContract({
  address: mainnetV1Deployment.contracts.registry,
  abi: ensRegistryV1OwnerAbi,
  functionName: "owner",
  args: [namehash("ens.eth")],
});
```

<<< @/snippets/contracts/client.ts

:::

Because fragments are exported `as const`, viem infers `functionName`, `args`, and the returned
address from the selected ABI.

Use a complete ABI when the caller needs several unrelated functions or event decoding.

```ts
import { ensRegistryV1Abi } from "@ensforge/contracts/v1";
```

Focused fragments include the custom errors needed to decode relevant reverts. They are grouped by
contract capability so importing one action does not retain every ENS contract definition.

## Select a deployment

```ts
import {
  mainnetV1Deployment,
  sepoliaV1Deployment,
  sepoliaV2Deployment,
} from "@ensforge/contracts/deployments";
```

Do not mix a deployment object with a client connected to another chain. ENSv2 addresses are grouped
into public contracts, implementations, migration contracts, infrastructure, and optional
experimental or test-token contracts.

## Next steps

- Choose a focused [entrypoint](/contracts/guides/entrypoints).
- Learn when to use [ABI fragments](/contracts/guides/fragments).
- Inspect [deployment provenance](/contracts/guides/deployments).
- Compose [resolver profiles](/contracts/guides/resolver-profiles).
