import { Effect } from "effect";

import type { EnsforgeConfig } from "../../../../config/config.js";
import { IndexerDecodeError } from "../../../../errors/indexer-decode-error.js";
import { requestIndexer } from "../../../../internal/indexer/client.js";
import {
  V2GetNamesForAddressDocument,
  type V2GetNamesForAddressQuery,
  type V2GetNamesForAddressQueryVariables,
} from "../../../../internal/indexer/generated/v2/get-names-for-address.js";
import {
  V2GetRelatedNamesDocument,
  type V2GetRelatedNamesQuery,
  type V2GetRelatedNamesQueryVariables,
} from "../../../../internal/indexer/generated/v2/get-related-names.js";
import { normalizeV2IndexerName } from "../../../../internal/indexer/normalize/v2-name.js";
import { matchesNameFilter } from "../../../../internal/indexer/query/name-filter.js";
import { decodeIndexedBlock, requireIndexerData } from "../../../../internal/indexer/response.js";
import type { EthereumAddress } from "../../../../schemas/identity.js";
import type { NameRelation, RelatedIndexedName } from "../../models/name.js";
import type { NameFilter } from "../../models/query.js";
import type { GetNamesForAddressError } from "./types.js";

const operationName = "V2GetNamesForAddress";
const relatedOperationName = "V2GetRelatedNames";
const batchSize = 250;

type V2Wire = V2GetNamesForAddressQuery["owned"]["edges"][number]["node"];

export const collectV2NamesForAddress = Effect.fn("collectV2NamesForAddress")(function* (
  config: EnsforgeConfig,
  address: EthereumAddress,
  selectedRelations: ReadonlySet<NameRelation>,
  filter: NameFilter,
): Effect.fn.Return<
  { readonly names: ReadonlyArray<RelatedIndexedName>; readonly indexedBlock: bigint },
  GetNamesForAddressError
> {
  const relationMap = new Map<
    string,
    { readonly wire: V2Wire; readonly relations: Set<NameRelation> }
  >();
  const roleNames = new Set<string>();
  const cursors = {
    owner: null as string | null,
    resolved: null as string | null,
    registration: null as string | null,
    role: null as string | null,
  };
  const active = {
    owner:
      selectedRelations.has("owner") ||
      selectedRelations.has("manager") ||
      selectedRelations.has("wrapped-owner"),
    resolved: selectedRelations.has("resolved-address"),
    registration: selectedRelations.has("registrant"),
    role: selectedRelations.has("role-holder"),
  };
  let indexedBlock = 0n;

  const add = (wire: V2Wire, relation: NameRelation) => {
    const key = wire.id.toLowerCase();
    const existing = relationMap.get(key);
    if (existing === undefined) relationMap.set(key, { wire, relations: new Set([relation]) });
    else existing.relations.add(relation);
  };

  while (Object.values(active).some(Boolean)) {
    const response = yield* requestIndexer<
      V2GetNamesForAddressQuery,
      V2GetNamesForAddressQueryVariables
    >(config, {
      protocol: "v2",
      operationName,
      document: V2GetNamesForAddressDocument,
      variables: {
        address: address.toLowerCase(),
        first: batchSize,
        ownerAfter: cursors.owner,
        resolvedAfter: cursors.resolved,
        registrationAfter: cursors.registration,
        roleAfter: cursors.role,
        includeUnreachable: filter.includeUnreachable === true,
      },
    });
    const data = yield* requireIndexerData(config, "v2", operationName, response);
    indexedBlock = yield* decodeIndexedBlock(
      config,
      "v2",
      operationName,
      data["_meta"].block.number,
    );
    if (active.owner) {
      for (const { node } of data.owned.edges) {
        add(node, "owner");
        add(node, "manager");
        if (node.wrappedOwner?.id.toLowerCase() === address.toLowerCase())
          add(node, "wrapped-owner");
      }
    }
    if (active.resolved) for (const { node } of data.resolved.edges) add(node, "resolved-address");
    if (active.registration)
      for (const { node } of data.registrations.edges) add(node.domain, "registrant");
    if (active.role)
      for (const { node } of data.roles.edges) if (node.name !== null) roleNames.add(node.name);

    for (const [key, connection] of [
      ["owner", data.owned],
      ["resolved", data.resolved],
      ["registration", data.registrations],
      ["role", data.roles],
    ] as const) {
      if (!active[key]) continue;
      const next = connection.pageInfo.endCursor;
      if (connection.pageInfo.hasNextPage && (next === null || next === cursors[key])) {
        return yield* new IndexerDecodeError({
          code: "INVALID_RESPONSE",
          message: "The V2 indexer returned a non-advancing relation cursor",
          network: config.network,
          protocol: "v2",
          operationName,
          cause: connection.pageInfo,
        });
      }
      cursors[key] = next;
      active[key] = connection.pageInfo.hasNextPage;
    }
  }

  const roleNameList = [...roleNames];
  for (let offset = 0; offset < roleNameList.length; offset += batchSize) {
    const chunk = roleNameList.slice(offset, offset + batchSize);
    const response = yield* requestIndexer<V2GetRelatedNamesQuery, V2GetRelatedNamesQueryVariables>(
      config,
      {
        protocol: "v2",
        operationName: relatedOperationName,
        document: V2GetRelatedNamesDocument,
        variables: {
          first: chunk.length,
          names: chunk,
          includeUnreachable: filter.includeUnreachable === true,
        },
      },
    );
    const data = yield* requireIndexerData(config, "v2", relatedOperationName, response);
    for (const wire of data.domains) add(wire, "role-holder");
  }

  const names: Array<RelatedIndexedName> = [];
  for (const { wire, relations } of relationMap.values()) {
    const selected = [...relations].filter((relation) => selectedRelations.has(relation));
    if (selected.length === 0) continue;
    const item = yield* normalizeV2IndexerName(wire, {
      network: config.network,
      protocol: "v2",
      indexedBlock,
      operationName,
    });
    if (matchesNameFilter(item, filter)) names.push({ ...item, relations: selected });
  }
  return { names, indexedBlock };
});
