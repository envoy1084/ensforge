import { makeQueryAtom } from "./query.js";
import { makeStreamAtom } from "./stream.js";

export const getEnsEventsAtom = makeQueryAtom("events", (sdk) => sdk.events.getEnsEvents);
export const getNameHistoryAtom = makeQueryAtom("events", (sdk) => sdk.events.getNameHistory);
export const watchEnsEventsAtom = makeStreamAtom("events", (sdk) => sdk.events.watchEnsEvents);
