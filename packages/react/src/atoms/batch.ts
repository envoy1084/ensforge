import { makeMutationAtom } from "./mutation.js";
import { makeQueryAtom } from "./query.js";

export const estimateCallsAtom = makeQueryAtom("batch", (sdk) => sdk.batch.estimateCalls);
export const getCallsStatusAtom = makeQueryAtom("batch", (sdk) => sdk.batch.getCallsStatus);
export const getWalletCapabilitiesAtom = makeQueryAtom(
  "batch",
  (sdk) => sdk.batch.getWalletCapabilities,
);
export const prepareCallsAtom = makeQueryAtom("batch", (sdk) => sdk.batch.prepareCalls);
export const simulateCallsAtom = makeQueryAtom("batch", (sdk) => sdk.batch.simulateCalls);

export const createExecuteWritePlanMutationAtom = makeMutationAtom(
  "batch",
  (sdk) => sdk.batch.executeWritePlan,
);
export const createResumeCallsMutationAtom = makeMutationAtom(
  "batch",
  (sdk) => sdk.batch.resumeCalls,
);
export const createSendCallsMutationAtom = makeMutationAtom("batch", (sdk) => sdk.batch.sendCalls);
