# `@ensforge/core`

Effect-native ENS actions and workflows for JavaScript and TypeScript, with Promise APIs for
applications that do not use Effect directly.

The package is framework-independent and works in Node.js and browser bundlers. It owns ENS name
state, V1/V2 routing, typed failures, reads, writes, batching, and workflows while delegating
Ethereum clients, transports, ABI encoding, contract simulation, and wallet actions to viem.

`@ensforge/contracts` provides the versioned ENS ABIs and deployment metadata consumed by this
package. React providers and hooks belong in the future `@ensforge/react` package.

The package is private while its initial configuration and action APIs are being implemented.

## Planned API convention

Finite asynchronous actions will expose one Promise-callable symbol with the canonical Effect on a
readonly `.effect` property:

```ts
const owner = await getOwner(config, { name: "example.eth" });
const owner = yield * getOwner.effect(config, { name: "example.eth" });
```

Batchable reads will expose `.request(parameters)`, and explicitly batchable writes will expose
`.call(parameters)`. No domain actions are exported by the scaffold phase.

## Commands

```sh
pnpm --filter @ensforge/core lint
pnpm --filter @ensforge/core typecheck
pnpm --filter @ensforge/core test
pnpm --filter @ensforge/core build
pnpm --filter @ensforge/core pack:check
```
