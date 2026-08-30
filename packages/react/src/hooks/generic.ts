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
import type { UseEnsAtomParameters } from "../query/options.js";
import type { EnsAtomResult } from "../query/result.js";
import { useQueryAtom } from "./use-query.js";

type ReadRequests = Readonly<Record<string, EnsReadRequest<unknown, unknown>>>;

export const useRecords = <
  const Selection extends GetRecordsSelection,
  Selected = GetRecordsResult<Selection>,
>(
  input: UseEnsAtomParameters<
    GetRecordsParameters<Selection>,
    GetRecordsResult<Selection>,
    GetRecordsError,
    Selected
  >,
): EnsAtomResult<Selected, GetRecordsError> => useQueryAtom(getRecordsAtom, input);

export const useReadBatch = <
  const Requests extends ReadRequests,
  Selected = ReadBatchResult<Requests>,
>(
  input: UseEnsAtomParameters<
    ReadBatchAtomParameters<Requests>,
    ReadBatchResult<Requests>,
    ReadBatchError<Requests>,
    Selected
  >,
): EnsAtomResult<Selected, ReadBatchError<Requests>> => useQueryAtom(readBatchAtom, input);

export const useReadBatchSettled = <
  const Requests extends ReadRequests,
  Selected = ReadBatchSettledResult<Requests>,
>(
  input: UseEnsAtomParameters<
    ReadBatchAtomParameters<Requests>,
    ReadBatchSettledResult<Requests>,
    RpcError,
    Selected
  >,
): EnsAtomResult<Selected, RpcError> => useQueryAtom(readBatchSettledAtom, input);
