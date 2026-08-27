import { Schema } from "effect";

export class UnsupportedEnsNetworkError extends Schema.TaggedError<UnsupportedEnsNetworkError>()(
  "UnsupportedEnsNetworkError",
  {
    network: Schema.String,
  },
) {
  override get message(): string {
    return `Unsupported ENS network: ${this.network}`;
  }
}

export class ClientChainUnavailableError extends Schema.TaggedError<ClientChainUnavailableError>()(
  "ClientChainUnavailableError",
  {
    client: Schema.Literals(["public", "wallet"]),
  },
) {
  override get message(): string {
    return `The ${this.client} client must be configured with a chain`;
  }
}

export class NetworkClientMismatchError extends Schema.TaggedError<NetworkClientMismatchError>()(
  "NetworkClientMismatchError",
  {
    network: Schema.Literals(["mainnet", "sepolia"]),
    client: Schema.Literals(["public", "wallet"]),
    expectedChainId: Schema.Number,
    actualChainId: Schema.Number,
  },
) {
  override get message(): string {
    return `The ${this.client} client chain ${this.actualChainId} does not match ${this.network} (${this.expectedChainId})`;
  }
}

export class DeploymentChainMismatchError extends Schema.TaggedError<DeploymentChainMismatchError>()(
  "DeploymentChainMismatchError",
  {
    deploymentId: Schema.String,
    expectedChainId: Schema.Number,
    actualChainId: Schema.Number,
  },
) {
  override get message(): string {
    return `Deployment ${this.deploymentId} targets chain ${this.actualChainId}, expected ${this.expectedChainId}`;
  }
}

export class DuplicateDeploymentError extends Schema.TaggedError<DuplicateDeploymentError>()(
  "DuplicateDeploymentError",
  {
    deploymentId: Schema.String,
  },
) {
  override get message(): string {
    return `Deployment ${this.deploymentId} appears more than once in the selected profile`;
  }
}

export class WalletClientUnavailableError extends Schema.TaggedError<WalletClientUnavailableError>()(
  "WalletClientUnavailableError",
  {},
) {
  override get message(): string {
    return "A wallet client is required for this operation";
  }
}

export class WalletAccountUnavailableError extends Schema.TaggedError<WalletAccountUnavailableError>()(
  "WalletAccountUnavailableError",
  {},
) {
  override get message(): string {
    return "An account is required for this operation";
  }
}

export type EnsforgeConfigurationError =
  | UnsupportedEnsNetworkError
  | ClientChainUnavailableError
  | NetworkClientMismatchError
  | DeploymentChainMismatchError
  | DuplicateDeploymentError;

export type WalletContextError =
  | WalletClientUnavailableError
  | WalletAccountUnavailableError
  | ClientChainUnavailableError
  | NetworkClientMismatchError;
