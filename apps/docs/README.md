# ensforge docs

The documentation site is built with Vocs and rendered dynamically with Waku.

```sh
pnpm --filter @ensforge/docs dev
pnpm --filter @ensforge/docs build
pnpm --filter @ensforge/docs preview
```

The production site defaults to `https://ensforge.com`. Set `SITE_URL` during preview deployments to
override canonical URLs and the generated sitemap hostname.

Vocs generates the sitemap, robots directives, `llms.txt`, `llms-full.txt`, per-page Markdown, and
the MCP endpoint as part of the application.

## Authoring reference pages

API pages are written individually so their usage, parameters, return values, and examples can stay
specific to each operation. Repeated reference sections live in `shared/` and are imported into MDX
pages as components.

- `shared/core/` documents the dual Promise and Effect APIs used by Core actions.
- `shared/sdk/` documents the corresponding grouped SDK methods.
- `shared/react/` documents atom options, suspense behavior, and mutation results.
- `shared/contracts/` documents the common guidance for complete ABIs and focused fragments.

Keep operation-specific details on the reference page. Add content to a shared partial only when its
meaning and wording are identical everywhere it is included. Shared partials are excluded from page
generation, local search, the sitemap, and the generated LLM documentation.
