---
"@ensforge/core": minor
"@ensforge/sdk": minor
"@ensforge/react": minor
---

Add group-scoped Core and SDK type entrypoints, slim the SDK and React root type surfaces, and
resolve workspace packages through generated declarations to improve editor IntelliSense. Import
action-specific SDK types from `@ensforge/sdk/<group>`.

Wagmi integration now uses the optional `@ensforge/core/wagmi` and `@ensforge/sdk/wagmi`
entrypoints, so viem-only consumers no longer install Wagmi. Sequential write plans retain submitted
transaction hashes across confirmation failures and resume without resubmission. Deployment metadata
is aligned with ENSjs L1 client addresses.
