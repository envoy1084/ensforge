---
title: Protocol Routing
description: Understand how ensforge selects ENSv1 and ENSv2 contracts.
---

# Protocol Routing

Core actions model what you want to do, not which generation of a contract you want to call.

```ts
await getOwner(config, { name: "example.eth" });
await renewName(config, { name: "example.eth", duration });
```

## Network profile

`createConfig` selects a deployment profile from `network`.

- `mainnet` uses the supported mainnet ENS deployment.
- `sepolia` uses the current ENSv2 deployment and its V1 compatibility contracts.

The profile is immutable and available at `config.deployments` for inspection. Most applications
should let actions consume it rather than reading addresses directly.

## Name route

Actions normalize the name and discover the relevant registry state. Depending on the network and
name, a route can represent:

- an ENSv1 name;
- an ENSv2-native name;
- a name migrated from ENSv1;
- an ENSv1 name reserved in ENSv2 but not migrated yet; or
- an available name.

The action then reads or writes the contract that owns that responsibility. For example, a renewal
can use the V1 controller, the V2 ETH Registrar, or the V1 renewer compatibility path.

## Inspecting the route

Use [`getNameState`](/core/api/actions/name/get-name-state) for the complete application-facing state.
Use smaller actions such as `getProtocol`, `isMigrated`, and `isReserved` when you need one fact and
want to perform only the reads required for that fact.

```ts
const state = await getNameState(config, { name });

switch (state.kind) {
  case "v2-migrated":
  case "v2-native":
    // V2 state is active.
    break;
  case "v2-reserved":
    // The V1 name has not migrated yet.
    break;
}
```

Do not cache a protocol decision indefinitely. Migration changes a name's route; cache the action
result according to the freshness requirements of your application.
