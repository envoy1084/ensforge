---
title: Grouped Actions
description: Navigate capability groups on an ensforge SDK instance.
---

# Grouped Actions

The SDK binds one Core config and organizes actions by ENS capability. Grouping keeps discovery
predictable without changing action behavior or result types.

| Group          | Responsibility                                                             |
| -------------- | -------------------------------------------------------------------------- |
| `batch`        | Typed read batching, call preparation, simulation, submission, and resume. |
| `capabilities` | Contract support, approvals, roles, permissions, and write targets.        |
| `dns`          | DNS records, DNSSEC claims, and imports.                                   |
| `events`       | Event queries, history, and watchers.                                      |
| `migration`    | ENSv1 to ENSv2 eligibility, planning, approval, and execution.             |
| `name`         | Ownership, lifecycle, protocol, registry, and composed state.              |
| `ownership`    | Manager, registrant, TTL, reclaim, and transfers.                          |
| `permissions`  | Approvals and scoped registry or resolver roles.                           |
| `records`      | Resolver record reads and writes.                                          |
| `registration` | Commitments, pricing, registration, and renewal.                           |
| `resolution`   | Resolver discovery, Universal Resolver calls, and resolver lifecycle.      |
| `reverse`      | Primary names and reverse records.                                         |
| `subnames`     | Subname creation, updates, expiry, transfer, and deletion.                 |
| `wrapping`     | Wrapping, unwrapping, fuses, and wrapper expiry.                           |

## Read across groups

::: code-group

```ts [profile.ts]
import { sdk } from "./client";

const state = await sdk.name.getNameState({ name: "sdk.eth" });
const resolver = await sdk.resolution.getResolver({ name: "sdk.eth" });
const avatar = await sdk.records.getAvatar({ name: "sdk.eth" });
```

<<< @/snippets/sdk/client.ts[client.ts]

:::

Use `name` for registration and ownership state, `resolution` for resolver infrastructure, and
`records` for data stored by a resolver.

## Retained action interfaces

Binding configuration does not remove the additional Core interfaces:

```ts
const effect = sdk.records.getAddress.effect({ name });
const request = sdk.records.getAddress.request({ name });
const call = sdk.records.setText.call({ name, key: "url", value });
const stream = sdk.events.watchEnsEvents.stream({ name });
```

- `.effect` returns the typed Effect.
- `.request` prepares a read for `readBatch`.
- `.call` prepares a write for wallet batching.
- `.stream` exposes event watchers as an Effect Stream.

The method path and Core action always share the same parameter, result, and error contracts.
