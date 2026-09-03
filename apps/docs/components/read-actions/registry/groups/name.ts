import type { Ensforge } from "@ensforge/sdk";

import { nameForm } from "../shared-fields";
import { defineReadAction, type AnyReadActionDefinition } from "../types";

const nameAction = (
  id: string,
  label: string,
  execute: (sdk: Ensforge, name: string) => Promise<unknown>,
): AnyReadActionDefinition =>
  defineReadAction({
    createForm: nameForm,
    execute: ({ sdk, values }) => execute(sdk, values.name),
    id,
    label,
  });

export const definitions = {
  "name.getCanonicalResource": nameAction(
    "name.getCanonicalResource",
    "getCanonicalResource",
    (sdk, name) => sdk.name.getCanonicalResource({ name }),
  ),
  "name.getExpiry": nameAction("name.getExpiry", "getExpiry", (sdk, name) =>
    sdk.name.getExpiry({ name }),
  ),
  "name.getManager": nameAction("name.getManager", "getManager", (sdk, name) =>
    sdk.name.getManager({ name }),
  ),
  "name.getNameState": nameAction("name.getNameState", "getNameState", (sdk, name) =>
    sdk.name.getNameState({ name }),
  ),
  "name.getNameStatus": nameAction("name.getNameStatus", "getNameStatus", (sdk, name) =>
    sdk.name.getNameStatus({ name }),
  ),
  "name.getOwner": nameAction("name.getOwner", "getOwner", (sdk, name) =>
    sdk.name.getOwner({ name }),
  ),
  "name.getProtocol": nameAction("name.getProtocol", "getProtocol", (sdk, name) =>
    sdk.name.getProtocol({ name }),
  ),
  "name.getRegistrant": nameAction("name.getRegistrant", "getRegistrant", (sdk, name) =>
    sdk.name.getRegistrant({ name }),
  ),
  "name.getRegistry": nameAction("name.getRegistry", "getRegistry", (sdk, name) =>
    sdk.name.getRegistry({ name }),
  ),
  "name.getTokenId": nameAction("name.getTokenId", "getTokenId", (sdk, name) =>
    sdk.name.getTokenId({ name }),
  ),
  "name.isAvailable": nameAction("name.isAvailable", "isAvailable", (sdk, name) =>
    sdk.name.isAvailable({ name }),
  ),
  "name.isMigrated": nameAction("name.isMigrated", "isMigrated", (sdk, name) =>
    sdk.name.isMigrated({ name }),
  ),
  "name.isRenewable": nameAction("name.isRenewable", "isRenewable", (sdk, name) =>
    sdk.name.isRenewable({ name }),
  ),
  "name.isReserved": nameAction("name.isReserved", "isReserved", (sdk, name) =>
    sdk.name.isReserved({ name }),
  ),
  "name.isWrapped": nameAction("name.isWrapped", "isWrapped", (sdk, name) =>
    sdk.name.isWrapped({ name }),
  ),
} as const;
