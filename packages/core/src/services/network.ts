import { Context } from "effect";

import type { EnsChainId, EnsNetwork } from "../config/network.js";

export class EnsNetworkService extends Context.Service<
  EnsNetworkService,
  {
    readonly network: EnsNetwork;
    readonly chainId: EnsChainId;
  }
>()("@ensforge/core/EnsNetworkService") {}
