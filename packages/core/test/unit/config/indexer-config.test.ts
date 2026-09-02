import { describe, expect, it } from "vitest";

import { defaultIndexerEndpoints } from "../../../src/actions/indexer/index.js";
import { createConfig, ConfigError } from "../../../src/index.js";
import { makeMainnetPublicClient, makeSepoliaPublicClient } from "../fixtures/client-fixtures.js";

const emptyFetch = () => Promise.resolve(new Response()) as ReturnType<typeof globalThis.fetch>;

describe("indexer config", () => {
  it("selects network defaults and represents unavailable sources with null", () => {
    const mainnet = createConfig({ network: "mainnet", publicClient: makeMainnetPublicClient() });
    const sepolia = createConfig({ network: "sepolia", publicClient: makeSepoliaPublicClient() });

    expect(mainnet.indexer.endpoints).toEqual(defaultIndexerEndpoints.mainnet);
    expect(sepolia.indexer.endpoints).toEqual(defaultIndexerEndpoints.sepolia);
  });

  it("supports overrides and explicit source disabling", () => {
    const config = createConfig({
      network: "sepolia",
      publicClient: makeSepoliaPublicClient(),
      indexer: {
        endpoints: { v1: null, v2: "https://indexer.example/graphql" },
        headers: { Authorization: "Bearer secret" },
        fetch: emptyFetch,
        timeout: 2_000,
        retry: { attempts: 4 },
        failureMode: "partial",
        maximumPageSize: 25,
      },
    });

    expect(config.indexer.endpoints).toEqual({
      v1: null,
      v2: "https://indexer.example/graphql",
    });
    expect(JSON.stringify(config.indexer)).not.toContain("secret");
  });

  it("rejects endpoint credentials without exposing them", () => {
    const indexer = { endpoints: { v1: "https://user:secret@indexer.example/graphql" } };
    expect(() =>
      createConfig({
        network: "mainnet",
        publicClient: makeMainnetPublicClient(),
        indexer: indexer as never,
      }),
    ).toThrow(ConfigError);

    try {
      createConfig({
        network: "mainnet",
        publicClient: makeMainnetPublicClient(),
        indexer: indexer as never,
      });
    } catch (error) {
      expect((error as Error).message).not.toContain("secret");
    }
  });
});
