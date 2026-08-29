---
title: Resolver Profiles
description: Compose the record interfaces supported by ENS resolvers.
---

# Resolver Profiles

A resolver profile is a focused ABI for one record family. Profiles let applications describe the
capability they need without importing a complete resolver ABI.

Available profiles cover addresses, text, content hashes, names, public keys, interfaces, ABI data,
arbitrary data, DNS records, DNS zones, multicall, extended resolution, and record versioning.

```ts
import { textResolverAbi } from "@ensforge/contracts/resolver-profiles";

const text = await publicClient.readContract({
  address: resolver,
  abi: textResolverAbi,
  functionName: "text",
  args: [node, "url"],
});
```

Profiles describe contract interfaces; they do not discover the resolver or perform CCIP Read. Use
Core record actions when you want those behaviors handled automatically.
