# `@ensforge/core`

Type-safe actions and utilities for building ENS applications.

## Features

- Unified reads and writes across supported ENS deployments
- Automatic protocol and migration-state routing
- Names, records, registration, renewal, migration, wrapping, DNS, and reverse resolution
- Batched reads and wallet-aware write execution
- CCIP-Read support through viem
- Name normalization, hashing, DNS encoding, and record codecs
- Bring your own viem clients or Wagmi config

## Installation

```sh
pnpm add @ensforge/core effect@rc viem
```

## Overview

```ts
import { createConfig, getAddress, getOwner } from "@ensforge/core";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const config = createConfig({
  network: "mainnet",
  publicClient: createPublicClient({ chain: mainnet, transport: http() }),
});

const owner = await getOwner(config, { name: "ens.eth" });
const address = await getAddress(config, { name: "ens.eth" });
```

Every action uses the same config and returns typed results. Wagmi support is isolated in an
optional entrypoint, so viem-only applications do not need to install Wagmi:

```ts
import { createWagmiConfig } from "@ensforge/core/wagmi";

const config = createWagmiConfig({
  network: "mainnet",
  wagmiConfig,
});
```

Compose compatible reads into one request with `readBatch`:

```ts
import { getAvatar, readBatch } from "@ensforge/core";

const profile = await readBatch(config, {
  owner: getOwner.request({ name: "ens.eth" }),
  address: getAddress.request({ name: "ens.eth" }),
  avatar: getAvatar.request({ name: "ens.eth" }),
});
```

## License

Apache-2.0
