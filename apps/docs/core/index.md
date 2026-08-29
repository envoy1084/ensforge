---
title: Core
description: Framework-independent actions and utilities for ENS.
---

# Core

Framework-independent actions and utilities for ENS.

Core is the lowest-level Ensforge package. It gives you standalone Promise APIs, typed Effect APIs,
batchable read requests, write plans, name utilities, schemas, and errors without requiring a UI
framework.

```ts
import { getOwner } from "@ensforge/core";

const owner = await getOwner(config, { name: "ens.eth" });
```

Start with [Why Ensforge](/core/why), or go directly to [Getting Started](/core/getting-started).
