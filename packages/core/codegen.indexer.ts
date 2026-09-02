import { globSync } from "node:fs";
import { relative } from "node:path";

import type { CodegenConfig } from "@graphql-codegen/cli";

const graphqlRoot = "graphql/indexer";

const scalarConfig = {
  strictScalars: true,
  defaultScalarType: "unknown",
  scalars: {
    BigDecimal: { input: "string", output: "string" },
    BigInt: { input: "string", output: "string" },
    Bytes: { input: "string", output: ["`", "0x$", "{string}", "`"].join("") },
    Int8: { input: "number", output: "number" },
    Timestamp: { input: "string", output: "string" },
  },
};

const operationConfig = {
  ...scalarConfig,
  immutableTypes: true,
  useTypeImports: true,
  dedupeFragments: true,
  preResolveTypes: true,
  enumsAsTypes: true,
};

const protocolOutput = (protocol: "v1" | "v2") => {
  const documentsRoot = `${graphqlRoot}/${protocol}/documents`;
  const fragments = globSync(`${documentsRoot}/fragments/**/*.graphql`);

  return Object.fromEntries(
    globSync(`${documentsRoot}/**/*.graphql`)
      .filter((document) => !document.startsWith(`${documentsRoot}/fragments/`))
      .map((document) => {
        const output = relative(documentsRoot, document).replace(/\.graphql$/u, ".ts");
        return [
          `src/internal/indexer/generated/${protocol}/${output}`,
          {
            schema: `${graphqlRoot}/${protocol}/schema.graphql`,
            documents: [document, ...fragments],
            plugins: ["typescript-operations", "typed-document-node"],
            config: operationConfig,
          },
        ];
      }),
  );
};

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: false,
  hooks: {
    afterAllFileWrite: ["oxfmt --write"],
  },
  generates: {
    ...protocolOutput("v1"),
    ...protocolOutput("v2"),
  },
};

export default config;
