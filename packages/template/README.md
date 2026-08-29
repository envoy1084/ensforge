# ensforge package template

Copy this directory when starting an ensforge package, then:

1. Rename the directory and replace `@ensforge/template` in `package.json` and the smoke test.
2. Replace the package description and this README with its real ownership boundary.
3. Remove `"private": true` only when the package is ready to publish.
4. Add the package to Changesets once it exposes a supported public API.

## Commands

```sh
pnpm --filter @ensforge/template typecheck
pnpm --filter @ensforge/template test
pnpm --filter @ensforge/template build
pnpm --filter @ensforge/template pack:check
```
