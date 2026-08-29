---
title: Mutation Result
description: Understand the result returned by ensforge mutation hooks.
---

# Mutation Result

Mutation hooks return state plus three execution forms.

```ts
interface EnsMutationResult<Parameters, Success, Failure> {
  data: Success | undefined;
  error: Failure | Error | null;
  cause: Cause<Failure> | null;
  parameters: Parameters | undefined;
  status: "idle" | "pending" | "error" | "success";
  isIdle: boolean;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  mutate(parameters: Parameters, callbacks?: EnsMutationCallbacks): void;
  mutateAsync(parameters: Parameters): Promise<Success>;
  mutateEffect(parameters: Parameters): Effect<Success, Failure>;
  interrupt(): void;
  reset(): void;
  result: AsyncResult<Success, Failure>;
}
```

`interrupt` cancels the active Effect. `reset` clears parameters and restores the initial state.
