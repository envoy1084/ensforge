import { Schema } from "effect";

import { EnsNetworkSchema } from "../config/network.js";

export class IndexerUnavailableError extends Schema.TaggedError<IndexerUnavailableError>()(
  "IndexerUnavailableError",
  {
    code: Schema.Literal("SOURCE_UNAVAILABLE"),
    message: Schema.String,
    network: EnsNetworkSchema,
    protocol: Schema.Literals(["v1", "v2"]),
  },
) {}
