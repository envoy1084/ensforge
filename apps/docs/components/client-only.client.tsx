"use client";

import { useEffect, useState, type ReactNode } from "react";

export function ClientOnly({ children }: { readonly children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return <div style={{ display: "contents" }}>{mounted ? children : null}</div>;
}
