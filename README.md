# Ensforge

Effect-native ENS SDK for TypeScript, with Promise APIs for applications that do not use Effect
directly. Ensforge targets ENSv2 while preserving the ENSv1 and migration behavior applications need.

## Workspace

```text
packages/
  contracts/   ENSv1/ENSv2 ABIs, interfaces, constants, and deployments
  core/        Semantic ENS actions with Promise and Effect APIs
  test-env/    Private deterministic ENS integration environment
  template/    Starter for future packages
```

## Development

Requires Node.js 24+ and pnpm 11.10.0.

```sh
pnpm install
pnpm check
```

## License

Apache-2.0
