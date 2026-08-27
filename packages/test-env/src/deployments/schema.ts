import { Schema } from "effect";

import { ensDevnetChainId } from "../devnet/source.js";

export const DevnetDeploymentAddress = Schema.TemplateLiteral(["0x", Schema.String]).pipe(
  Schema.check(
    Schema.isPattern(/^0x[0-9a-fA-F]{40}$/, {
      message: "Expected an Ethereum contract address",
    }),
  ),
);

export type DevnetDeploymentAddress = typeof DevnetDeploymentAddress.Type;

export const DevnetDeploymentResponse = Schema.Record(Schema.String, Schema.String);

export type DevnetDeploymentResponse = typeof DevnetDeploymentResponse.Type;

export const DevnetDeploymentManifest = Schema.Struct({
  chainId: Schema.Literal(ensDevnetChainId),
  contracts: Schema.Record(Schema.String, DevnetDeploymentAddress),
});

export type DevnetDeploymentManifest = typeof DevnetDeploymentManifest.Type;
