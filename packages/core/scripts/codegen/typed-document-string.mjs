import { concatAST, Kind, print, visit } from "graphql";

const operationTypeSuffix = {
  query: "Query",
  mutation: "Mutation",
  subscription: "Subscription",
};

export const plugin = (_schema, documents) => {
  const sourceDocument = concatAST(
    documents.flatMap(({ document }) => (document ? [document] : [])),
  );
  const operations = sourceDocument.definitions.filter(
    (definition) => definition.kind === Kind.OPERATION_DEFINITION,
  );
  if (operations.some((operation) => operation.name === undefined)) {
    throw new Error("Generated indexer operations must be named");
  }
  const fragments = new Map(
    sourceDocument.definitions.flatMap((definition) =>
      definition.kind === Kind.FRAGMENT_DEFINITION ? [[definition.name.value, definition]] : [],
    ),
  );

  const operationSource = (operation) => {
    const selectedFragments = new Map();
    const selectFragments = (definition) => {
      visit(definition, {
        FragmentSpread(node) {
          const fragment = fragments.get(node.name.value);
          if (fragment === undefined || selectedFragments.has(node.name.value)) return;
          selectedFragments.set(node.name.value, fragment);
          selectFragments(fragment);
        },
      });
    };
    selectFragments(operation);
    return print({
      kind: Kind.DOCUMENT,
      definitions: [operation, ...selectedFragments.values()],
    });
  };

  return {
    prepend: ['import type { TypedDocumentString } from "../../document.js";'],
    content: operations
      .map((operation) => {
        const operationName = operation.name.value;
        const typeName = `${operationName}${operationTypeSuffix[operation.operation]}`;
        return `export const ${operationName}Document = ${JSON.stringify(operationSource(operation))} as TypedDocumentString<${typeName}, ${typeName}Variables>;`;
      })
      .join("\n"),
  };
};
