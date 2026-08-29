---
title: commitName
description: commit name for registration and renewal.
---

# commitName

commit name for registration and renewal.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.registration.commitName({
  commitment: "0x0000000000000000000000000000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type CommitNameParameters = Parameters<typeof sdk.registration.commitName>[0];
```

### commitment

`Bytes32`

Registration commitment.

## Return Type

```ts
type CommitNameResult = Awaited<ReturnType<typeof sdk.registration.commitName>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.registration.commitName.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.registration.commitName.call(parameters);
```

## Action

- [`commitName`](/core/api/actions/registration/commit-name)
