---
title: Universal Signature Validator
description: ENSv2 interface definitions for Universal Signature Validator.
---

# Universal Signature Validator

ENSv2 interface definitions for Universal Signature Validator.

## Import

```ts
import { universalSignatureValidatorV2InterfaceAbi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: universalSignatureValidatorV2InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                                      | Description                                             |
| ------------------------------------------- | ------------------------------------------------------- |
| `universalSignatureValidatorV2InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
