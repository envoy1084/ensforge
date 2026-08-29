---
title: analyzeName
description: Classify a normalized ENS name and derive its labels and parent.
---

# analyzeName

Returns structural information reused by registration, migration, and routing actions.

## Import

```ts
import { analyzeName } from "@ensforge/core";
```

## Usage

```ts
const analysis = analyzeName(normalizeName("sub.example.eth"));
```

## Parameters

### name

`NormalizedName`

Normalized name to classify.

## Return Type

`NameAnalysis`

Includes labels, label count, label, parent, TLD, `NameKind`, `.eth` flags, and the second-level
`.eth` label when present.
