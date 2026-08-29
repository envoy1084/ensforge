import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  AuthorizationError,
  getText,
  sendCalls,
  setText,
  simulateCalls,
} from "../../../../src/index.js";
import { getIntegrationDevnet } from "../../setup/devnet.js";

describe("setText integration", () => {
  it.effect("sets a V1 text record through the direct Effect action", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const name = devnet.fixtures.v1.activeUnwrapped.name;
      const key = "com.ensforge.set-text.v1";
      const value = "written through ensforge";

      const result = yield* setText.effect(devnet.configs.v1, { name, key, value });
      const record = yield* getText.effect(devnet.configs.v1, { name, key });

      assert.strictEqual(result.status, "confirmed");
      assert.strictEqual(record.value, value);
    }),
  );

  it.effect("sets a scoped text record through a V2 Permissioned Resolver role", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.permissions.v2.permissionedResolver;
      const value = "ipfs://ensforge-permissioned-avatar";

      const result = yield* sendCalls.effect(devnet.configs.v2, {
        calls: [setText.call({ name: fixture.name, key: fixture.textKey, value })],
        account: devnet.fixtures.permissions.operator,
        mode: "sequential",
      });
      const record = yield* getText.effect(devnet.configs.v2, {
        name: fixture.name,
        key: fixture.textKey,
      });

      assert.strictEqual(result.status, "completed");
      assert.strictEqual(result.calls[0]?.status, "confirmed");
      assert.strictEqual(record.value, value);
    }),
  );

  it.effect("rejects a known unauthorized account before submission", () =>
    Effect.gen(function* () {
      const devnet = getIntegrationDevnet();
      const fixture = devnet.fixtures.permissions.v2.permissionedResolver;
      const error = yield* simulateCalls
        .effect(devnet.configs.v2, {
          calls: [
            setText.call({
              name: fixture.name,
              key: fixture.textKey,
              value: "unauthorized",
            }),
          ],
          account: devnet.fixtures.permissions.unauthorized,
        })
        .pipe(Effect.flip);

      assert.instanceOf(error, AuthorizationError);
      assert.strictEqual(error.code, "UNAUTHORIZED");
    }),
  );
});
