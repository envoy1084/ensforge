# ensforge docs

The documentation site is built with VitePress.

```sh
pnpm --filter @ensforge/docs dev
pnpm --filter @ensforge/docs build
pnpm --filter @ensforge/docs preview
```

Set `DOCS_URL` during production builds to control canonical URLs and the generated sitemap hostname.

The build also generates `llms.txt` and `llms-full.txt` through `vitepress-plugin-llms`.

## Authoring reference pages

API pages are written individually so their usage, parameters, return values, and examples can stay
specific to each operation. Repeated reference sections live in `shared/` and are included with
VitePress `<!--@include: ...-->` directives.

- `shared/core/` documents the dual Promise and Effect APIs used by Core actions.
- `shared/sdk/` documents the corresponding grouped SDK methods.
- `shared/react/` documents atom options, suspense behavior, and mutation results.
- `shared/contracts/` documents the common guidance for complete ABIs and focused fragments.

Keep operation-specific details on the reference page. Add content to a shared partial only when its
meaning and wording are identical everywhere it is included. Shared partials are excluded from page
generation, local search, the sitemap, and the generated LLM documentation.
