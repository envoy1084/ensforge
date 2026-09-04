"use client";

/* oxlint-disable react/no-danger -- Shiki returns escaped, trusted highlighted markup. */
import { useEffect, useState } from "react";

import { highlightCode } from "@thenamespace/uikit/code-block";
import { CodeBlock as VocsCodeBlock } from "vocs/code-block";

const extractHighlightedCode = (html: string): string | undefined => {
  const document = new DOMParser().parseFromString(html, "text/html");
  return document.querySelector("code")?.innerHTML;
};

export interface ResultCodeBlockProps {
  readonly code: string;
}

export function ResultCodeBlock({ code }: ResultCodeBlockProps) {
  const [highlighted, setHighlighted] = useState<string>();

  useEffect(() => {
    let current = true;
    setHighlighted(undefined);

    void highlightCode(code, {
      darkTheme: "vitesse-dark",
      language: "json",
      theme: "vitesse-light",
    }).then(
      (html) => {
        if (current) setHighlighted(extractHighlightedCode(html));
        return undefined;
      },
      () => {
        if (current) setHighlighted(undefined);
        return undefined;
      },
    );

    return () => {
      current = false;
    };
  }, [code]);

  if (highlighted === undefined) {
    return (
      <div
        aria-label="Formatting JSON result"
        className="h-28 animate-pulse rounded-lg border border-[var(--vocs-border-color-primary)] bg-[var(--vocs-background-color-surfaceTint)] motion-reduce:animate-none"
        role="status"
      />
    );
  }

  return (
    <VocsCodeBlock className="shiki ensforge-result-code" data-v-lang="json" key={code}>
      <code dangerouslySetInnerHTML={{ __html: highlighted }} />
    </VocsCodeBlock>
  );
}
