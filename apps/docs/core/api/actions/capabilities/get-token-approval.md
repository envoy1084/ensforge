---
title: getTokenApproval
description: Gets token approval for ENS permissions and contract capabilities.
---

# getTokenApproval

Gets token approval for ENS permissions and contract capabilities.

## Import

```ts
import { getTokenApproval } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getTokenApproval } from "@ensforge/core";
import { config } from "./config";

const result = await getTokenApproval(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { NameCapabilityParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetTokenApprovalResult = Awaited<ReturnType<typeof getTokenApproval>>;
```

| Property    | Type                                                                    | Description                                            |
| ----------- | ----------------------------------------------------------------------- | ------------------------------------------------------ |
| `supported` | `false \| true`                                                         | Whether the selected protocol supports this operation. |
| `protocol`  | `"v1" \| "v2" \| "v1"`                                                  | ENS protocol route used for the result.                |
| `reason`    | `"PER_TOKEN_APPROVAL_UNSUPPORTED" \| "NAME_NOT_TOKENIZED" \| undefined` | The reason value returned by the operation.            |
| `kind`      | `"name-wrapper" \| "registrar" \| undefined`                            | The kind value returned by the operation.              |
| `contract`  | `&#96;0x${string}&#96; \| undefined`                                    | The contract value returned by the operation.          |
| `tokenId`   | `bigint \| undefined`                                                   | The tokenId value returned by the operation.           |
| `approved`  | `&#96;0x${string}&#96; \| null \| undefined`                            | The approved value returned by the operation.          |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getTokenApproval.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getTokenApproval.request(parameters);
```

## Error

```ts
import type { GetTokenApprovalError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.capabilities.getTokenApproval`](/sdk/api/capabilities/get-token-approval)
