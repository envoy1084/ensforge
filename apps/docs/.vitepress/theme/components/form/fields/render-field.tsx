import { type KeyboardEvent, useState } from "react";

import { Button } from "@thenamespace/uikit/button";
import { Chip } from "@thenamespace/uikit/chip";
import { Description } from "@thenamespace/uikit/description";
import { FieldError } from "@thenamespace/uikit/field-error";
import { Input } from "@thenamespace/uikit/input";
import { Label } from "@thenamespace/uikit/label";
import { NativeSelect } from "@thenamespace/uikit/native-select";
import { Switch } from "@thenamespace/uikit/switch";
import { TextField } from "@thenamespace/uikit/textfield";

import type { DraftValue } from "../codecs/codec";
import type { FieldDefinition } from "../types";

interface RenderFieldProps {
  readonly draft: DraftValue;
  readonly error?: string;
  readonly field: FieldDefinition;
  readonly fieldKey: string;
  readonly onChange: (value: DraftValue) => void;
}

const TextInputField = ({ draft, error, field, fieldKey, onChange }: RenderFieldProps) => {
  if (field.control !== "text" || typeof draft !== "string") return null;

  return (
    <TextField fullWidth isInvalid={error !== undefined} variant="secondary">
      <Label htmlFor={`ensforge-demo-${fieldKey}`}>{field.label}</Label>
      <Input
        fullWidth
        id={`ensforge-demo-${fieldKey}`}
        value={draft}
        variant="secondary"
        {...(field.inputMode ? { inputMode: field.inputMode } : {})}
        {...(field.placeholder ? { placeholder: field.placeholder } : {})}
        onChange={(event) => onChange(event.target.value)}
      />
      {field.description ? <Description>{field.description}</Description> : null}
      {error ? <FieldError>{error}</FieldError> : null}
    </TextField>
  );
};

const SelectInputField = ({ draft, error, field, fieldKey, onChange }: RenderFieldProps) => {
  if (field.control !== "select" || typeof draft !== "string") return null;

  return (
    <div className="grid gap-2">
      <label
        className="text-sm font-medium text-[var(--vp-c-text-1)]"
        htmlFor={`ensforge-demo-${fieldKey}`}
      >
        {field.label}
      </label>
      <NativeSelect fullWidth variant="secondary">
        <NativeSelect.Trigger
          id={`ensforge-demo-${fieldKey}`}
          value={draft}
          onChange={(event) => onChange(event.target.value)}
        >
          {field.options.map((option) => (
            <NativeSelect.Option key={option.value} value={option.value}>
              {option.label}
            </NativeSelect.Option>
          ))}
        </NativeSelect.Trigger>
      </NativeSelect>
      {field.description ? (
        <p className="m-0 text-xs leading-5 text-[var(--vp-c-text-2)]">{field.description}</p>
      ) : null}
      {error ? <p className="m-0 text-xs text-[var(--vp-c-danger-1)]">{error}</p> : null}
    </div>
  );
};

const ToggleInputField = ({ draft, field, onChange }: RenderFieldProps) => {
  if (field.control !== "toggle" || typeof draft !== "boolean") return null;

  return (
    <Switch isSelected={draft} onChange={onChange}>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Content>
        <span className="font-medium">{field.label}</span>
        {field.description ? (
          <span className="block text-xs text-[var(--vp-c-text-2)]">{field.description}</span>
        ) : null}
      </Switch.Content>
    </Switch>
  );
};

const ListInputField = ({ draft, error, field, fieldKey, onChange }: RenderFieldProps) => {
  const [candidate, setCandidate] = useState("");
  if (field.control !== "list" || !Array.isArray(draft)) return null;

  const values = draft as ReadonlyArray<string>;
  const add = () => {
    const value = candidate.trim();
    if (!value) return;
    onChange([...values, value]);
    setCandidate("");
  };
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter" && event.key !== ",") return;
    event.preventDefault();
    add();
  };

  return (
    <div className="grid gap-2">
      <label
        className="text-sm font-medium text-[var(--vp-c-text-1)]"
        htmlFor={`ensforge-demo-${fieldKey}`}
      >
        {field.label}
      </label>
      <div className="flex gap-2">
        <Input
          fullWidth
          id={`ensforge-demo-${fieldKey}`}
          value={candidate}
          variant="secondary"
          {...(field.placeholder ? { placeholder: field.placeholder } : {})}
          onChange={(event) => setCandidate(event.target.value)}
          onKeyDown={onKeyDown}
        />
        <Button size="sm" type="button" variant="secondary" onPress={add}>
          Add
        </Button>
      </div>
      {values.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {values.map((value, index) => (
            <Chip key={`${value}-${index}`} size="sm" variant="secondary">
              <Chip.Label>{value}</Chip.Label>
              <button
                aria-label={`Remove ${value}`}
                className="ml-1 text-[var(--vp-c-text-2)] hover:text-[var(--vp-c-text-1)]"
                type="button"
                onClick={() => onChange(values.filter((_, current) => current !== index))}
              >
                ×
              </button>
            </Chip>
          ))}
        </div>
      ) : null}
      {field.description ? (
        <p className="m-0 text-xs leading-5 text-[var(--vp-c-text-2)]">{field.description}</p>
      ) : null}
      {error ? <p className="m-0 text-xs text-[var(--vp-c-danger-1)]">{error}</p> : null}
    </div>
  );
};

export const RenderField = (props: RenderFieldProps) => {
  switch (props.field.control) {
    case "text":
      return <TextInputField {...props} />;
    case "select":
      return <SelectInputField {...props} />;
    case "toggle":
      return <ToggleInputField {...props} />;
    case "list":
      return <ListInputField {...props} />;
  }
};
