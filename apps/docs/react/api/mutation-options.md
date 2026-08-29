---
title: Mutation Options
description: Configure callbacks and retries for ensforge mutation hooks.
---

# Mutation Options

```ts
interface EnsMutationOptions<Parameters, Success, Failure> {
  retry?: false | number;
  onSuccess?: (data: Success, parameters: Parameters) => void;
  onError?: (error: Failure | Error, parameters: Parameters) => void;
  onSettled?: (
    data: Success | undefined,
    error: Failure | Error | null,
    parameters: Parameters,
  ) => void;
}
```

Callbacks on the hook run for every mutation. `mutate` also accepts callbacks for one execution.
Avoid retrying writes unless the operation is known to be safe and idempotent.
