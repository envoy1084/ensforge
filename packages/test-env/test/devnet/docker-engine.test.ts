import { describe, expect, it } from "vitest";

import { parsePublishedPort } from "../../src/devnet/docker-engine.js";

describe("Docker port discovery", () => {
  it("parses the IPv4 loopback mapping selected by Docker", () => {
    expect(parsePublishedPort("127.0.0.1:49153\n")).toBe(49_153);
  });

  it("selects IPv4 when Docker also reports an IPv6 mapping", () => {
    expect(parsePublishedPort("[::]:49152\n127.0.0.1:49153\n")).toBe(49_153);
  });

  it("rejects missing and invalid port mappings", () => {
    expect(() => parsePublishedPort("0.0.0.0:49153\n")).toThrow(
      "Unable to parse a Docker published port",
    );
    expect(() => parsePublishedPort("127.0.0.1:99999\n")).toThrow(
      "Unable to parse a Docker published port",
    );
  });
});
