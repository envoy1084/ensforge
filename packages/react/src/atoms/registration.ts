import { makeMutationAtom } from "./mutation.js";
import { makeQueryAtom } from "./query.js";

export const getCommitmentStatusAtom = makeQueryAtom(
  "registration",
  (sdk) => sdk.registration.getCommitmentStatus,
);
export const getRegistrationParametersAtom = makeQueryAtom(
  "registration",
  (sdk) => sdk.registration.getRegistrationParameters,
);
export const getRegistrationPlanAtom = makeQueryAtom(
  "registration",
  (sdk) => sdk.registration.getRegistrationPlan,
);
export const getRegistrationPriceAtom = makeQueryAtom(
  "registration",
  (sdk) => sdk.registration.getRegistrationPrice,
);
export const getRenewalPriceAtom = makeQueryAtom(
  "registration",
  (sdk) => sdk.registration.getRenewalPrice,
);
export const isPaymentTokenSupportedAtom = makeQueryAtom(
  "registration",
  (sdk) => sdk.registration.isPaymentTokenSupported,
);
export const makeRegistrationCommitmentAtom = makeQueryAtom(
  "registration",
  (sdk) => sdk.registration.makeRegistrationCommitment,
);

export const createApprovePaymentTokenMutationAtom = makeMutationAtom(
  "registration",
  (sdk) => sdk.registration.approvePaymentToken,
);
export const createApproveRenewalPaymentMutationAtom = makeMutationAtom(
  "registration",
  (sdk) => sdk.registration.approveRenewalPayment,
);
export const createCommitNameMutationAtom = makeMutationAtom(
  "registration",
  (sdk) => sdk.registration.commitName,
);
export const createCompleteRegistrationMutationAtom = makeMutationAtom(
  "registration",
  (sdk) => sdk.registration.completeRegistration,
);
export const createRegisterNameMutationAtom = makeMutationAtom(
  "registration",
  (sdk) => sdk.registration.registerName,
);
export const createRegisterNamesMutationAtom = makeMutationAtom(
  "registration",
  (sdk) => sdk.registration.registerNames,
);
export const createRenewNameMutationAtom = makeMutationAtom(
  "registration",
  (sdk) => sdk.registration.renewName,
);
export const createRenewNamesMutationAtom = makeMutationAtom(
  "registration",
  (sdk) => sdk.registration.renewNames,
);
