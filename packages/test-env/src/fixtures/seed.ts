import { Effect } from "effect";

import type { DevnetEnvironment } from "../environment.js";
import { seedV1Fixtures } from "./v1.js";
import { seedV2Fixtures } from "./v2.js";

export const seedFixtures = Effect.fn("seedFixtures")(function* (environment: DevnetEnvironment) {
  const v1 = yield* seedV1Fixtures(environment);
  return yield* seedV2Fixtures(environment, v1.v1);
});
