import type { Effect } from "effect";

import { expectTypeOf } from "vitest";

import {
  clearAvatar,
  clearRecords,
  setAbi,
  setAddress,
  setAddresses,
  setAlias,
  setAvatar,
  setContentHash,
  setData,
  setDnsRecords,
  setInterface,
  setName,
  setPubkey,
  setRecords,
  setTexts,
  setZoneHash,
  type CallExecutionResult,
  type EnsWriteIntent,
  type EnsforgeConfig,
  type SetAddressError,
  type SetAddressResult,
  type SetRecordsError,
  type SetRecordsResult,
} from "../../../src/index.js";

const config = {} as EnsforgeConfig;
const addressParameters = {
  name: "example.eth",
  address: "0x0000000000000000000000000000000000000001",
};

expectTypeOf(setAddress(config, addressParameters)).toEqualTypeOf<Promise<SetAddressResult>>();
expectTypeOf(setAddress.effect(config, addressParameters)).toEqualTypeOf<
  Effect.Effect<SetAddressResult, SetAddressError>
>();
expectTypeOf(setAddress.call(addressParameters)).toEqualTypeOf<
  EnsWriteIntent<SetAddressResult, SetAddressError>
>();

setTexts.call({ name: "example.eth", texts: [{ key: "url", value: "https://example.com" }] });
setAddresses.call({
  name: "example.eth",
  addresses: [{ coinType: 60n, address: addressParameters.address }],
});
setContentHash.call({ name: "example.eth", protocol: "ipfs", value: "bafy" });
setAbi.call({ name: "example.eth", contentType: "json", value: [] });
setPubkey.call({
  name: "example.eth",
  x: "0x0000000000000000000000000000000000000000000000000000000000000000",
  y: "0x0000000000000000000000000000000000000000000000000000000000000000",
});
setInterface.call({
  name: "example.eth",
  interfaceId: "0x01ffc9a7",
  implementer: addressParameters.address,
});
setData.call({ name: "example.eth", key: "profile", value: "0x" });
setName.call({ name: "example.eth", value: "primary.eth" });
setAvatar.call({ name: "example.eth", value: "https://example.com/avatar.png" });
clearAvatar.call({ name: "example.eth" });
clearRecords.call({ name: "example.eth" });
setAlias.call({ name: "example.eth", target: "target.eth" });
setDnsRecords.call({ name: "example.eth", data: "0x" });
setZoneHash.call({ name: "example.eth", value: "0x" });

const recordsParameters = {
  name: "example.eth",
  records: [
    { type: "clear" as const },
    { type: "text" as const, key: "url", value: "https://example.com" },
  ],
};
expectTypeOf(setRecords(config, recordsParameters)).toEqualTypeOf<Promise<SetRecordsResult>>();
expectTypeOf(setRecords.effect(config, recordsParameters)).toEqualTypeOf<
  Effect.Effect<SetRecordsResult, SetRecordsError>
>();
expectTypeOf(setRecords.call(recordsParameters)).toEqualTypeOf<
  EnsWriteIntent<CallExecutionResult, SetRecordsError>
>();
