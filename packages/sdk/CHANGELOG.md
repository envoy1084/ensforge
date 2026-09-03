# @ensforge/sdk

## 0.3.0

### Minor Changes

- 2f7b053: Expose all indexer actions through the grouped SDK and add Effect Atom query and Suspense hooks for
  the complete indexer surface.

### Patch Changes

- 1f829bd: Support Wagmi 2.19 and 3.x, including RainbowKit applications, and point package homepages to
  ensforge.com.
- Updated dependencies [ab3b407]
- Updated dependencies [67227c2]
- Updated dependencies [2448cb6]
- Updated dependencies [722707f]
- Updated dependencies [7f43949]
- Updated dependencies [1f829bd]
  - @ensforge/core@0.3.0

## 0.2.0

### Minor Changes

- a5f4353: Add group-scoped Core and SDK type entrypoints, slim the SDK and React root type surfaces, and
  resolve workspace packages through generated declarations to improve editor IntelliSense. Import
  action-specific SDK types from `@ensforge/sdk/<group>`.

  Wagmi integration now uses the optional `@ensforge/core/wagmi` and `@ensforge/sdk/wagmi`
  entrypoints, so viem-only consumers no longer install Wagmi. Sequential write plans retain submitted
  transaction hashes across confirmation failures and resume without resubmission.

### Patch Changes

- Updated dependencies [94e55fe]
- Updated dependencies [a5f4353]
  - @ensforge/core@0.2.0

## 0.1.1

### Patch Changes

- @ensforge/core@0.1.1

## 0.1.0

### Minor Changes

- 4f93c0d: Release the initial production-ready ensforge packages.

### Patch Changes

- Updated dependencies [4f93c0d]
  - @ensforge/core@0.1.0
