---
title: labelhash
description: Compute the keccak256 labelhash of an ENS label.
---

# labelhash

Computes the keccak256 hash of one ENS label.

## Import

```ts
import { labelhash } from "@ensforge/core";
```

## Usage

```ts
const tokenLabel = labelhash("ens");
```

## Parameters

### label

`string | NormalizedLabel`

Label to hash.

## Return Type

`Labelhash`
