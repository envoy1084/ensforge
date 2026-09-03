import type { ReactNode } from "react";

import { DocsShell } from "../components/docs-shell.client";

export default function Layout({ children }: { readonly children: ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
