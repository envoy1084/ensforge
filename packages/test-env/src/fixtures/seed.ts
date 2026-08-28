import { Effect } from "effect";

import type { DevnetEnvironment } from "../environment.js";
import { seedPermissionFixtures } from "./permissions.js";
import { seedResolverRecordFixtures } from "./resolver-records.js";
import { seedReverseFixtures } from "./reverse.js";
import { seedV1Fixtures } from "./v1.js";
import { seedV2Fixtures } from "./v2.js";

export const seedFixtures = Effect.fn("seedFixtures")(function* (environment: DevnetEnvironment) {
  const v1 = yield* seedV1Fixtures(environment);
  const fixtures = yield* seedV2Fixtures(environment, v1.v1);
  const records = yield* seedResolverRecordFixtures(environment);
  const permissions = yield* seedPermissionFixtures(environment);
  const reverse = yield* seedReverseFixtures(environment);
  yield* environment.state.checkpoint;
  return { ...fixtures, permissions, records, reverse };
});
