# Ensforge

Ensforge is an Effect-native TypeScript SDK for the Ethereum Name Service.

The repository currently contains the tooling foundation and a tested package template. Protocol
actions, contract profiles, and React integrations can be added from that template as complete
vertical slices.

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
  template/    Copy-ready starter for new packages
```

Klarity supplies the shared TypeScript, Oxfmt, Oxlint, tsdown, Vitest, Turbo, Lefthook, and
Commitlint configuration. Changesets manages publishable package versions.

See [`packages/template/README.md`](packages/template/README.md) before creating a package.

## License

Apache-2.0
