---
title: Name Wrapper
description: Focused, tree-shakable ABI fragments for Name Wrapper.
---

# Name Wrapper

Focused, tree-shakable ABI fragments for Name Wrapper.

## Import

```ts
import {
  nameWrapperV1ApproveAbi,
  nameWrapperV1CanExtendSubnamesAbi,
  nameWrapperV1CanModifyNameAbi,
  nameWrapperV1ExtendExpiryAbi,
  nameWrapperV1GetApprovedAbi,
  nameWrapperV1GetDataAbi,
  nameWrapperV1IsApprovedForAllAbi,
  nameWrapperV1IsWrappedAbi,
  nameWrapperV1OwnerOfAbi,
  nameWrapperV1SafeTransferFromAbi,
  nameWrapperV1SetChildFusesAbi,
  nameWrapperV1SetFusesAbi,
  nameWrapperV1SetResolverAbi,
  nameWrapperV1SetSubnodeOwnerAbi,
  nameWrapperV1SetSubnodeRecordAbi,
  nameWrapperV1SetTTLAbi,
  nameWrapperV1UnwrapAbi,
  nameWrapperV1UnwrapETH2LDAbi,
  nameWrapperV1WrapAbi,
  nameWrapperV1WrapETH2LDAbi,
} from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: nameWrapperV1ApproveAbi,
  client: publicClient,
});
```

## Exports

| Export                              | Description                                             |
| ----------------------------------- | ------------------------------------------------------- |
| `nameWrapperV1ApproveAbi`           | Immutable ABI value with viem-compatible literal types. |
| `nameWrapperV1CanExtendSubnamesAbi` | Immutable ABI value with viem-compatible literal types. |
| `nameWrapperV1CanModifyNameAbi`     | Immutable ABI value with viem-compatible literal types. |
| `nameWrapperV1ExtendExpiryAbi`      | Immutable ABI value with viem-compatible literal types. |
| `nameWrapperV1GetApprovedAbi`       | Immutable ABI value with viem-compatible literal types. |
| `nameWrapperV1GetDataAbi`           | Immutable ABI value with viem-compatible literal types. |
| `nameWrapperV1IsApprovedForAllAbi`  | Immutable ABI value with viem-compatible literal types. |
| `nameWrapperV1IsWrappedAbi`         | Immutable ABI value with viem-compatible literal types. |
| `nameWrapperV1OwnerOfAbi`           | Immutable ABI value with viem-compatible literal types. |
| `nameWrapperV1SafeTransferFromAbi`  | Immutable ABI value with viem-compatible literal types. |
| `nameWrapperV1SetChildFusesAbi`     | Immutable ABI value with viem-compatible literal types. |
| `nameWrapperV1SetFusesAbi`          | Immutable ABI value with viem-compatible literal types. |
| `nameWrapperV1SetResolverAbi`       | Immutable ABI value with viem-compatible literal types. |
| `nameWrapperV1SetSubnodeOwnerAbi`   | Immutable ABI value with viem-compatible literal types. |
| `nameWrapperV1SetSubnodeRecordAbi`  | Immutable ABI value with viem-compatible literal types. |
| `nameWrapperV1SetTTLAbi`            | Immutable ABI value with viem-compatible literal types. |
| `nameWrapperV1UnwrapAbi`            | Immutable ABI value with viem-compatible literal types. |
| `nameWrapperV1UnwrapETH2LDAbi`      | Immutable ABI value with viem-compatible literal types. |
| `nameWrapperV1WrapAbi`              | Immutable ABI value with viem-compatible literal types. |
| `nameWrapperV1WrapETH2LDAbi`        | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
