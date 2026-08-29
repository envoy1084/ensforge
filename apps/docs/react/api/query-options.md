---
title: Query Options
description: Configure Ensforge React query execution and caching.
---

# Query Options

Every query hook accepts a `query` property.

```ts
interface EnsQueryOptions<Success, Selected = Success> {
  enabled?: boolean;
  gcTime?: number;
  refetchInterval?: false | number;
  refetchOnWindowFocus?: boolean;
  retry?: false | number;
  select?: (value: Success) => Selected;
  staleTime?: number;
}
```

| Option                 |  Default | Description                                              |
| ---------------------- | -------: | -------------------------------------------------------- |
| `enabled`              |   `true` | Enables execution for this hook.                         |
| `gcTime`               | `300000` | Time an inactive cached query remains reusable.          |
| `refetchInterval`      |  `false` | Polling interval in milliseconds.                        |
| `refetchOnWindowFocus` |  `false` | Refresh when the document regains focus.                 |
| `retry`                |  `false` | Number of failure retries.                               |
| `select`               | identity | Derives the hook's `data` type from a successful result. |
| `staleTime`            |  `30000` | Time a successful value remains fresh.                   |

Provider `defaults.queries` supplies defaults for every hook. Per-hook options take precedence.
