---
title: getNameStatus
description: Gets name status for name state.
---

# getNameStatus

Gets name status for name state.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.name.getNameStatus({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetNameStateParameters } from "@ensforge/sdk";
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
type GetNameStatusResult = Awaited<ReturnType<typeof getNameStatus>>;
```

| Property            | Type                                                                                                                                                                                                                                                                                                                                 | Description                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| `charAt`            | `(pos: number) => string`                                                                                                                                                                                                                                                                                                            | The charAt value returned by the operation.            |
| `charCodeAt`        | `(index: number) => number`                                                                                                                                                                                                                                                                                                          | The charCodeAt value returned by the operation.        |
| `localeCompare`     | `{ (that: string): number; (that: string, locales?: string \| string[], options?: Intl.CollatorOptions): number; (that: string, locales?: Intl.LocalesArgument, options?: Intl.CollatorOptions): number; }`                                                                                                                          | The localeCompare value returned by the operation.     |
| `match`             | `{ (regexp: string \| RegExp): RegExpMatchArray \| null; (matcher: { [Symbol.match](string: string): RegExpMatchArray \| null; }): RegExpMatchArray \| null; }`                                                                                                                                                                      | The match value returned by the operation.             |
| `replace`           | `{ (searchValue: string \| RegExp, replaceValue: string): string; (searchValue: string \| RegExp, replacer: (substring: string, ...args: any[]) => string): string; (searchValue: { [Symbol.replace](string: string, replaceValue: string): string; }, replaceValue: string): string; (searchValue: { [Symbol.replace](string: s...` | The replace value returned by the operation.           |
| `search`            | `{ (regexp: string \| RegExp): number; (searcher: { [Symbol.search](string: string): number; }): number; }`                                                                                                                                                                                                                          | The search value returned by the operation.            |
| `split`             | `{ (separator: string \| RegExp, limit?: number): string[]; (splitter: { [Symbol.split](string: string, limit?: number): string[]; }, limit?: number): string[]; }`                                                                                                                                                                  | The split value returned by the operation.             |
| `substring`         | `(start: number, end?: number) => string`                                                                                                                                                                                                                                                                                            | The substring value returned by the operation.         |
| `toLowerCase`       | `() => string`                                                                                                                                                                                                                                                                                                                       | The toLowerCase value returned by the operation.       |
| `toLocaleLowerCase` | `{ (locales?: string \| string[]): string; (locales?: Intl.LocalesArgument): string; }`                                                                                                                                                                                                                                              | The toLocaleLowerCase value returned by the operation. |
| `toUpperCase`       | `() => string`                                                                                                                                                                                                                                                                                                                       | The toUpperCase value returned by the operation.       |
| `toLocaleUpperCase` | `{ (locales?: string \| string[]): string; (locales?: Intl.LocalesArgument): string; }`                                                                                                                                                                                                                                              | The toLocaleUpperCase value returned by the operation. |
| `trim`              | `() => string`                                                                                                                                                                                                                                                                                                                       | The trim value returned by the operation.              |
| `substr`            | `(from: number, length?: number) => string`                                                                                                                                                                                                                                                                                          | The substr value returned by the operation.            |
| `valueOf`           | `() => string`                                                                                                                                                                                                                                                                                                                       | function valueOf() { [native code] }                   |
| `codePointAt`       | `(pos: number) => number \| undefined`                                                                                                                                                                                                                                                                                               | The codePointAt value returned by the operation.       |
| `endsWith`          | `(searchString: string, endPosition?: number) => boolean`                                                                                                                                                                                                                                                                            | The endsWith value returned by the operation.          |
| `normalize`         | `{ (form: "NFC" \| "NFD" \| "NFKC" \| "NFKD"): string; (form?: string): string; }`                                                                                                                                                                                                                                                   | The normalize value returned by the operation.         |
| `repeat`            | `(count: number) => string`                                                                                                                                                                                                                                                                                                          | The repeat value returned by the operation.            |
| `startsWith`        | `(searchString: string, position?: number) => boolean`                                                                                                                                                                                                                                                                               | The startsWith value returned by the operation.        |
| `anchor`            | `(name: string) => string`                                                                                                                                                                                                                                                                                                           | The anchor value returned by the operation.            |
| `big`               | `() => string`                                                                                                                                                                                                                                                                                                                       | The big value returned by the operation.               |
| `blink`             | `() => string`                                                                                                                                                                                                                                                                                                                       | The blink value returned by the operation.             |
| `bold`              | `() => string`                                                                                                                                                                                                                                                                                                                       | The bold value returned by the operation.              |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.name.getNameStatus.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = sdk.name.getNameStatus.request(parameters);
```

## Error

```ts
import type { GetNameStatusError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`getNameStatus`](/core/api/actions/name/get-name-status)
