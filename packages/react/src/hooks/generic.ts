"use client";

import type {
  EnsReadRequest,
  GetRecordsError,
  GetRecordsParameters,
  GetRecordsResult,
  GetRecordsSelection,
  ReadBatchError,
  ReadBatchResult,
  ReadBatchSettledResult,
  RpcError,
} from "@ensforge/sdk";

import {
  getRecordsAtom,
  readBatchAtom,
  readBatchSettledAtom,
  type ReadBatchAtomParameters,
} from "../atoms/generic.js";
import type { UseEnsQueryParameters } from "../query/options.js";
import type { EnsQueryResult } from "../query/result.js";
import { useQueryAtom } from "./use-query.js";

type ReadRequests = Readonly<Record<string, EnsReadRequest<unknown, unknown>>>;

export const useRecords = <
  const Selection extends GetRecordsSelection,
  Selected = GetRecordsResult<Selection>,
>(
  input: UseEnsQueryParameters<
    GetRecordsParameters<Selection>,
    GetRecordsResult<Selection>,
    Selected
  >,
): EnsQueryResult<Selected, GetRecordsError> => useQueryAtom(getRecordsAtom, input);

export const useReadBatch = <
  const Requests extends ReadRequests,
  Selected = ReadBatchResult<Requests>,
>(
  input: UseEnsQueryParameters<
    ReadBatchAtomParameters<Requests>,
    ReadBatchResult<Requests>,
    Selected
  >,
): EnsQueryResult<Selected, ReadBatchError<Requests>> => useQueryAtom(readBatchAtom, input);

export const useReadBatchSettled = <
  const Requests extends ReadRequests,
  Selected = ReadBatchSettledResult<Requests>,
>(
  input: UseEnsQueryParameters<
    ReadBatchAtomParameters<Requests>,
    ReadBatchSettledResult<Requests>,
    Selected
  >,
): EnsQueryResult<Selected, RpcError> => useQueryAtom(readBatchSettledAtom, input);
