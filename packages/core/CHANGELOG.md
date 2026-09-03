# @ensforge/core

## 0.3.0

### Minor Changes

- ab3b407: Add relation-aware address discovery, indexed resolved-name lookup, name search, cross-protocol
  subname pagination, evidence-based encoded-label recovery, record inventories, and resolver-record
  history to the indexer entrypoints. Add cross-protocol registration discovery and unified semantic
  name/event history with focused registration history queries. Add V2 registry, namespace
  relationship, and role-assignment discovery.
  Add cross-protocol resolver details plus V2 resolver ownership, ENSIP-16 metadata, and delegate
  approval discovery.
  Use the newer ENS staging GraphQL deployment for Sepolia V2 discovery and validate live coverage
  against the indexed `ensforge-smoke.eth` fixture hierarchy.
  Keep registration feeds server-filterable, require bounded resolver-approval selectors, default
  address discovery to effective ownership, and push registry role resource filters into the V2
  connection. Require a name anchor for semantic event kinds that the V2 indexer cannot filter by
  wire event type.
- 67227c2: Add the ENS indexer configuration and GraphQL transport foundation, including network-aware source
  defaults, lazy authentication headers, request cancellation, timeouts, transient retries, and typed
  indexer errors through the isolated `@ensforge/core/indexer` entrypoint.
  Use Effect's fetch HTTP client for indexer requests and emit generated operations as typed query
  strings so consumers do not install GraphQL transport or runtime packages.
- 2448cb6: Add stable Schema-backed indexed-name models, portable name filters and ordering, protocol-aware V1
  and V2 normalization, versioned multi-source cursors, and deterministic cross-indexer page merging.
- 722707f: Add `getIndexedName` and cursor-paginated `getNames` actions with generated V1/V2 queries,
  protocol-neutral models, V2-preferred routing, cross-source deduplication, and partial-source status.
- 7f43949: Add generated ENSv1 and ENSv2 indexer operations and the protocol-neutral `getIndexerStatus` action,
  including source health, indexed block metadata, explicit unavailable or disabled states, and safe
  per-source failures.

### Patch Changes

- 1f829bd: Support Wagmi 2.19 and 3.x, including RainbowKit applications, and point package homepages to
  ensforge.com.
- Updated dependencies [1f829bd]
  - @ensforge/contracts@0.3.0

## 0.2.0

### Minor Changes

- 94e55fe: Align the Sepolia ENSv2 deployment, contract interfaces, initializer fragments, interface IDs, and
  renewal execution with the contracts deployed from the pinned July source snapshot. Remove
  forward-looking interface and contract-batch renewal exports that are not available onchain.
- a5f4353: Add group-scoped Core and SDK type entrypoints, slim the SDK and React root type surfaces, and
  resolve workspace packages through generated declarations to improve editor IntelliSense. Import
  action-specific SDK types from `@ensforge/sdk/<group>`.

  Wagmi integration now uses the optional `@ensforge/core/wagmi` and `@ensforge/sdk/wagmi`
  entrypoints, so viem-only consumers no longer install Wagmi. Sequential write plans retain submitted
  transaction hashes across confirmation failures and resume without resubmission.

### Patch Changes

- Updated dependencies [94e55fe]
  - @ensforge/contracts@0.2.0

## 0.1.1

### Patch Changes

- @ensforge/contracts@0.1.1

## 0.1.0

### Minor Changes

- 4f93c0d: Release the initial production-ready ensforge packages.

### Patch Changes

- Updated dependencies [4f93c0d]
  - @ensforge/contracts@0.1.0
