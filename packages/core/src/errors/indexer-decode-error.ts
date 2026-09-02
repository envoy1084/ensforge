import { Schema } from "effect";

import { EnsNetworkSchema } from "../config/network.js";

export class IndexerDecodeError extends Schema.TaggedError<IndexerDecodeError>()(
  "IndexerDecodeError",
  {
    code: Schema.Literal("INVALID_RESPONSE"),
    message: Schema.String,
    network: EnsNetworkSchema,
    protocol: Schema.Literals(["v1", "v2"]),
    operationName: Schema.String,
    cause: Schema.Defect(),
  },
) {}
