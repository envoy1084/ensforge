import {
  approvePaymentToken,
  approveRenewalPayment,
  commitName,
  completeRegistration,
  getCommitmentStatus,
  getRegistrationParameters,
  getRegistrationPlan,
  getRegistrationPrice,
  getRenewalPrice,
  isPaymentTokenSupported,
  makeRegistrationCommitment,
  registerName,
  registerNames,
  renewName,
  renewNames,
  type EnsforgeConfig,
} from "@ensforge/core";

import { bindAction } from "../internal/bind-action.js";

export const makeRegistrationActions = (config: EnsforgeConfig) =>
  Object.freeze({
    approvePaymentToken: bindAction(config, approvePaymentToken),
    approveRenewalPayment: bindAction(config, approveRenewalPayment),
    commitName: bindAction(config, commitName),
    completeRegistration: bindAction(config, completeRegistration),
    getCommitmentStatus: bindAction(config, getCommitmentStatus),
    getRegistrationParameters: bindAction(config, getRegistrationParameters),
    getRegistrationPlan: bindAction(config, getRegistrationPlan),
    getRegistrationPrice: bindAction(config, getRegistrationPrice),
    getRenewalPrice: bindAction(config, getRenewalPrice),
    isPaymentTokenSupported: bindAction(config, isPaymentTokenSupported),
    makeRegistrationCommitment: bindAction(config, makeRegistrationCommitment),
    registerName: bindAction(config, registerName),
    registerNames: bindAction(config, registerNames),
    renewName: bindAction(config, renewName),
    renewNames: bindAction(config, renewNames),
  });

export type RegistrationActions = ReturnType<typeof makeRegistrationActions>;
