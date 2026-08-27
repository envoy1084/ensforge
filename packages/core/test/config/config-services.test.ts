import { Effect, Layer, Option } from "effect";

import { describe, expect, it } from "vitest";

import { getConfigLayer, provideConfig } from "../../src/config/internal.js";
import { defineAction, createConfig, type EnsforgeConfig } from "../../src/index.js";
import { EthereumClient } from "../../src/internal/client/ethereum-client.js";
import { DeploymentService } from "../../src/services/deployment.js";
import { EnsNetworkService } from "../../src/services/network.js";
import { PublicClientService } from "../../src/services/public-client.js";
import { WalletClientService } from "../../src/services/wallet-client.js";
import { makeSepoliaPublicClient, makeSepoliaWalletClient } from "../fixtures/client-fixtures.js";

const inspectServices = Effect.gen(function* () {
  const network = yield* EnsNetworkService;
  const publicClient = yield* PublicClientService;
  const ethereumClient = yield* EthereumClient;
  const walletClient = yield* WalletClientService;
  const deployments = yield* DeploymentService;

  return { network, publicClient, ethereumClient, walletClient, deployments };
});

describe("config Effect services", () => {
  it("provides the original clients and selected deployments", async () => {
    const publicClient = makeSepoliaPublicClient();
    const walletClient = makeSepoliaWalletClient();
    const config = createConfig({ network: "sepolia", publicClient, walletClient });

    const services = await Effect.runPromise(
      Effect.provide(inspectServices, getConfigLayer(config)),
    );

    expect(services.network).toEqual({ network: "sepolia", chainId: 11155111 });
    expect(services.publicClient.client).toBe(publicClient);
    expect(services.ethereumClient.readContract).toBeTypeOf("function");
    expect(services.ethereumClient.readContractDirect).toBeTypeOf("function");
    expect(services.ethereumClient.multicall).toBeTypeOf("function");
    expect(Option.getOrUndefined(services.walletClient.client)).toBe(walletClient);
    expect(services.deployments.profile).toBe(config.deployments);
  });

  it("provides the same context to Promise and Effect action forms", async () => {
    const publicClient = makeSepoliaPublicClient();
    const config = createConfig({ network: "sepolia", publicClient });
    const implementation = Effect.fn("ensforge.test.inspectConfig")(function* (
      currentConfig: EnsforgeConfig,
      parameters: undefined,
    ) {
      void parameters;
      return yield* provideConfig(
        currentConfig,
        Effect.gen(function* () {
          const network = yield* EnsNetworkService;
          const client = yield* PublicClientService;
          return { network, client: client.client };
        }),
      );
    });
    const inspectConfig = defineAction(implementation);

    const promiseResult = await inspectConfig(config, undefined);
    const effectResult = await Effect.runPromise(inspectConfig.effect(config, undefined));

    expect(promiseResult).toEqual({
      network: { network: "sepolia", chainId: 11155111 },
      client: publicClient,
    });
    expect(effectResult).toEqual(promiseResult);
  });

  it("allows individual services to be replaced deterministically", async () => {
    const replacement = makeSepoliaPublicClient();
    const program = PublicClientService.useSync(({ client }) => client);

    const result = await Effect.runPromise(
      Effect.provide(
        program,
        Layer.succeed(PublicClientService, {
          client: replacement,
        }),
      ),
    );

    expect(result).toBe(replacement);
  });
});
