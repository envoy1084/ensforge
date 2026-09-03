interface MarkdownNode {
  attributes?: Array<{
    name?: string;
    type?: string;
    value?: unknown;
  }>;
  children?: MarkdownNode[];
  name?: string;
  type: string;
  url?: string;
}

const hrefOf = (node: MarkdownNode) => {
  const attribute = node.attributes?.find(
    ({ name, type }) => name === "href" && type === "mdxJsxAttribute",
  );
  return typeof attribute?.value === "string" ? attribute.value : undefined;
};

const transformChildren = (node: MarkdownNode) => {
  if (!node.children) return;

  node.children = node.children.flatMap((child) => {
    if (child.name === "ReadActionDemo") return [];

    if (child.name === "HomePage.Button") {
      const url = hrefOf(child);
      if (!url) return child.children ?? [];
      return [{ children: child.children ?? [], type: "link", url }];
    }

    transformChildren(child);
    return [child];
  });
};

export const interactiveOutput = () => (tree: MarkdownNode) => transformChildren(tree);
