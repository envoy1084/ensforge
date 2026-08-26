import { it } from "@effect/vitest";
import { Effect } from "effect";

import { expect } from "vitest";

import { packageName } from "./index.js";

it.effect("exposes the template package", () =>
  Effect.sync(() => {
    expect(packageName).toBe("@ensforge/template");
  }),
);
