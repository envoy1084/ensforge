import type { FieldMap, FormDefinition } from "./types";

export const defineForm = <const Fields extends FieldMap>(
  definition: FormDefinition<Fields>,
): FormDefinition<Fields> => definition;
