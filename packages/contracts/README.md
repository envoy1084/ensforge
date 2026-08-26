# `@ensforge/contracts`

Versioned ENS contract ABIs, interfaces, deployment addresses, and artifact provenance for
Ensforge.

The package is runtime-neutral and publishes ESM compatible with Node.js and browser bundlers. It
will contain protocol data only; Effect services, actions, wallet integration, and V1/V2 state
routing belong in `@ensforge/core`.

The package is private while its initial contract surface is being implemented.

## Commands

```sh
pnpm --filter @ensforge/contracts build
pnpm --filter @ensforge/contracts dev
pnpm --filter @ensforge/contracts lint
pnpm --filter @ensforge/contracts typecheck
pnpm --filter @ensforge/contracts test
pnpm --filter @ensforge/contracts pack:check
```
