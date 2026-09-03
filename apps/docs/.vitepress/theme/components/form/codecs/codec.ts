export type DraftValue = string | boolean | ReadonlyArray<string>;

export type DecodeResult<Value> =
  | { readonly success: true; readonly value: Value }
  | { readonly success: false; readonly message: string };

export interface InputCodec<Value, Draft extends DraftValue = string> {
  readonly initialValue: Draft;
  readonly decode: (draft: Draft) => DecodeResult<Value>;
}

export const success = <Value>(value: Value): DecodeResult<Value> => ({ success: true, value });

export const failure = (message: string): DecodeResult<never> => ({ success: false, message });
