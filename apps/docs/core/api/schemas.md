---
title: Schemas
description: Runtime schemas and branded domain values exported by ensforge Core.
---

# Schemas

Core exports Effect Schemas for validated ENS domain values. Each schema also exposes its inferred
TypeScript type through `.Type`.

```ts
import { EthereumAddress, NormalizedName } from "@ensforge/core";
import { Schema } from "effect";

const name = Schema.decodeUnknownSync(NormalizedName)("ens.eth");
type NormalizedName = typeof NormalizedName.Type;
```

## Identity

| Schema                  | Value                                        |
| ----------------------- | -------------------------------------------- |
| `NormalizedName`        | ENSIP-15 normalized ENS name.                |
| `NormalizedLabel`       | ENSIP-15 normalized label.                   |
| `EthereumAddress`       | Checksummed or normalized EVM address.       |
| `CanonicalNameIdentity` | Canonical identity fields for a routed name. |

## Hashes and encoding

| Schema           | Value                         |
| ---------------- | ----------------------------- |
| `Hex`            | `0x`-prefixed hex data.       |
| `Bytes32`        | Exactly 32 bytes of hex data. |
| `Namehash`       | ENS namehash.                 |
| `Labelhash`      | ENS labelhash.                |
| `DnsEncodedName` | DNS wire-format name bytes.   |

## Records

| Schema                | Value                                  |
| --------------------- | -------------------------------------- |
| `CoinType`            | Non-negative SLIP-44 coin type.        |
| `AddressRecordData`   | Raw address record bytes.              |
| `ContentHash`         | Raw content hash bytes.                |
| `ContentHashProtocol` | Supported content-addressing protocol. |
| `AbiContentType`      | ENS ABI content type.                  |
| `AbiRecordData`       | Raw ABI record bytes.                  |
| `Abi`                 | JSON ABI value.                        |
| `InterfaceId`         | Four-byte ERC-165 interface ID.        |

## Protocol

`EnsProtocol` is `"v1" | "v2"`. `RegistryResource` represents an ENSv2 registry resource.

Schemas validate public boundaries. Actions return branded values so invalid addresses, hashes, and
normalized names cannot be confused with unvalidated strings without an explicit conversion.
