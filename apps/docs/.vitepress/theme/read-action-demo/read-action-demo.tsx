import { type FormEvent, useState } from "react";

import { Button } from "@thenamespace/uikit/button";
import { CodeBlock } from "@thenamespace/uikit/code-block";
import { Input } from "@thenamespace/uikit/input";
import { Segment } from "@thenamespace/uikit/segment";

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
          className="shrink-0"
          selectedKey={network}
          size="sm"
          onSelectionChange={(key) => setNetwork(String(key) as DemoNetwork)}
        >
          <Segment.Item id="mainnet">Mainnet</Segment.Item>
          <Segment.Item id="sepolia">Sepolia</Segment.Item>
        </Segment>
      </div>

      <form className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]" onSubmit={runAction}>
        {definition.fields.map((field) => (
          <Input
            fullWidth
            aria-label={field.label}
            id={`action-demo-${field.key}`}
            key={field.key}
            name={field.key}
            placeholder={field.placeholder}
            required={field.required}
            value={values[field.key] ?? ""}
            variant="secondary"
            onChange={(event) =>
              setValues((current) => ({ ...current, [field.key]: event.target.value }))
            }
          />
        ))}

        <Button className="w-full sm:w-auto" isDisabled={isRunning} type="submit" variant="primary">
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
                <CodeBlock.CopyButton code={result} />
              </CodeBlock.Header>
              <CodeBlock.Code code={result} language="json" />
            </CodeBlock>
          )}
        </div>
      )}
    </section>
  );
}
