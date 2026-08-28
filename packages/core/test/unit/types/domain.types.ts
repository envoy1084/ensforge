import { expectTypeOf } from "vitest";

import {
  type AddressRecordData,
  type CodecErrorCode,
  type CoinType,
  decodeAddressRecord,
  decodeContentHash,
  type DecodedContentHash,
  type DnsEncodedName,
  type Labelhash,
  type NameErrorCode,
  type Namehash,
  type NormalizedLabel,
  type NormalizedName,
  type RegistryResource,
  normalizeName,
} from "../../../src/index.js";
expectTypeOf(normalizeName("example.eth")).toEqualTypeOf<NormalizedName>();
expectTypeOf(decodeAddressRecord({ coinType: 60n, data: "0x" })).toEqualTypeOf<string | null>();
expectTypeOf(decodeContentHash("0x")).toEqualTypeOf<DecodedContentHash | null>();

expectTypeOf<NormalizedLabel>().not.toEqualTypeOf<NormalizedName>();
expectTypeOf<Namehash>().not.toEqualTypeOf<Labelhash>();
expectTypeOf<DnsEncodedName>().not.toEqualTypeOf<AddressRecordData>();
expectTypeOf<CoinType>().not.toEqualTypeOf<RegistryResource>();

const nameErrorCode: NameErrorCode = "INVALID_NAME";
const codecErrorCode: CodecErrorCode = "INVALID_CONTENT_HASH";

// @ts-expect-error Schema brands prevent raw strings from being treated as normalized names.
const invalidName: NormalizedName = "example.eth";
// @ts-expect-error Error codes are stable uppercase literals.
const invalidErrorCode: NameErrorCode = "invalid_name";

void nameErrorCode;
void codecErrorCode;
void invalidName;
void invalidErrorCode;
