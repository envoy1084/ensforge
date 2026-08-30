import { createWagmiConfig, type CreateWagmiConfigParameters } from "@ensforge/core/wagmi";

import { Ensforge } from "./ensforge.js";

export type { CreateWagmiConfigParameters } from "@ensforge/core/wagmi";

export const createEnsforge = (parameters: CreateWagmiConfigParameters): Ensforge =>
  new Ensforge(createWagmiConfig(parameters));
