---
title: Why Ensforge
description: Learn how the contracts package organizes ENS contract definitions.
---

# Why Ensforge

The contracts package provides a stable, typed view of the contracts used by Ensforge. Exports are
organized by ENS generation and responsibility instead of exposing one monolithic ABI bundle.

- Complete ABIs support advanced reads, event decoding, and tooling.
- Focused fragments keep application imports tree-shakable.
- Resolver profiles compose standard record interfaces.
- Deployment objects keep addresses and provenance together.
- ENSv1 and ENSv2 entrypoints prevent accidental cross-generation imports.

The package contains no client or runtime. Its values are immutable definitions designed for viem
and other ABI-compatible tooling.
