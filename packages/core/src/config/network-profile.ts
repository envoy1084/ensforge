import {
  mainnetV1Deployment,
  sepoliaV1Deployment,
  sepoliaV2Deployment,
} from "@ensforge/contracts/deployments";

import type { EnsDeploymentProfile } from "./config.js";
import type { EnsNetwork } from "./network.js";

const mainnetProfile: EnsDeploymentProfile = Object.freeze({
  active: mainnetV1Deployment,
  compatibility: Object.freeze([]),
});

const sepoliaProfile: EnsDeploymentProfile = Object.freeze({
  active: sepoliaV2Deployment,
  compatibility: Object.freeze([sepoliaV1Deployment]),
});

const networkProfiles: Readonly<Record<EnsNetwork, EnsDeploymentProfile>> = Object.freeze({
  mainnet: mainnetProfile,
  sepolia: sepoliaProfile,
});

export const getNetworkProfile = (network: EnsNetwork): EnsDeploymentProfile =>
  networkProfiles[network];
