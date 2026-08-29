---
title: Error Handling
description: Handle typed ensforge errors with Promise and Effect APIs.
---

# Error Handling

ensforge translates client, contract, codec, and workflow failures into a small set of tagged domain
errors. Each error includes a stable uppercase `code`, a readable `message`, and the original `cause`
when one is available.

## Effect

The `.effect` interface keeps expected errors in the Effect error channel.

```ts
import { Effect } from "effect";
import { getOwner } from "@ensforge/core";

const program = getOwner.effect(config, { name: input }).pipe(
  Effect.catchTags({
    NameError: (error) => Effect.succeed({ kind: "invalid-name" as const, message: error.message }),
    RpcError: (error) =>
      Effect.succeed({ kind: "rpc-unavailable" as const, message: error.message }),
  }),
);
```

Use `_tag` for the broad error family and `code` for a specific condition.

```ts
Effect.catchTag("ContractError", (error) => {
  if (error.code === "REVERTED") return Effect.succeed(null);
  return Effect.fail(error);
});
```

## Promise

Promise actions reject with the same error objects.

```ts
import { NameError, getOwner } from "@ensforge/core";

try {
  const owner = await getOwner(config, { name: input });
} catch (error) {
  if (error instanceof NameError) {
    console.error(error.code, error.message);
  }
}
```

## Error families

| Error                | Meaning                                                                            |
| -------------------- | ---------------------------------------------------------------------------------- |
| `NameError`          | The supplied name or label cannot be normalized or used by the action.             |
| `ConfigError`        | The selected network, clients, or options are invalid.                             |
| `RpcError`           | An RPC request failed before a contract result was available.                      |
| `ContractError`      | Contract encoding, execution, or decoding failed.                                  |
| `CodecError`         | An ENS record could not be encoded or decoded.                                     |
| `AuthorizationError` | The account does not have the permission required for a write.                     |
| `WalletError`        | A wallet is unavailable, rejected a request, or lacks a required capability.       |
| `TransactionError`   | Submission or confirmation failed.                                                 |
| `RegistrationError`  | A registration step or precondition failed.                                        |
| `RenewalError`       | A renewal step or precondition failed.                                             |
| `MigrationError`     | A migration step or precondition failed.                                           |
| `DnsImportError`     | DNSSEC proof discovery or DNS import failed.                                       |
| `GatewayError`       | An external content or metadata gateway request failed policy or transport checks. |
| `WritePlanError`     | A staged write plan is invalid or cannot be resumed.                               |

Do not parse error messages. Match `_tag` and `code`; messages are intended for logs and developer
interfaces and may become more specific over time.
