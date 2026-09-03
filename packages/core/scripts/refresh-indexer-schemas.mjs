import { createHash } from "node:crypto";
import { resolve } from "node:path";

import * as NodeHttpClient from "@effect/platform-node/NodeHttpClient";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as NodeServices from "@effect/platform-node/NodeServices";
import { Data, DateTime, Effect, FileSystem, Layer, Predicate, Schedule } from "effect";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";

import {
  buildClientSchema,
  getIntrospectionQuery,
  lexicographicSortSchema,
  printSchema,
} from "graphql";

const root = resolve(import.meta.dirname, "..");
const sources = {
  v1: [
    {
      network: "mainnet",
      url: "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
    },
    {
      network: "sepolia",
      url: "https://api.studio.thegraph.com/query/49574/enssepolia/version/latest",
    },
  ],
  v2: [{ network: "sepolia", url: "https://staging-graphql.ens.dev/graphql" }],
};

class SchemaRefreshError extends Data.TaggedError("SchemaRefreshError") {}

const requestSchema = Effect.fn("requestSchema")(function* ({ url }) {
  const client = yield* HttpClient.HttpClient;
  const request = yield* HttpClientRequest.post(url).pipe(
    HttpClientRequest.bodyJson({
      operationName: "IntrospectionQuery",
      query: getIntrospectionQuery({ descriptions: true }),
    }),
  );
  const response = yield* client.execute(request).pipe(
    Effect.mapError(
      (cause) =>
        new SchemaRefreshError({
          message: "Schema introspection request failed",
          retryable: true,
          cause,
        }),
    ),
  );
  const body = yield* response.json.pipe(
    Effect.mapError(
      (cause) =>
        new SchemaRefreshError({
          message: "Schema introspection returned invalid JSON",
          retryable: response.status === 429 || response.status >= 500,
          status: response.status,
          cause,
        }),
    ),
  );

  if (
    response.status >= 200 &&
    response.status < 300 &&
    Predicate.isObject(body) &&
    "data" in body
  ) {
    return yield* Effect.try({
      try: () => `${printSchema(lexicographicSortSchema(buildClientSchema(body.data)))}\n`,
      catch: (cause) =>
        new SchemaRefreshError({
          message: "Schema introspection returned invalid data",
          retryable: false,
          cause,
        }),
    });
  }

  return yield* new SchemaRefreshError({
    message: `Schema introspection failed with HTTP ${response.status}`,
    retryable: response.status === 429 || response.status >= 500,
    status: response.status,
  });
});

const introspect = Effect.fn("introspect")(function* (source) {
  return yield* requestSchema(source).pipe(
    Effect.retry({
      times: 3,
      schedule: Schedule.exponential("500 millis"),
      while: (error) => error.retryable,
    }),
  );
});

const fingerprint = (schema) => createHash("sha256").update(schema).digest("hex");

const writeSchema = Effect.fn("writeSchema")(function* (protocol, schema, protocolSources) {
  const fileSystem = yield* FileSystem.FileSystem;
  const directory = resolve(root, "graphql/indexer", protocol);
  const retrievedAt = DateTime.formatIso(yield* DateTime.now);
  yield* fileSystem.makeDirectory(directory, { recursive: true });
  yield* Effect.all(
    [
      fileSystem.writeFileString(resolve(directory, "schema.graphql"), schema),
      fileSystem.writeFileString(
        resolve(directory, "schema.metadata.json"),
        `${JSON.stringify(
          {
            protocol,
            retrievedAt,
            sha256: fingerprint(schema),
            sources: protocolSources,
          },
          null,
          2,
        )}\n`,
      ),
    ],
    { concurrency: "unbounded" },
  );
});

const program = Effect.gen(function* () {
  const v1Schemas = yield* Effect.all(sources.v1.map(introspect), {
    concurrency: "unbounded",
  });
  const v1Fingerprints = v1Schemas.map(fingerprint);
  if (new Set(v1Fingerprints).size !== 1) {
    return yield* new SchemaRefreshError({
      message: `ENSv1 schemas differ between Mainnet and Sepolia: ${v1Fingerprints.join(", ")}`,
      retryable: false,
    });
  }

  const v2Schema = yield* introspect(sources.v2[0]);
  yield* Effect.all(
    [writeSchema("v1", v1Schemas[0], sources.v1), writeSchema("v2", v2Schema, sources.v2)],
    { concurrency: "unbounded" },
  );
});

const nodeLayer = Layer.merge(NodeServices.layer, NodeHttpClient.layerUndici);
NodeRuntime.runMain(program.pipe(Effect.provide(nodeLayer)));
