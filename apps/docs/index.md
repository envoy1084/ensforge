---
layout: home
title: Ensforge
titleTemplate: false
description: Type-safe tools for reading, writing, and building applications on ENS.

hero:
  name: Ensforge
  text: ENS, forged into an SDK.
  tagline: One typed interface for names, records, registration, migration, batching, and React applications.
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: Explore the SDK
      link: /sdk/
    - theme: alt
      text: View on GitHub
      link: https://github.com/envoy1084/ensforge

features:
  - title: One ENS model
    details: Read and write ENS names through a consistent API across supported protocol generations and migration states.
    link: /core/
    linkText: Explore Core
  - title: Promise or Effect
    details: Every core action exposes a familiar Promise API and its typed Effect counterpart from the same implementation.
    link: /core/
    linkText: Explore Core
  - title: Reads that travel together
    details: Compose compatible requests into Multicall-backed batches while preserving each action's result type.
    link: /core/
    linkText: Explore Core
  - title: A client that stays organized
    details: Bind configuration once and navigate focused groups for names, records, registration, migration, DNS, and more.
    link: /sdk/
    linkText: Explore the SDK
  - title: Reactive React hooks
    details: Provider-driven query and mutation hooks powered by Effect Atom, with caching, Suspense, and invalidation.
    link: /react/
    linkText: Build with React
  - title: Contracts included
    details: Tree-shakable ABI fragments, complete interfaces, and versioned deployment metadata for direct viem usage.
    link: /contracts/
    linkText: Browse contracts
---

<ResolutionPath />
