---
"@ensforge/core": minor
---

Add relation-aware address discovery, indexed resolved-name lookup, name search, cross-protocol
subname pagination, evidence-based encoded-label recovery, record inventories, and resolver-record
history to the indexer entrypoints. Add cross-protocol registration discovery and unified semantic
name/event history with focused registration history queries. Add V2 registry, namespace
relationship, and role-assignment discovery.
Add cross-protocol resolver details plus V2 resolver ownership, ENSIP-16 metadata, and delegate
approval discovery.
Use the newer ENS staging GraphQL deployment for Sepolia V2 discovery and validate live coverage
against the indexed `ensforge-smoke.eth` fixture hierarchy.
Keep registration feeds server-filterable, require bounded resolver-approval selectors, default
address discovery to effective ownership, and push registry role resource filters into the V2
connection. Require a name anchor for semantic event kinds that the V2 indexer cannot filter by
wire event type.
