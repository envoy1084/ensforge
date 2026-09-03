import { globSync, readFileSync } from "node:fs";
import { relative } from "node:path";

import type { CodegenConfig } from "@graphql-codegen/cli";
import { Kind, parse, visit } from "graphql";

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

const fragmentDependencies = (document: string, fragments: ReadonlyArray<string>) => {
  const fragmentFiles = new Map(
    fragments.flatMap((file) =>
      parse(readFileSync(file, "utf8")).definitions.flatMap((definition) =>
        definition.kind === Kind.FRAGMENT_DEFINITION ? [[definition.name.value, file]] : [],
      ),
    ),
  );
  const selected = new Set<string>();
  const visitSpreads = (file: string) => {
    visit(parse(readFileSync(file, "utf8")), {
      FragmentSpread(node) {
        const dependency = fragmentFiles.get(node.name.value);
        if (dependency === undefined || selected.has(dependency)) return;
        selected.add(dependency);
        visitSpreads(dependency);
      },
    });
  };
  visitSpreads(document);
  return [...selected];
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
            documents: [document, ...fragmentDependencies(document, fragments)],
            plugins: ["typescript-operations", "./scripts/codegen/typed-document-string.mjs"],
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
