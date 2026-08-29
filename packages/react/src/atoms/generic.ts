import type {
  EnsReadRequest,
  GetRecordsError,
  GetRecordsParameters,
  GetRecordsResult,
  GetRecordsSelection,
  ReadBatchError,
  ReadBatchOptions,
  ReadBatchResult,
  ReadBatchSettledResult,
  RpcError,
} from "@ensforge/sdk";
import type { Ensforge } from "@ensforge/sdk";

import { makeQueryAtom, type EnsQueryAtom, type QueryAtomOptions } from "./query.js";

type ReadRequests = Readonly<Record<string, EnsReadRequest<unknown, unknown>>>;

export interface ReadBatchAtomParameters<Requests extends ReadRequests> {
  readonly options?: ReadBatchOptions;
  readonly requests: Requests;
}

const getRecordsAtomBase = makeQueryAtom<GetRecordsParameters, GetRecordsResult, GetRecordsError>(
  "records",
  (sdk) => sdk.records.getRecords,
);

export const getRecordsAtom = <const Selection extends GetRecordsSelection>(
  sdk: Ensforge,
  parameters: GetRecordsParameters<Selection>,
  options: QueryAtomOptions,
): EnsQueryAtom<GetRecordsResult<Selection>, GetRecordsError> =>
  getRecordsAtomBase(sdk, parameters, options) as EnsQueryAtom<
    GetRecordsResult<Selection>,
    GetRecordsError
  >;

const readBatchAtomBase = makeQueryAtom<
  ReadBatchAtomParameters<ReadRequests>,
  ReadBatchResult<ReadRequests>,
  ReadBatchError<ReadRequests>
>("batch", (sdk) => ({
  effect: ({ options, requests }) => sdk.batch.readBatch.effect(requests, options),
}));

export const readBatchAtom = <const Requests extends ReadRequests>(
  sdk: Ensforge,
  parameters: ReadBatchAtomParameters<Requests>,
  options: QueryAtomOptions,
): EnsQueryAtom<ReadBatchResult<Requests>, ReadBatchError<Requests>> =>
  readBatchAtomBase(sdk, parameters, options) as EnsQueryAtom<
    ReadBatchResult<Requests>,
    ReadBatchError<Requests>
  >;

const readBatchSettledAtomBase = makeQueryAtom<
  ReadBatchAtomParameters<ReadRequests>,
  ReadBatchSettledResult<ReadRequests>,
  RpcError
>("batch", (sdk) => ({
  effect: ({ options, requests }) => sdk.batch.readBatchSettled.effect(requests, options),
}));

export const readBatchSettledAtom = <const Requests extends ReadRequests>(
  sdk: Ensforge,
  parameters: ReadBatchAtomParameters<Requests>,
  options: QueryAtomOptions,
): EnsQueryAtom<ReadBatchSettledResult<Requests>, RpcError> =>
  readBatchSettledAtomBase(sdk, parameters, options) as EnsQueryAtom<
    ReadBatchSettledResult<Requests>,
    RpcError
  >;
