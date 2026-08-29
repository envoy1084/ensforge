---
title: Errors
description: Tagged error classes and stable error codes exported by Ensforge Core.
---

# Errors

Every expected Core failure belongs to a tagged error family. Match `_tag` for the family and `code`
for a stable machine-readable condition.

```ts
program.pipe(
  Effect.catchTag("NameError", (error) => {
    if (error.code === "INVALID_NAME") return Effect.succeed(null);
    return Effect.fail(error);
  }),
);
```

## Error classes

| Class                | Code schema              | Responsibility                                         |
| -------------------- | ------------------------ | ------------------------------------------------------ |
| `ConfigError`        | `ConfigErrorCode`        | Network, client, deployment, and option validation.    |
| `NameError`          | `NameErrorCode`          | Name and label normalization.                          |
| `CodecError`         | `CodecErrorCode`         | Address, content hash, ABI, DNS, and record encoding.  |
| `RpcError`           | `RpcErrorCode`           | Ethereum RPC transport and response failures.          |
| `ContractError`      | `ContractErrorCode`      | Contract encoding, reverts, and result decoding.       |
| `GatewayError`       | `GatewayErrorCode`       | External HTTP resource policy and transport failures.  |
| `AuthorizationError` | `AuthorizationErrorCode` | Missing ownership, approvals, or roles.                |
| `WalletError`        | `WalletErrorCode`        | Wallet availability, capabilities, and user rejection. |
| `TransactionError`   | `TransactionErrorCode`   | Submission, receipt, and confirmation failures.        |
| `WritePlanError`     | `WritePlanErrorCode`     | Invalid, mismatched, or failed staged write plans.     |
| `RegistrationError`  | `RegistrationErrorCode`  | Registration state and workflow failures.              |
| `RenewalError`       | `RenewalErrorCode`       | Renewal state, pricing, and workflow failures.         |
| `MigrationError`     | `MigrationErrorCode`     | Migration eligibility and workflow failures.           |
| `DnsImportError`     | `DnsImportErrorCode`     | DNSSEC proof and import failures.                      |
| `ReverseNameError`   | `ReverseNameErrorCode`   | Reverse-name validation and verification failures.     |

## Cause

Errors retain the original `cause` when it is safe and useful. Use it for diagnostics, not control
flow. Client-library messages and nested error shapes can change independently of Ensforge.

See [Error Handling](/core/guides/error-handling) for Promise and Effect examples.
