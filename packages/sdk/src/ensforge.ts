import { createConfig, type CreateConfigParameters, type EnsforgeConfig } from "@ensforge/core";

import {
  makeBatchActions,
  makeCapabilitiesActions,
  makeDnsActions,
  makeEventsActions,
  makeMigrationActions,
  makeNameActions,
  makeOwnershipActions,
  makePermissionsActions,
  makeRecordsActions,
  makeRegistrationActions,
  makeResolutionActions,
  makeReverseActions,
  makeSubnameActions,
  makeWrappingActions,
  type BatchActions,
  type CapabilitiesActions,
  type DnsActions,
  type EventsActions,
  type MigrationActions,
  type NameActions,
  type OwnershipActions,
  type PermissionsActions,
  type RecordsActions,
  type RegistrationActions,
  type ResolutionActions,
  type ReverseActions,
  type SubnameActions,
  type WrappingActions,
} from "./groups/index.js";

export class Ensforge {
  readonly config: EnsforgeConfig;
  readonly batch: BatchActions;
  readonly capabilities: CapabilitiesActions;
  readonly dns: DnsActions;
  readonly events: EventsActions;
  readonly migration: MigrationActions;
  readonly name: NameActions;
  readonly ownership: OwnershipActions;
  readonly permissions: PermissionsActions;
  readonly records: RecordsActions;
  readonly registration: RegistrationActions;
  readonly resolution: ResolutionActions;
  readonly reverse: ReverseActions;
  readonly subnames: SubnameActions;
  readonly wrapping: WrappingActions;

  constructor(parameters: CreateConfigParameters) {
    const config = createConfig(parameters);

    this.config = config;
    this.batch = makeBatchActions(config);
    this.capabilities = makeCapabilitiesActions(config);
    this.dns = makeDnsActions(config);
    this.events = makeEventsActions(config);
    this.migration = makeMigrationActions(config);
    this.name = makeNameActions(config);
    this.ownership = makeOwnershipActions(config);
    this.permissions = makePermissionsActions(config);
    this.records = makeRecordsActions(config);
    this.registration = makeRegistrationActions(config);
    this.resolution = makeResolutionActions(config);
    this.reverse = makeReverseActions(config);
    this.subnames = makeSubnameActions(config);
    this.wrapping = makeWrappingActions(config);

    Object.freeze(this);
  }
}
