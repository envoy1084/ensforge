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

One config targets one authoritative ENS network. Its discriminated deployment profile identifies
the canonical protocol: mainnet is currently V1, while Sepolia is V2 with V1 deployment metadata
retained for unmigrated names. The profile does not choose a contract for a particular name;
actions inspect that name's state before selecting V1 or V2.

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

config.deployments.protocol; // "v2"
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

## Ownership

`getOwner` presents one ownership model across ENSv1 and ENSv2. Mainnet reads the V1 registry,
Base Registrar, and Name Wrapper. On a V2 network with V1 metadata, migrated names use the V2
Universal Resolver while unmigrated reservations use their V1 ownership contracts.

```ts
import { Effect } from "effect";
import { getOwner } from "@ensforge/core";

const owner = await getOwner(config, { name: "example.eth" });
const ownerEffect = getOwner.effect(config, { name: "example.eth" });
const ownerFromEffect = await Effect.runPromise(ownerEffect);
```

The result identifies the protocol and ownership level and keeps the V1 registry controller
(`owner`) separate from the Base Registrar NFT holder (`registrant`). An unowned name returns
`null`; zero addresses are never exposed as owners.

## Resolver discovery

`getResolver` finds the effective resolver for a name through the Universal Resolver configured
for the selected deployment. This includes inherited resolvers and, on ENSv2 Sepolia, the V1
resolver mirror used by unmigrated names. It returns `null` when no resolver is configured.

```ts
import { getResolver } from "@ensforge/core";

const resolver = await getResolver(config, { name: "sub.example.eth" });
const resolverEffect = getResolver.effect(config, { name: "sub.example.eth" });
const resolverRequest = getResolver.request({ name: "sub.example.eth" });
```

The `.request` form can be combined with other semantic reads in `readBatch`; compatible primitive
contract reads share one snapshot and Multicall3 execution.

## Addresses

`getAddress` and `getAddresses` resolve address records through the deployment's Universal
Resolver. V1 uses the V1 resolver, while V2 uses its canonical resolver for native, migrated, and
RESERVED names. Direct Universal Resolver execution leaves viem's CCIP-Read handling active,
including when an address request is part of `readBatch`.

```ts
import { getAddress, getAddresses } from "@ensforge/core";

const eth = await getAddress(config, { name: "example.eth" });
const records = await getAddresses(config, {
  name: "example.eth",
  coinTypes: [60n, 0n],
});
```

Every result contains its coin type, decoded address, and raw resolver bytes. Unset records retain
their requested coin type and return `null` for both `address` and `raw`. `getAddresses` deduplicates
resolver calls internally and restores the caller's original order, including duplicates.

## Text records

`getText` and `getTexts` use the same V1/V2 Universal Resolver and CCIP-Read path as address
records. Text keys are case-sensitive. Empty resolver strings and missing resolvers become
structured `null` values rather than errors.

```ts
import { getText, getTexts } from "@ensforge/core";

const email = await getText(config, { name: "example.eth", key: "email" });
const profile = await getTexts(config, {
  name: "example.eth",
  keys: ["avatar", "description", "url"],
});
```

`getTexts` deduplicates resolver calls while preserving the requested key order and duplicates in
its returned `{ key, value }[]` result.

## Content hash

`getContentHash` resolves and decodes the name's content hash while preserving the original
resolver bytes:

```ts
import { getContentHash } from "@ensforge/core";

const content = await getContentHash(config, { name: "example.eth" });
// { protocol: "ipfs", value: "Qm...", raw: "0xe301..." }
```

An unset record returns `{ protocol: null, value: null, raw: null }`. The action supports V1, V2,
RESERVED-name mirroring, CCIP-Read, and `readBatch` through the shared Universal Resolver path.

## Contract ABI

`getAbi` resolves EIP-205 contract ABI records. It accepts JSON, zlib-compressed JSON, CBOR, and URI
records by default; the resolver selects the lowest supported content-type bit that has a value.

```ts
import { getAbi } from "@ensforge/core";

const abi = await getAbi(config, {
  name: "example.eth",
  contentTypes: ["json", "zlib-json", "cbor", "uri"],
});
```

Inline formats return a viem-compatible ABI in `value`; URI records return the URI string without
performing a network fetch. Every set result preserves the resolver bytes in `raw`. An unavailable
record returns `{ contentType: null, value: null, raw: null }`. The action supports the same V1,
V2, RESERVED-name, CCIP-Read, and `readBatch` path as other resolver profile actions.

## Public key, interface, and arbitrary data

The remaining resolver profile actions use the same Universal Resolver path:

```ts
import { getData, getInterface, getPubkey } from "@ensforge/core";

const pubkey = await getPubkey(config, { name: "example.eth" });
const interfaceResult = await getInterface(config, {
  name: "example.eth",
  interfaceId: "0x01ffc9a7",
});
const data = await getData(config, {
  name: "example.eth",
  key: "com.example.account",
});
```

`getPubkey` returns `{ x, y }` or `null` when both coordinates are zero. `getInterface` preserves
the requested four-byte interface ID and maps the zero implementer address to `null`. `getData`
preserves the requested key and returns its ordinary `Hex` value, mapping empty bytes to `null`.
Arbitrary data remains undecoded because its application-specific key defines its meaning. All
three actions provide `.effect` and `.request` forms and work inside `readBatch`.

## Name records and reverse resolution

`getName` reads the resolver's low-level `name(bytes32)` profile for any ENS node. `getPrimaryName`
is the user-facing Ethereum reverse lookup and uses the selected V1 or V2 Universal Resolver's
verified `reverse(address, 60)` flow:

```ts
import { getName, getPrimaryName } from "@ensforge/core";

const record = await getName(config, {
  name: "1234abcd.addr.reverse",
});
const primary = await getPrimaryName(config, {
  address: "0x1234...",
});
```

`getName` returns `{ name: string | null }` without treating the record as verified.
`getPrimaryName` returns `{ name: NormalizedName, match: true }` only after the Universal Resolver
forward-resolves the candidate name back to the requested address. Missing and mismatched records
return `null`. Both actions support CCIP-Read and semantic `readBatch` composition.

## Expiry

`getExpiry` presents one lifecycle boundary across ENSv1, ENSv2, and unmigrated reserved names. It
returns the absolute expiry timestamp, grace-period duration and absolute grace-period end, together
with the protocol and contract family that supplied those facts.

```ts
import { getExpiry } from "@ensforge/core";

const expiry = await getExpiry(config, { name: "example.eth" });
const expiryEffect = getExpiry.effect(config, { name: "example.eth" });
const expiryRequest = getExpiry.request({ name: "example.eth" });
```

Second-level ENSv1 `.eth` names use the Base Registrar, wrapped subnames use Name Wrapper data, and
ENSv2 names discover and read their containing registry. During migration, reserved names keep
their V1 registration expiry and use the `ETHRenewerV1` grace-period configuration. All timestamps
and durations are bigint seconds. Time-relative lifecycle status remains a separate semantic read.

## Names and records

Pure ENS operations are synchronous and return Schema-branded domain values:

```ts
import {
  NormalizedName,
  analyzeName,
  decodeAddressRecord,
  dnsEncodeName,
  encodeAddressRecord,
  namehash,
  normalizeName,
} from "@ensforge/core";

const name: NormalizedName = normalizeName("Example.eth");
const analysis = analyzeName(name);
const node = namehash(name);
const dnsName = dnsEncodeName(name);

const normalizedNameEffect = normalizeName.effect("Example.eth");
const dnsNameEffect = dnsEncodeName.effect(name);

analysis.kind; // "second-level"
analysis.parent; // "eth"
analysis.isSecondLevelEth; // true

const addressData = encodeAddressRecord({
  coinType: 60n,
  address: "0x0000000000000000000000000000000000000001",
});
const address = decodeAddressRecord({ coinType: 60n, data: addressData });
```

Record decoders return `null` for the empty `0x` value used by resolvers to represent an unset
record.

Normalization and DNS encoding keep their synchronous form for ordinary TypeScript while exposing
the same typed operation through `.effect` for Effect programs. This avoids action-local wrappers
around otherwise reusable name codecs.

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
