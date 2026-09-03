import { useCallback, useEffect, useState } from "react";

import type { DraftValue } from "../codecs/codec";
import type { DraftFields, FieldErrors, FieldMap } from "../types";

const initialDrafts = (fields: FieldMap): DraftFields =>
  Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, field.codec.initialValue]));

export const useForm = (fields: FieldMap) => {
  const [drafts, setDrafts] = useState<DraftFields>(() => initialDrafts(fields));
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    setDrafts(initialDrafts(fields));
    setErrors({});
  }, [fields]);

  const setDraft = useCallback((key: string, value: DraftValue) => {
    setDrafts((current) => ({ ...current, [key]: value }));
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current));
  }, []);

  const reset = useCallback(() => {
    setDrafts(initialDrafts(fields));
    setErrors({});
  }, [fields]);

  return { drafts, errors, reset, setDraft, setErrors } as const;
};
