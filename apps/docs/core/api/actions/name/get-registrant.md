---
title: getRegistrant
description: Get the ENSv1 .eth registrant for a name.
---

# getRegistrant

Get the ENSv1 .eth registrant for a name.

## Import

```ts
import { getRegistrant } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getRegistrant } from "@ensforge/core";
import { config } from "./config";

const registrant = await getRegistrant(config, { name: "ens.eth" });
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetNameStateParameters } from "@ensforge/core";
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
type GetRegistrantResult = Awaited<ReturnType<typeof getRegistrant>>;
```

| Property            | Type                                                                                                                                                                                                                                                                                                                                              | Description                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `charAt`            | `(pos: number) => string \| undefined`                                                                                                                                                                                                                                                                                                            | The charAt value returned by the operation.            |
| `charCodeAt`        | `(index: number) => number \| undefined`                                                                                                                                                                                                                                                                                                          | The charCodeAt value returned by the operation.        |
| `localeCompare`     | `{ (that: string): number; (that: string, locales?: string \| string[], options?: Intl.CollatorOptions): number; (that: string, locales?: Intl.LocalesArgument, options?: Intl.CollatorOptions): number; } \| undefined`                                                                                                                          | The localeCompare value returned by the operation.     |
| `match`             | `{ (regexp: string \| RegExp): RegExpMatchArray \| null; (matcher: { [Symbol.match](string: string): RegExpMatchArray \| null; }): RegExpMatchArray \| null; } \| undefined`                                                                                                                                                                      | The match value returned by the operation.             |
| `replace`           | `{ (searchValue: string \| RegExp, replaceValue: string): string; (searchValue: string \| RegExp, replacer: (substring: string, ...args: any[]) => string): string; (searchValue: { [Symbol.replace](string: string, replaceValue: string): string; }, replaceValue: string): string; (searchValue: { [Symbol.replace](string: s... \| undefined` | The replace value returned by the operation.           |
| `search`            | `{ (regexp: string \| RegExp): number; (searcher: { [Symbol.search](string: string): number; }): number; } \| undefined`                                                                                                                                                                                                                          | The search value returned by the operation.            |
| `split`             | `{ (separator: string \| RegExp, limit?: number): string[]; (splitter: { [Symbol.split](string: string, limit?: number): string[]; }, limit?: number): string[]; } \| undefined`                                                                                                                                                                  | The split value returned by the operation.             |
| `substring`         | `(start: number, end?: number) => string \| undefined`                                                                                                                                                                                                                                                                                            | The substring value returned by the operation.         |
| `toLowerCase`       | `() => string \| undefined`                                                                                                                                                                                                                                                                                                                       | The toLowerCase value returned by the operation.       |
| `toLocaleLowerCase` | `{ (locales?: string \| string[]): string; (locales?: Intl.LocalesArgument): string; } \| undefined`                                                                                                                                                                                                                                              | The toLocaleLowerCase value returned by the operation. |
| `toUpperCase`       | `() => string \| undefined`                                                                                                                                                                                                                                                                                                                       | The toUpperCase value returned by the operation.       |
| `toLocaleUpperCase` | `{ (locales?: string \| string[]): string; (locales?: Intl.LocalesArgument): string; } \| undefined`                                                                                                                                                                                                                                              | The toLocaleUpperCase value returned by the operation. |
| `trim`              | `() => string \| undefined`                                                                                                                                                                                                                                                                                                                       | The trim value returned by the operation.              |
| `substr`            | `(from: number, length?: number) => string \| undefined`                                                                                                                                                                                                                                                                                          | The substr value returned by the operation.            |
| `valueOf`           | `() => string \| undefined`                                                                                                                                                                                                                                                                                                                       | function valueOf() { [native code] }                   |
| `codePointAt`       | `(pos: number) => number \| undefined \| undefined`                                                                                                                                                                                                                                                                                               | The codePointAt value returned by the operation.       |
| `endsWith`          | `(searchString: string, endPosition?: number) => boolean \| undefined`                                                                                                                                                                                                                                                                            | The endsWith value returned by the operation.          |
| `normalize`         | `{ (form: "NFC" \| "NFD" \| "NFKC" \| "NFKD"): string; (form?: string): string; } \| undefined`                                                                                                                                                                                                                                                   | The normalize value returned by the operation.         |
| `repeat`            | `(count: number) => string \| undefined`                                                                                                                                                                                                                                                                                                          | The repeat value returned by the operation.            |
| `startsWith`        | `(searchString: string, position?: number) => boolean \| undefined`                                                                                                                                                                                                                                                                               | The startsWith value returned by the operation.        |
| `anchor`            | `(name: string) => string \| undefined`                                                                                                                                                                                                                                                                                                           | The anchor value returned by the operation.            |
| `big`               | `() => string \| undefined`                                                                                                                                                                                                                                                                                                                       | The big value returned by the operation.               |
| `blink`             | `() => string \| undefined`                                                                                                                                                                                                                                                                                                                       | The blink value returned by the operation.             |
| `bold`              | `() => string \| undefined`                                                                                                                                                                                                                                                                                                                       | The bold value returned by the operation.              |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getRegistrant.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getRegistrant.request(parameters);
```

## Error

```ts
import type { GetRegistrantError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.name.getRegistrant`](/sdk/api/name/get-registrant)
