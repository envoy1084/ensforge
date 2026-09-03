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

  return (
    <VocsCodeBlock
      className="shiki ensforge-result-code"
      data-v-lang="json"
      key={highlighted ? code : "loading"}
    >
      {highlighted ? (
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      ) : (
        <code>{code}</code>
      )}
    </VocsCodeBlock>
  );
}
