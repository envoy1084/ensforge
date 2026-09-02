import type { IndexerProtocol } from "../../../config/indexer-options.js";
import type { EnsNetwork } from "../../../config/network.js";

export interface IndexerNormalizationContext {
  readonly network: EnsNetwork;
  readonly protocol: IndexerProtocol;
  readonly indexedBlock: bigint;
  readonly operationName: string;
}
