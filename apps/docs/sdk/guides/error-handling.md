---
title: Error Handling
description: Handle typed errors from grouped SDK methods.
---

# Error Handling

SDK methods return the same errors as their Core actions. The bound client changes the call shape,
not the error model.

```ts
try {
  const owner = await sdk.name.getOwner({ name: input });
} catch (error) {
  if (error instanceof NameError) console.error(error.code);
}
```

Use `.effect` to retain the error union in the Effect channel.

```ts
const program = sdk.name.getOwner
  .effect({ name: input })
  .pipe(Effect.catchTag("RpcError", () => Effect.succeed(null)));
```

See the Core [Errors reference](/core/api/errors) for all families.
