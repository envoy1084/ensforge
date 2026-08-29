---
title: Config
description: Configure reads, writes, gateways, clients, and networks in Ensforge Core.
---

# Config

`EnsforgeConfig` is a single-network, immutable runtime configuration. Create it with
[`createConfig`](/core/api/create-config).

## Network

```ts
type EnsNetwork = "mainnet" | "sepolia";
```

The network selects both the expected chain ID and the deployment profile. Ensforge rejects clients
connected to a different chain instead of silently reading the wrong deployment.

## Clients

Choose one client mode.

### viem clients

```ts
createConfig({
  network: "mainnet",
  publicClient,
  walletClient,
});
```

`publicClient` is required. `walletClient` is optional until a write needs it.

### Wagmi config

```ts
createConfig({
  network: "mainnet",
  wagmiConfig,
});
```

The public client is selected when the config is created. The wallet client is resolved at write
time so it follows the current Wagmi connection.

## Reads

```ts
interface ReadOptions {
  concurrency?: number;
  multicallBatchSize?: number;
}
```

| Option               | Default | Description                                           |
| -------------------- | ------: | ----------------------------------------------------- |
| `concurrency`        |     `8` | Maximum concurrent operations used by read executors. |
| `multicallBatchSize` |  `1024` | Maximum calls placed in one Multicall request.        |

Both values must be positive integers.

## Writes

```ts
interface WriteOptions {
  simulation?: "required" | "skip";
  confirmation?:
    { type: "submitted" } | { type: "confirmed"; confirmations?: number; timeout?: number };
  statusRetries?: number;
}
```

| Option          | Default                 | Description                                                               |
| --------------- | ----------------------- | ------------------------------------------------------------------------- |
| `simulation`    | `"required"`            | Simulates prepared calls before requesting wallet execution.              |
| `confirmation`  | `{ type: "confirmed" }` | Waits for a confirmed receipt unless configured otherwise.                |
| `statusRetries` | `0`                     | Number of additional wallet call-status checks after a transient failure. |

Skipping simulation removes a useful contract-revert check. Use it only when another part of your
application already simulates the exact call.

## Gateways

```ts
interface GatewayOptions {
  allowedHosts?: ReadonlyArray<string>;
  deniedHosts?: ReadonlyArray<string>;
  timeout?: number;
  maxResponseSize?: number;
  maxRedirects?: number;
}
```

| Option            |   Default | Description                                      |
| ----------------- | --------: | ------------------------------------------------ |
| `allowedHosts`    | all hosts | Optional allowlist for outbound HTTP resources.  |
| `deniedHosts`     |      `[]` | Hosts that must never be requested.              |
| `timeout`         |   `10000` | Request timeout in milliseconds.                 |
| `maxResponseSize` | `1048576` | Maximum response size in bytes.                  |
| `maxRedirects`    |       `3` | Maximum redirects followed by a gateway request. |

Use an allowlist when resolving user-controlled resources in a server environment with access to
private networks.

## Resolved config

```ts
interface EnsforgeConfig {
  readonly network: EnsNetwork;
  readonly chainId: 1 | 11155111;
  readonly publicClient: PublicClient;
  readonly walletClient?: WalletClient;
  readonly reads: ResolvedReadOptions;
  readonly writes: ResolvedWriteOptions;
  readonly gateways: ResolvedGatewayOptions;
  readonly deployments: EnsDeploymentProfile;
}
```

Treat the result as an opaque action dependency. Reading its resolved options and deployment profile
is supported; constructing it by hand is not.
