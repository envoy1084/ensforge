# Ensforge

Ensforge is an Effect-native TypeScript SDK for the Ethereum Name Service.

The repository contains the tooling foundation, a reusable package template, and the scaffold for
the contracts package. Protocol actions and React integrations will be added as complete vertical
slices.

## Requirements

- Node.js 24 or newer
- pnpm 11.10.0

## Getting started

```sh
pnpm install
pnpm check
```

## Workspace

```text
packages/
  contracts/   ENS contract ABIs, interfaces, and deployment metadata
  template/    Copy-ready starter for new packages
```

Klarity supplies the shared TypeScript, Oxfmt, Oxlint, tsdown, Vitest, Turbo, Lefthook, and
Commitlint configuration. Changesets manages publishable package versions.

See [`packages/template/README.md`](packages/template/README.md) before creating a package.

## License

Apache-2.0
