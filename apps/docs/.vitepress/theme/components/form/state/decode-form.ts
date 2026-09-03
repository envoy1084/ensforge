import type { DecodedFields, DraftFields, FieldErrors, FieldMap } from "../types";

export type FormDecodeResult<Fields extends FieldMap> =
  | { readonly success: true; readonly value: DecodedFields<Fields> }
  | { readonly success: false; readonly errors: FieldErrors };

export const decodeForm = <Fields extends FieldMap>(
  fields: Fields,
  drafts: DraftFields,
): FormDecodeResult<Fields> => {
  const value: Record<string, unknown> = {};
  const errors: Record<string, string | undefined> = {};
  let valid = true;

  for (const [key, field] of Object.entries(fields)) {
    const draft = drafts[key] ?? field.codec.initialValue;
    const decoded = field.codec.decode(draft as never);
    if (decoded.success) value[key] = decoded.value;
    else {
      valid = false;
      errors[key] = decoded.message;
    }
  }

  return valid
    ? { success: true, value: value as DecodedFields<Fields> }
    : { success: false, errors };
};
