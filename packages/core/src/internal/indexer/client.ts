import { Duration, Effect } from "effect";

import { print } from "graphql";
import {
  GraphQLClient,
  type RawRequestOptions,
  type RequestDocument,
  type Variables,
} from "graphql-request";

import type { EnsforgeConfig } from "../../config/config.js";
import { getIndexerRuntimeConfig } from "../../config/indexer-options.js";
import { IndexerConfigError } from "../../errors/indexer-config-error.js";
import type { IndexerDecodeError } from "../../errors/indexer-decode-error.js";
import type { IndexerRequestError } from "../../errors/indexer-request-error.js";
import type { IndexerGraphQLError as IndexerGraphQLErrorType } from "../../errors/indexer-response-error.js";
import type { IndexerUnavailableError } from "../../errors/indexer-unavailable-error.js";
import { indexerErrorFromCause, IndexerRequestTimeoutCause } from "./error.js";
import { resolveIndexerSource, type IndexerSource } from "./source.js";

export interface IndexerRequestParameters<VariablesType extends Variables = Variables> {
  readonly protocol: "v1" | "v2";
  readonly operationName: string;
  readonly document: RequestDocument;
  readonly variables?: VariablesType;
}

export interface IndexerTransportResult<Result> {
  readonly data: Result | undefined;
  readonly errors: ReadonlyArray<IndexerGraphQLErrorType>;
  readonly status: number;
  readonly extensions?: unknown;
}

export type IndexerTransportError =
  | IndexerConfigError
  | IndexerUnavailableError
  | IndexerRequestError
  | IndexerDecodeError;

const clients = new WeakMap<EnsforgeConfig["indexer"], Map<string, GraphQLClient>>();

const getClient = (config: EnsforgeConfig, source: IndexerSource): GraphQLClient => {
  let byProtocol = clients.get(config.indexer);
  if (byProtocol === undefined) {
    byProtocol = new Map();
    clients.set(config.indexer, byProtocol);
  }

  const existing = byProtocol.get(source.protocol);
  if (existing !== undefined) return existing;

  const runtime = getIndexerRuntimeConfig(config.indexer);
  const client = new GraphQLClient(source.endpoint, {
    errorPolicy: "all",
    ...(runtime.fetch === undefined ? {} : { fetch: runtime.fetch }),
  });
  byProtocol.set(source.protocol, client);
  return client;
};

const resolveHeaders = (
  config: EnsforgeConfig,
  source: IndexerSource,
): Effect.Effect<Readonly<Record<string, string>>, IndexerConfigError> => {
  const headers = getIndexerRuntimeConfig(config.indexer).headers;
  if (headers === undefined) return Effect.succeed({});
  if (typeof headers !== "function") return Effect.succeed({ ...headers });

  return Effect.tryPromise({
    try: () => Promise.resolve(headers({ network: source.network, protocol: source.protocol })),
    catch: (cause) =>
      new IndexerConfigError({
        code: "HEADERS_FAILED",
        message: `Unable to resolve headers for the ${source.identity} indexer`,
        cause,
      }),
  });
};

const normalizeErrors = (errors: ReadonlyArray<unknown> | undefined) =>
  (errors ?? []).flatMap((error): ReadonlyArray<IndexerGraphQLErrorType> => {
    if (typeof error !== "object" || error === null || !("message" in error)) return [];
    const candidate = error as {
      readonly message: unknown;
      readonly path?: ReadonlyArray<string | number>;
      readonly locations?: ReadonlyArray<{ readonly line: number; readonly column: number }>;
      readonly extensions?: unknown;
    };
    if (typeof candidate.message !== "string") return [];
    return [
      {
        message: candidate.message,
        ...(candidate.path === undefined ? {} : { path: [...candidate.path] }),
        ...(candidate.locations === undefined ? {} : { locations: [...candidate.locations] }),
        ...(candidate.extensions === undefined ? {} : { extensions: candidate.extensions }),
      },
    ];
  });

const printRequestDocument = (document: RequestDocument): string =>
  typeof document === "object" && document !== null && "kind" in document
    ? print(document)
    : String(document);

const requestOnce = <Result, VariablesType extends Variables>(
  config: EnsforgeConfig,
  source: IndexerSource,
  parameters: IndexerRequestParameters<VariablesType>,
  attempt: number,
): Effect.Effect<IndexerTransportResult<Result>, IndexerTransportError> =>
  Effect.gen(function* () {
    const headers = yield* resolveHeaders(config, source);
    const client = getClient(config, source);

    return yield* Effect.tryPromise({
      try: (signal) => {
        const controller = new AbortController();
        const abort = () => controller.abort(signal.reason);
        if (signal.aborted) abort();
        else signal.addEventListener("abort", abort, { once: true });

        let timer: ReturnType<typeof setTimeout> | undefined;
        const timeout = new Promise<never>((_resolve, reject) => {
          timer = setTimeout(() => {
            reject(new IndexerRequestTimeoutCause());
            controller.abort();
          }, config.indexer.timeout);
        });
        const pending = client.rawRequest<Result, VariablesType>({
          query: printRequestDocument(parameters.document),
          ...(parameters.variables === undefined ? {} : { variables: parameters.variables }),
          requestHeaders: headers,
          signal: controller.signal,
        } as RawRequestOptions<VariablesType>);

        return Promise.race([pending, timeout]).finally(() => {
          if (timer !== undefined) clearTimeout(timer);
          signal.removeEventListener("abort", abort);
        });
      },
      catch: (cause) => indexerErrorFromCause(source, parameters.operationName, attempt, cause),
    }).pipe(
      Effect.map((response) => ({
        data: response.data,
        errors: normalizeErrors(response.errors),
        status: response.status,
        ...(response.extensions === undefined ? {} : { extensions: response.extensions }),
      })),
    );
  });

const retryDelay = (error: IndexerRequestError, attempt: number): number => {
  if (error.retryAfter !== undefined) return Math.min(error.retryAfter, 30_000);
  const base = Math.min(250 * 2 ** (attempt - 1), 2_000);
  return Math.round(base * (0.75 + Math.random() * 0.5));
};

export const requestIndexer = <Result, VariablesType extends Variables = Variables>(
  config: EnsforgeConfig,
  parameters: IndexerRequestParameters<VariablesType>,
): Effect.Effect<IndexerTransportResult<Result>, IndexerTransportError> =>
  Effect.gen(function* () {
    const source = yield* Effect.try({
      try: () => resolveIndexerSource(config, parameters.protocol),
      catch: (cause) => cause as IndexerConfigError | IndexerUnavailableError,
    });

    const execute = (
      attempt: number,
    ): Effect.Effect<IndexerTransportResult<Result>, IndexerTransportError> =>
      requestOnce<Result, VariablesType>(config, source, parameters, attempt).pipe(
        Effect.catchTag("IndexerRequestError", (error) => {
          if (!error.retryable || attempt > config.indexer.retry.attempts) {
            return Effect.fail(error);
          }
          return Effect.sleep(Duration.millis(retryDelay(error, attempt))).pipe(
            Effect.andThen(execute(attempt + 1)),
          );
        }),
      );

    return yield* execute(1);
  });
