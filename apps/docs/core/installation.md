---
title: Installation
description: Install Ensforge Core and its peer dependencies.
---

# Installation

Install `@ensforge/core` with Effect and the Ethereum client you use.

::: code-group

```sh [pnpm]
pnpm add @ensforge/core effect viem
```

```sh [npm]
npm install @ensforge/core effect viem
```

```sh [yarn]
yarn add @ensforge/core effect viem
```

```sh [bun]
bun add @ensforge/core effect viem
```

:::

## Requirements

- Node.js 20 or newer for server-side applications and tooling
- A modern browser for browser applications
- A viem `PublicClient`, or a Wagmi `Config`
- A `WalletClient` or connected Wagmi account for writes

Wagmi is only required when you pass a Wagmi config to `createConfig`.

```sh
pnpm add wagmi
```

## Importing

All public Core APIs are available from the package entrypoint.

```ts
import { createConfig, getOwner, readBatch } from "@ensforge/core";
```

Ensforge is ESM-only and fully typed. No TypeScript plugin or code generation step is required.

## Next steps

Create your first configuration in [Getting Started](/core/getting-started).
