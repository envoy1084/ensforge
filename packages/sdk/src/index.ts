export { ConfigError, ConfigErrorCode } from "@ensforge/core";
export type * from "@ensforge/core";

export { Ensforge } from "./ensforge.js";
export type {
  BatchActions,
  CapabilitiesActions,
  DnsActions,
  EventsActions,
  MigrationActions,
  NameActions,
  OwnershipActions,
  PermissionsActions,
  RecordsActions,
  RegistrationActions,
  ResolutionActions,
  ReverseActions,
  SubnameActions,
  WrappingActions,
} from "./groups/index.js";
export type {
  BoundAction,
  BoundGetRecordsAction,
  BoundReadBatch,
  BoundReadBatchSettled,
  BoundWatchEnsEvents,
} from "./internal/bind-action.js";
