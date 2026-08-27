# `@ensforge/core`

Effect-native ENS actions and workflows for JavaScript and TypeScript, with Promise APIs for
applications that do not use Effect directly.

The package is framework-independent and works in Node.js and browser bundlers. It owns ENS name
state, V1/V2 routing, typed failures, reads, writes, batching, and workflows while delegating
Ethereum clients, transports, ABI encoding, contract simulation, and wallet actions to viem.

`@ensforge/contracts` provides the versioned ENS ABIs and deployment metadata consumed by this
package. React providers and hooks belong in the future `@ensforge/react` package.

The package is private while its initial configuration and action APIs are being implemented.

## Configuration

One config targets one authoritative ENS network. Its discriminated deployment profile describes
which protocol generations are available: mainnet is currently `v1`, while Sepolia is
`v2-transition` with both V1 and V2 deployments. The profile does not choose a contract for a
particular name; later action routing will inspect that name's state before selecting V1 or V2.

```ts
import { createConfig } from "@ensforge/core";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

const config = createConfig({
  network: "sepolia",
  publicClient: createPublicClient({
    chain: sepolia,
    transport: http(),
  }),
});

config.deployments.phase; // "v2-transition"
```

An optional chain-matched wallet client may be supplied for scripts. React integrations pass the
currently connected wallet as a write-action override so changing connections does not rebuild the
core config. `createConfig` performs no RPC requests and preserves the supplied client identities.

## API convention

Finite asynchronous actions expose one Promise-callable symbol with the canonical Effect on a
readonly `.effect` property:

```ts
const owner = await getOwner(config, { name: "example.eth" });
const ownerEffect = yield * getOwner.effect(config, { name: "example.eth" });
```

Batchable reads expose pure `.request(parameters)` descriptors, and explicitly batchable writes
expose pure `.call(parameters)` intents. Constructing either value performs no I/O.

## Names and records

Pure ENS operations are synchronous and return Schema-branded domain values:

```ts
import {
  NormalizedName,
  decodeAddressRecord,
  dnsEncodeName,
  encodeAddressRecord,
  namehash,
  normalizeName,
} from "@ensforge/core";

const name: NormalizedName = normalizeName("Example.eth");
const node = namehash(name);
const dnsName = dnsEncodeName(name);

const addressData = encodeAddressRecord({
  coinType: 60n,
  address: "0x0000000000000000000000000000000000000001",
});
const address = decodeAddressRecord({ coinType: 60n, data: addressData });
```

Record decoders return `null` for the empty `0x` value used by resolvers to represent an unset
record.

Schemas and their types deliberately share a name:

```ts
import { NormalizedName } from "@ensforge/core";

type NormalizedNameValue = typeof NormalizedName.Type;
```

Viem supplies ENS normalization, hashing, DNS encoding, and coin-type primitives. Official ENS
packages supply multichain address and contenthash codecs. Ensforge adds stable branded outputs,
strict composition, and `NameError` or `CodecError` boundaries.

## Commands

```sh
pnpm --filter @ensforge/core lint
pnpm --filter @ensforge/core typecheck
pnpm --filter @ensforge/core test
pnpm --filter @ensforge/core build
pnpm --filter @ensforge/core pack:check
```
