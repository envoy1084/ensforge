# Ensforge docs

The documentation site is built with VitePress.

```sh
pnpm --filter @ensforge/docs dev
pnpm --filter @ensforge/docs build
pnpm --filter @ensforge/docs preview
```

Set `DOCS_URL` during production builds to control canonical URLs and the generated sitemap hostname.

The build also generates `llms.txt` and `llms-full.txt` through `vitepress-plugin-llms`.
