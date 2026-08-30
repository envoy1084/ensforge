import type { Ensforge } from "@ensforge/sdk";
import type { ReadBatchResult } from "@ensforge/sdk/batch";
import type { GetOwnerParameters } from "@ensforge/sdk/name";
import type { GetRecordsSelection, SetTextParameters } from "@ensforge/sdk/records";

declare const sdk: Ensforge;
const ownerParameters = { name: "ens.eth" } satisfies GetOwnerParameters;
const owner = sdk.name.getOwner.request(ownerParameters);
const recordsSelection = { avatar: true, texts: ["url"] } satisfies GetRecordsSelection;
const records = sdk.records.getRecords.request({ name: "ens.eth", records: recordsSelection });
const batch = sdk.batch.readBatch({ owner, records });
const setTextParameters = {
  name: "ens.eth",
  key: "url",
  value: "https://ens.domains",
} satisfies SetTextParameters;

type Profile = Awaited<typeof batch>;
type ExpectedProfile = ReadBatchResult<{
  readonly owner: typeof owner;
  readonly records: typeof records;
}>;

declare const profile: Profile;

void (profile satisfies ExpectedProfile);
void sdk.records.setText.call(setTextParameters);
void sdk.records.setText.effect(setTextParameters);
