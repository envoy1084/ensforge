---
title: makeStreamAtom
description: Create an Effect Atom query from a bound SDK stream.
---

# makeStreamAtom

Creates an atom factory that subscribes to a bound SDK stream and exposes its latest value as an
`AsyncResult`.

## Import

```ts
import { makeStreamAtom } from "@ensforge/react/atoms";
```

## Usage

```ts
const eventsAtom = makeStreamAtom("events", (sdk) => sdk.events.watchEnsEvents);
```

Retry, cache lifetime, and window-focus behavior follow the supplied query atom options.

## Return Type

`EnsAtomFactory<Parameters, Success, Failure | NoSuchElementError>`
