"use client";

import { getEnsEventsAtom, getNameHistoryAtom, watchEnsEventsAtom } from "../atoms/events.js";
import { makeQueryHook } from "./use-query.js";
import { makeSuspenseQueryHook } from "./use-suspense-query.js";

export const useEnsEvents = makeQueryHook(getEnsEventsAtom);
export const useEnsEventsSuspense = makeSuspenseQueryHook(getEnsEventsAtom);
export const useNameHistory = makeQueryHook(getNameHistoryAtom);
export const useNameHistorySuspense = makeSuspenseQueryHook(getNameHistoryAtom);
export const useWatchEnsEvents = makeQueryHook(watchEnsEventsAtom);
