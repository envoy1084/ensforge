# ensforge

Type-safe tools for reading, writing, and building applications on ENS.

## Features

- Unified ENS actions across supported deployments and migration states
- Names, resolver records, registration, renewals, migration, wrapping, DNS, and reverse resolution
- Automatic contract routing with typed results and errors
- Batched reads and wallet-aware write workflows
- Bring your own viem clients or Wagmi config
- Framework-independent actions, a grouped SDK client, and reactive React hooks

## Packages

| Package                                                 | Description                                                |
| ------------------------------------------------------- | ---------------------------------------------------------- |
| [`@ensforge/contracts`](./packages/contracts/README.md) | Contract ABIs, deployment addresses, and shared interfaces |
| [`@ensforge/core`](./packages/core/README.md)           | Framework-independent ENS actions and utilities            |
| [`@ensforge/sdk`](./packages/sdk/README.md)             | Config-bound client with actions grouped by capability     |
| [`@ensforge/react`](./packages/react/README.md)         | Providers, queries, mutations, and cache primitives        |

## Quick start

Install the high-level SDK:

```sh
pnpm add @ensforge/sdk effect@rc viem
```

Create a client and call any grouped action:

```ts
import { Ensforge } from "@ensforge/sdk";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const sdk = new Ensforge({
  network: "mainnet",
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});

const owner = await sdk.name.getOwner({ name: "ens.eth" });
const avatar = await sdk.records.getAvatar({ name: "ens.eth" });
```

Use `@ensforge/core` when you prefer standalone actions:

```ts
import { createConfig, getAddress, getOwner, readBatch } from "@ensforge/core";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const publicClient = createPublicClient({ chain: mainnet, transport: http() });
const config = createConfig({ network: "mainnet", publicClient });

const profile = await readBatch(config, {
  owner: getOwner.request({ name: "ens.eth" }),
  address: getAddress.request({ name: "ens.eth" }),
});
```

For React applications, pass an SDK instance or the same configuration to `EnsforgeProvider` and
use typed hooks:

```tsx
import { EnsforgeProvider, useOwner } from "@ensforge/react";

const Profile = () => {
  const owner = useOwner({ name: "ens.eth" });
  return <span>{owner.data?.owner}</span>;
};

const App = () => (
  <EnsforgeProvider sdk={sdk}>
    <Profile />
  </EnsforgeProvider>
);
```

## Repository

The monorepo also contains private development packages:

```text
packages/
  test-env/    Private deterministic ENS integration environment
  template/    Starter for future packages
```

## Development

Requires Node.js 24+ and pnpm 11.10.0.

```sh
pnpm install
pnpm build
pnpm check
```

`pnpm check:sdk-types` compiles a representative SDK consumer and enforces declaration,
instantiation, and memory budgets for the public type surface.

Package boundaries resolve through generated declarations during editor and type-checking sessions.
Run `pnpm build` after cloning, or keep `pnpm dev` running while changing multiple packages, so
downstream packages see current declarations without loading every dependency's source graph.

## License

Apache-2.0
