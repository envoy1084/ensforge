import { type ReactElement, type SVGProps, useEffect, useRef, useState } from "react";

import { Button } from "@thenamespace/uikit/button";

const CopyIcon = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg fill="none" height="16" viewBox="0 0 16 16" width="16" {...props}>
    <path
      d="M5.5 5.5h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M10.5 3.5v-1a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
    />
  </svg>
);

const CheckIcon = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg fill="none" height="16" viewBox="0 0 16 16" width="16" {...props}>
    <path
      d="m3 8.5 3 3 7-7"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const copyToClipboard = async (value: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(value);
    return;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();

    const copied = document.execCommand("copy");
    textarea.remove();
    if (!copied) throw new Error("Unable to copy JSON result");
  }
};

export interface CopyJsonButtonProps {
  readonly value: string;
}

export function CopyJsonButton({ value }: CopyJsonButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const resetTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(
    () => () => {
      clearTimeout(resetTimeout.current);
    },
    [],
  );

  const copy = async () => {
    await copyToClipboard(value);
    setIsCopied(true);
    clearTimeout(resetTimeout.current);
    resetTimeout.current = setTimeout(() => setIsCopied(false), 2_000);
  };

  return (
    <Button
      isIconOnly
      aria-label={isCopied ? "JSON copied" : "Copy JSON"}
      className="rounded-lg"
      size="sm"
      variant="ghost"
      onPress={copy}
    >
      {isCopied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  );
}
