"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Segment } from "@thenamespace/uikit/segment";

import { ClientOnly } from "../client-only.client";
import { ResultCodeBlock } from "../code/result-code-block";
import { FormRenderer } from "../form/form-renderer";
import type { Network } from "../runtime/network";
import { getSdk } from "../runtime/sdk";
import { loadReadAction } from "./registry/manifest";
import type { AnyReadActionDefinition } from "./registry/types";

export interface ReadActionDemoProps {
  readonly action: string;
}

const stringifyResult = (result: unknown): string => {
  if (result === undefined) return "undefined";
  return JSON.stringify(
    result,
    (_, value: unknown) => (typeof value === "bigint" ? `${value}n` : value),
    2,
  );
};

const errorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === "object" && error !== null && "message" in error) {
    return String(error.message);
  }
  return String(error);
};

const initialNetwork = (): Network => {
  const stored = globalThis.localStorage?.getItem("ensforge-demo-network");
  return stored === "sepolia" ? "sepolia" : "mainnet";
};

function ReadActionDemoContent({ action }: ReadActionDemoProps) {
  const [definition, setDefinition] = useState<AnyReadActionDefinition>();
  const [loadError, setLoadError] = useState<string>();
  const [network, setNetwork] = useState<Network>(initialNetwork);
  const [result, setResult] = useState<string>();
  const [error, setError] = useState<string>();
  const [isRunning, setIsRunning] = useState(false);
  const execution = useRef(0);

  useEffect(() => {
    let current = true;
    setDefinition(undefined);
    setLoadError(undefined);
    void loadReadAction(action).then(
      (loaded) => {
        if (current) setDefinition(loaded);
        return undefined;
      },
      (cause) => {
        if (current) setLoadError(errorMessage(cause));
        return undefined;
      },
    );
    return () => {
      current = false;
    };
  }, [action]);

  const form = useMemo(() => definition?.createForm(network), [definition, network]);

  const selectNetwork = (nextNetwork: Network) => {
    execution.current += 1;
    setNetwork(nextNetwork);
    globalThis.localStorage?.setItem("ensforge-demo-network", nextNetwork);
    setResult(undefined);
    setError(undefined);
    setIsRunning(false);
  };

  const run = async (values: Readonly<Record<string, unknown>>) => {
    if (!definition) return;
    const currentExecution = execution.current + 1;
    execution.current = currentExecution;
    setError(undefined);
    setIsRunning(true);

    try {
      const sdk = await getSdk(network);
      const nextResult = await definition.execute({ sdk, values });
      if (execution.current === currentExecution) setResult(stringifyResult(nextResult));
    } catch (cause) {
      if (execution.current === currentExecution) {
        setResult(undefined);
        setError(errorMessage(cause));
      }
    } finally {
      if (execution.current === currentExecution) setIsRunning(false);
    }
  };

  return (
    <section className="ensforge-demo my-8 rounded-xl border border-[var(--vocs-border-color-primary)] p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="font-mono text-sm font-semibold text-[var(--vocs-text-color-heading)]">
          {definition?.label ?? action.split(".").at(-1)}
        </div>

        <Segment
          aria-label="Network"
          className="shrink-0 rounded-lg"
          selectedKey={network}
          size="sm"
          onSelectionChange={(key) => selectNetwork(String(key) as Network)}
        >
          <Segment.Item id="mainnet">Mainnet</Segment.Item>
          <Segment.Item id="sepolia">Sepolia</Segment.Item>
        </Segment>
      </div>

      {form ? (
        <FormRenderer
          definition={form}
          isSubmitting={isRunning}
          key={`${action}:${network}`}
          onSubmit={run}
        />
      ) : loadError ? (
        <p className="m-0 text-sm text-[var(--vocs-color-red)]">{loadError}</p>
      ) : (
        <p className="m-0 text-sm text-[var(--vocs-text-color-secondary)]">Loading example…</p>
      )}

      {error || result ? (
        <div aria-live="polite" className="mt-4">
          {error ? (
            <p className="m-0 break-words font-mono text-xs leading-6 text-[var(--vocs-color-red)]">
              {error}
            </p>
          ) : null}
          {result ? <ResultCodeBlock code={result} /> : null}
        </div>
      ) : null}
    </section>
  );
}

export function ReadActionDemo(props: ReadActionDemoProps) {
  return (
    <ClientOnly>
      <ReadActionDemoContent {...props} />
    </ClientOnly>
  );
}
