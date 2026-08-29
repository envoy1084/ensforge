---
title: Grouped Actions
description: Navigate the capability groups on an Ensforge SDK instance.
---

# Grouped Actions

The SDK binds one Core config and organizes all actions by ENS capability.

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

Groups are immutable. Methods retain `.effect`, `.request`, `.call`, and `.stream` extensions from
their Core action where applicable.
