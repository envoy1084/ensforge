import { ClientError } from "graphql-request";

import { IndexerDecodeError } from "../../errors/indexer-decode-error.js";
import { IndexerRequestError } from "../../errors/indexer-request-error.js";
import type { IndexerSource } from "./source.js";

const retryableStatuses = new Set([408, 429, 500, 502, 503, 504]);

export class IndexerRequestTimeoutCause extends Error {
  override readonly name = "IndexerRequestTimeoutCause";
}

const retryAfterMilliseconds = (headers: Headers | undefined): number | undefined => {
  const value = headers?.get("retry-after");
  if (value === null || value === undefined) return undefined;

  const seconds = Number(value);
  if (Number.isFinite(seconds) && seconds >= 0) return seconds * 1_000;

  const date = Date.parse(value);
  return Number.isNaN(date) ? undefined : Math.max(0, date - Date.now());
};

export const indexerErrorFromCause = (
  source: IndexerSource,
  operationName: string,
  attempt: number,
  cause: unknown,
): IndexerRequestError | IndexerDecodeError => {
  if (cause instanceof IndexerRequestTimeoutCause) {
    return new IndexerRequestError({
      code: "REQUEST_TIMEOUT",
      message: `The ${source.identity} indexer request timed out`,
      network: source.network,
      protocol: source.protocol,
      operationName,
      attempt,
      retryable: true,
      cause,
    });
  }

  if (cause instanceof SyntaxError) {
    return new IndexerDecodeError({
      code: "INVALID_RESPONSE",
      message: `The ${source.identity} indexer returned malformed JSON`,
      network: source.network,
      protocol: source.protocol,
      operationName,
      cause,
    });
  }

  if (cause instanceof ClientError) {
    const status = cause.response.status;
    const retryAfter = retryAfterMilliseconds(cause.response.headers);
    return new IndexerRequestError({
      code: "HTTP_FAILED",
      message: `The ${source.identity} indexer request failed with HTTP ${status}`,
      network: source.network,
      protocol: source.protocol,
      operationName,
      attempt,
      retryable: retryableStatuses.has(status),
      status,
      ...(retryAfter === undefined ? {} : { retryAfter }),
      cause,
    });
  }

  const aborted =
    (cause instanceof DOMException && cause.name === "AbortError") ||
    (cause instanceof Error && cause.name === "AbortError");
  return new IndexerRequestError({
    code: aborted ? "REQUEST_ABORTED" : "TRANSPORT_FAILED",
    message: aborted
      ? `The ${source.identity} indexer request was aborted`
      : `Unable to reach the ${source.identity} indexer`,
    network: source.network,
    protocol: source.protocol,
    operationName,
    attempt,
    retryable: !aborted,
    cause,
  });
};
