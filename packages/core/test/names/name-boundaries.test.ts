import { describe, expect, it } from "vitest";

import { NameError, normalizeLabel, normalizeName } from "../../src/index.js";

describe("name boundaries", () => {
  it("maps invalid names to the stable public error", () => {
    expect(() => normalizeName("foo..eth")).toThrow(
      new NameError({ code: "INVALID_NAME", message: "Invalid ENS name: foo..eth" }),
    );
  });

  it("rejects a full name where one label is required", () => {
    expect(() => normalizeLabel("foo.eth")).toThrow(
      new NameError({ code: "INVALID_LABEL", message: "Invalid ENS label: foo.eth" }),
    );
  });
});
