import { failure, type InputCodec, success } from "../codecs/codec";
import {
  addressCodec,
  bigintCodec,
  bigintListCodec,
  booleanCodec,
  ensNameCodec,
  hexCodec,
  integerCodec,
  stringCodec,
  stringListCodec,
} from "../codecs/primitives";
import type {
  ListFieldDefinition,
  SelectFieldDefinition,
  SelectOption,
  TextFieldDefinition,
  ToggleFieldDefinition,
} from "../types";

interface FieldOptions {
  readonly description?: string;
  readonly label: string;
}

interface TextFieldOptions extends FieldOptions {
  readonly placeholder?: string;
}

export const ensNameField = (
  options: TextFieldOptions & { readonly initialValue?: string },
): TextFieldDefinition<string> => ({
  codec: ensNameCodec(options.initialValue),
  control: "text",
  label: options.label,
  placeholder: options.placeholder ?? "ens.eth",
  ...(options.description ? { description: options.description } : {}),
});

export const addressField = <Optional extends boolean = false>(
  options: TextFieldOptions & { readonly initialValue?: string; readonly optional?: Optional },
): TextFieldDefinition<Optional extends true ? `0x${string}` | undefined : `0x${string}`> =>
  ({
    codec: addressCodec({
      ...(options.initialValue === undefined ? {} : { initialValue: options.initialValue }),
      ...(options.optional === undefined ? {} : { optional: options.optional }),
    }),
    control: "text",
    label: options.label,
    placeholder: options.placeholder ?? "0x…",
    ...(options.description ? { description: options.description } : {}),
  }) as TextFieldDefinition<Optional extends true ? `0x${string}` | undefined : `0x${string}`>;

export const textField = <Optional extends boolean = false>(
  options: TextFieldOptions & { readonly initialValue?: string; readonly optional?: Optional },
): TextFieldDefinition<Optional extends true ? string | undefined : string> =>
  ({
    codec: stringCodec({
      ...(options.initialValue === undefined ? {} : { initialValue: options.initialValue }),
      ...(options.optional === undefined ? {} : { optional: options.optional }),
    }),
    control: "text",
    label: options.label,
    ...(options.placeholder ? { placeholder: options.placeholder } : {}),
    ...(options.description ? { description: options.description } : {}),
  }) as TextFieldDefinition<Optional extends true ? string | undefined : string>;

export const bigintField = <Optional extends boolean = false>(
  options: TextFieldOptions & {
    readonly initialValue?: bigint;
    readonly minimum?: bigint;
    readonly optional?: Optional;
  },
): TextFieldDefinition<Optional extends true ? bigint | undefined : bigint> =>
  ({
    codec: bigintCodec(options),
    control: "text",
    inputMode: "numeric",
    label: options.label,
    ...(options.placeholder ? { placeholder: options.placeholder } : {}),
    ...(options.description ? { description: options.description } : {}),
  }) as TextFieldDefinition<Optional extends true ? bigint | undefined : bigint>;

export const integerField = <Optional extends boolean = false>(
  options: TextFieldOptions & {
    readonly initialValue?: number;
    readonly maximum?: number;
    readonly minimum?: number;
    readonly optional?: Optional;
  },
): TextFieldDefinition<Optional extends true ? number | undefined : number> =>
  ({
    codec: integerCodec(options),
    control: "text",
    inputMode: "numeric",
    label: options.label,
    ...(options.placeholder ? { placeholder: options.placeholder } : {}),
    ...(options.description ? { description: options.description } : {}),
  }) as TextFieldDefinition<Optional extends true ? number | undefined : number>;

export const hexField = <Optional extends boolean = false>(
  options: TextFieldOptions & {
    readonly bytes?: number;
    readonly initialValue?: `0x${string}`;
    readonly optional?: Optional;
  },
): TextFieldDefinition<Optional extends true ? `0x${string}` | undefined : `0x${string}`> =>
  ({
    codec: hexCodec(options),
    control: "text",
    label: options.label,
    placeholder: options.placeholder ?? "0x…",
    ...(options.description ? { description: options.description } : {}),
  }) as TextFieldDefinition<Optional extends true ? `0x${string}` | undefined : `0x${string}`>;

export const selectField = <const Value extends string>(
  options: FieldOptions & {
    readonly initialValue: Value;
    readonly options: ReadonlyArray<{ readonly label: string; readonly value: Value }>;
  },
): SelectFieldDefinition<Value> => {
  const allowed = new Set(options.options.map(({ value }) => value));
  const codec: InputCodec<Value> = {
    initialValue: options.initialValue,
    decode: (draft) =>
      allowed.has(draft as Value) ? success(draft as Value) : failure("Select a value"),
  };
  return {
    codec,
    control: "select",
    label: options.label,
    options: options.options satisfies ReadonlyArray<SelectOption>,
    ...(options.description ? { description: options.description } : {}),
  };
};

export const toggleField = (
  options: FieldOptions & { readonly initialValue?: boolean },
): ToggleFieldDefinition<boolean> => ({
  codec: { ...booleanCodec, initialValue: options.initialValue ?? false },
  control: "toggle",
  label: options.label,
  ...(options.description ? { description: options.description } : {}),
});

export const stringListField = (
  options: TextFieldOptions & {
    readonly initialValue?: ReadonlyArray<string>;
    readonly itemLabel?: string;
    readonly minimumLength?: number;
  },
): ListFieldDefinition<ReadonlyArray<string>> => ({
  codec: stringListCodec(options),
  control: "list",
  itemLabel: options.itemLabel ?? "Value",
  label: options.label,
  ...(options.placeholder ? { placeholder: options.placeholder } : {}),
  ...(options.description ? { description: options.description } : {}),
});

export const bigintListField = (
  options: TextFieldOptions & {
    readonly initialValue?: ReadonlyArray<bigint>;
    readonly itemLabel?: string;
    readonly minimumLength?: number;
  },
): ListFieldDefinition<ReadonlyArray<bigint>> => ({
  codec: bigintListCodec(options),
  control: "list",
  itemLabel: options.itemLabel ?? "Number",
  label: options.label,
  placeholder: options.placeholder ?? "60",
  ...(options.description ? { description: options.description } : {}),
});
