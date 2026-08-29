---
title: Query Result
description: Understand the result returned by ensforge query hooks.
---

# Query Result

```ts
interface EnsQueryResult<Data, Failure> {
  data: Data | undefined;
  error: Failure | Error | null;
  cause: Cause<Failure> | null;
  status: "pending" | "error" | "success";
  fetchStatus: "fetching" | "idle";
  isPending: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  updatedAt: number;
  result: AsyncResult<Data, Failure>;
  refetch(): Promise<Data>;
  refetchEffect(): Effect<Data, Failure>;
}
```

`isLoading` is true only for the initial pending fetch. `isFetching` also covers background refreshes.
The underlying Effect Atom `AsyncResult` is available through `result` for advanced composition.
