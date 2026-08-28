import { Effect } from "effect";

import type { DevnetEnvironment } from "../environment.js";
import { seedRead } from "./contract.js";
import { createDnsFixtures } from "./dns.js";
import { createEventFixtures } from "./events.js";
import { verifyFixtureManifest } from "./invariants.js";
import { seedPermissionFixtures } from "./permissions.js";
import { seedRegistrationFixtures } from "./registration.js";
import { seedResolverRecordFixtures } from "./resolver-records.js";
import { seedReverseFixtures } from "./reverse.js";
import { seedV1Fixtures } from "./v1.js";
import { seedV2Fixtures } from "./v2.js";

export const seedFixtures = Effect.fn("seedFixtures")(function* (environment: DevnetEnvironment) {
  const fromBlock = yield* Effect.promise(() => environment.clients.publicClient.getBlockNumber());
  const v1 = yield* seedV1Fixtures(environment);
  const fixtures = yield* seedV2Fixtures(environment, v1.v1);
  const records = yield* seedResolverRecordFixtures(environment);
  const permissions = yield* seedPermissionFixtures(environment);
  const reverse = yield* seedReverseFixtures(environment);
  const registration = yield* seedRegistrationFixtures(environment);
  const dns = createDnsFixtures(environment, records);
  const events = yield* Effect.promise(() => createEventFixtures(environment, fromBlock));
  const manifest = { ...fixtures, dns, events, permissions, records, registration, reverse };
  yield* seedRead(
    () => verifyFixtureManifest(environment, manifest),
    "The completed ENS fixture manifest failed verification",
  );
  yield* environment.state.checkpoint;
  return manifest;
});
