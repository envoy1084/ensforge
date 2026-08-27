import {
  mainnetV1Deployment,
  sepoliaV1Deployment,
  sepoliaV2Deployment,
} from "@ensforge/contracts/deployments";

import type { EnsDeploymentProfile } from "./config.js";
import type { EnsNetwork } from "./network.js";

const mainnetProfile: EnsDeploymentProfile = Object.freeze({
  protocol: "v1",
  v1: mainnetV1Deployment,
});

const sepoliaProfile: EnsDeploymentProfile = Object.freeze({
  protocol: "v2",
  v1: sepoliaV1Deployment,
  v2: sepoliaV2Deployment,
});

const networkProfiles: Readonly<Record<EnsNetwork, EnsDeploymentProfile>> = Object.freeze({
  mainnet: mainnetProfile,
  sepolia: sepoliaProfile,
});

export const getNetworkProfile = (network: EnsNetwork): EnsDeploymentProfile =>
  networkProfiles[network];
