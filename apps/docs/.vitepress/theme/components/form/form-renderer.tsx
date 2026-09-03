import { type FormEvent } from "react";

import { Button } from "@thenamespace/uikit/button";
import { Form } from "@thenamespace/uikit/form";

import { RenderField } from "./fields/render-field";
import { decodeForm } from "./state/decode-form";
import { useForm } from "./state/use-form";
import type { DecodedFields, FieldMap, FormDefinition } from "./types";

export interface FormRendererProps<Fields extends FieldMap> {
  readonly definition: FormDefinition<Fields>;
  readonly isSubmitting: boolean;
  readonly onSubmit: (value: DecodedFields<Fields>) => void | Promise<void>;
}

export const FormRenderer = <Fields extends FieldMap>({
  definition,
  isSubmitting,
  onSubmit,
}: FormRendererProps<Fields>) => {
  const form = useForm(definition.fields);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const decoded = decodeForm(definition.fields, form.drafts);
    if (!decoded.success) {
      form.setErrors(decoded.errors);
      return;
    }
    void onSubmit(decoded.value);
  };

  return (
    <Form className="grid gap-4" onSubmit={submit}>
      {Object.entries(definition.fields).map(([key, field]) => (
        <RenderField
          draft={form.drafts[key] ?? field.codec.initialValue}
          field={field}
          fieldKey={key}
          key={key}
          onChange={(value) => form.setDraft(key, value)}
          {...(form.errors[key] ? { error: form.errors[key] } : {})}
        />
      ))}

      <Button fullWidth isDisabled={isSubmitting} type="submit" variant="primary">
        {isSubmitting ? "Reading…" : "Run"}
      </Button>
    </Form>
  );
};
