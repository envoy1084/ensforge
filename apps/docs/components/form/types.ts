import type { InputCodec, DraftValue } from "./codecs/codec";

export interface SelectOption {
  readonly label: string;
  readonly value: string;
}

interface BaseFieldDefinition<Value, Draft extends DraftValue> {
  readonly codec: InputCodec<Value, Draft>;
  readonly description?: string;
  readonly label: string;
}

export interface TextFieldDefinition<Value = unknown> extends BaseFieldDefinition<Value, string> {
  readonly control: "text";
  readonly inputMode?: "decimal" | "numeric" | "text";
  readonly placeholder?: string;
}

export interface SelectFieldDefinition<Value = unknown> extends BaseFieldDefinition<Value, string> {
  readonly control: "select";
  readonly options: ReadonlyArray<SelectOption>;
}

export interface ToggleFieldDefinition<Value = unknown> extends BaseFieldDefinition<
  Value,
  boolean
> {
  readonly control: "toggle";
}

export interface ListFieldDefinition<Value = unknown> extends BaseFieldDefinition<
  Value,
  ReadonlyArray<string>
> {
  readonly control: "list";
  readonly itemLabel: string;
  readonly placeholder?: string;
}

export type FieldDefinition<Value = unknown> =
  | TextFieldDefinition<Value>
  | SelectFieldDefinition<Value>
  | ToggleFieldDefinition<Value>
  | ListFieldDefinition<Value>;

export type FieldMap = Readonly<Record<string, FieldDefinition>>;

export type DecodedFields<Fields extends FieldMap> = {
  readonly [Key in keyof Fields]: Fields[Key] extends FieldDefinition<infer Value> ? Value : never;
};

export type DraftFields = Readonly<Record<string, DraftValue>>;
export type FieldErrors = Readonly<Record<string, string | undefined>>;

export interface FormDefinition<Fields extends FieldMap> {
  readonly fields: Fields;
}
