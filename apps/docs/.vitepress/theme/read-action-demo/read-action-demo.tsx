import { type FormEvent, useState } from "react";

import { Button } from "@thenamespace/uikit/button";
import { CodeBlock } from "@thenamespace/uikit/code-block";
import { Input } from "@thenamespace/uikit/input";
import { Segment } from "@thenamespace/uikit/segment";

import { CopyJsonButton } from "./copy-json-button";
import {
  type DemoNetwork,
  getDemoSdk,
  type ReadActionId,
  readActionDefinitions,
} from "./definitions";

export interface ReadActionDemoProps {
  readonly action: ReadActionId;
}

const stringifyResult = (result: unknown): string =>
  JSON.stringify(
    result,
    (_, value: unknown) => (typeof value === "bigint" ? `${value}n` : value),
    2,
  );

const errorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export function ReadActionDemo({ action }: ReadActionDemoProps) {
  const definition = readActionDefinitions[action];
  const [network, setNetwork] = useState<DemoNetwork>("mainnet");
  const [values, setValues] = useState<Record<string, string>>({ ...definition.initialValues });
  const [result, setResult] = useState<string>();
  const [error, setError] = useState<string>();
  const [isRunning, setIsRunning] = useState(false);

  const runAction = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(undefined);
    setIsRunning(true);

    try {
      const nextResult = await definition.run(getDemoSdk(network), values);
      setResult(stringifyResult(nextResult));
    } catch (cause) {
      setResult(undefined);
      setError(errorMessage(cause));
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <section className="ensforge-read-demo my-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="font-mono text-sm font-semibold text-[var(--vp-c-text-1)]">
          {definition.label}
        </div>

        <Segment
          aria-label="Network"
          className="shrink-0 rounded-xl"
          selectedKey={network}
          size="sm"
        >
          <Segment.Item id="mainnet" onPress={() => setNetwork("mainnet")}>
            Mainnet
          </Segment.Item>
          <Segment.Item id="sepolia" onPress={() => setNetwork("sepolia")}>
            Sepolia
          </Segment.Item>
        </Segment>
      </div>

      <form className="grid gap-4" onSubmit={runAction}>
        {definition.fields.map((field) => (
          <label className="grid gap-2" htmlFor={`action-demo-${field.key}`} key={field.key}>
            <span className="text-sm font-medium text-[var(--vp-c-text-1)]">{field.label}</span>
            <Input
              fullWidth
              className="rounded-xl"
              id={`action-demo-${field.key}`}
              name={field.key}
              placeholder={field.placeholder}
              required={field.required}
              value={values[field.key] ?? ""}
              variant="secondary"
              onChange={(event) =>
                setValues((current) => ({ ...current, [field.key]: event.target.value }))
              }
            />
          </label>
        ))}

        <Button
          fullWidth
          className="rounded-xl"
          isDisabled={isRunning}
          type="submit"
          variant="primary"
        >
          {isRunning ? "Reading…" : "Run"}
        </Button>
      </form>

      {(error || result) && (
        <div aria-live="polite" className="mt-4">
          {error && (
            <p className="m-0 break-words font-mono text-xs leading-6 text-[var(--vp-c-danger-1)]">
              {error}
            </p>
          )}
          {result && (
            <CodeBlock>
              <CodeBlock.Header>
                <span className="font-mono text-xs">JSON result</span>
                <CopyJsonButton value={result} />
              </CodeBlock.Header>
              <CodeBlock.Code code={result} language="json" />
            </CodeBlock>
          )}
        </div>
      )}
    </section>
  );
}
