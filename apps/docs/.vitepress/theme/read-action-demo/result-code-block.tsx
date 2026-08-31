/* oxlint-disable react/no-danger -- Shiki returns escaped, trusted highlighted markup. */
import { useEffect, useRef, useState } from "react";

import { highlightCode } from "@thenamespace/uikit/code-block";

const copyToClipboard = async (value: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.focus();
    textarea.select();

    try {
      return document.execCommand("copy");
    } finally {
      textarea.remove();
    }
  }
};

export interface ResultCodeBlockProps {
  readonly code: string;
}

export function ResultCodeBlock({ code }: ResultCodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [highlighted, setHighlighted] = useState<string>();
  const resetTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    let isCurrent = true;
    setHighlighted(undefined);

    const highlight = async () => {
      try {
        const html = await highlightCode(code, {
          darkTheme: "vitesse-dark",
          language: "json",
          theme: "vitesse-light",
        });
        if (isCurrent) {
          setHighlighted(html.replace('class="shiki ', 'class="shiki vp-code '));
        }
      } catch {
        if (isCurrent) setHighlighted(undefined);
      }
    };
    void highlight();

    return () => {
      isCurrent = false;
    };
  }, [code]);

  useEffect(
    () => () => {
      clearTimeout(resetTimeout.current);
    },
    [],
  );

  const copy = async () => {
    if (!(await copyToClipboard(code))) return;

    setIsCopied(true);
    clearTimeout(resetTimeout.current);
    resetTimeout.current = setTimeout(() => setIsCopied(false), 2_000);
  };

  return (
    <div className="language-json vp-adaptive-theme">
      <button
        aria-label={isCopied ? "Copied" : "Copy code"}
        className={`copy${isCopied ? " copied" : ""}`}
        title={isCopied ? "Copied" : "Copy code"}
        type="button"
        onClick={() => void copy()}
      />
      <span className="lang">json</span>
      {highlighted ? (
        <div dangerouslySetInnerHTML={{ __html: highlighted }} />
      ) : (
        <pre className="shiki vp-code">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
