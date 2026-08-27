import { Schema } from "effect";

import {
  decode,
  encode,
  getCodec,
  type Codec as EnsContentHashCodec,
} from "@ensdomains/content-hash";

import { CodecError } from "../errors/codec-error.js";
import {
  ContentHash,
  ContentHashCodec,
  type ContentHash as ContentHashValue,
  type ContentHashCodec as ContentHashCodecValue,
} from "../schemas/records.js";

export interface EncodeContentHashParameters {
  readonly codec: ContentHashCodecValue;
  readonly value: string;
}

export interface DecodedContentHash {
  readonly codec: ContentHashCodecValue;
  readonly value: string;
}

export const encodeContentHash = ({
  codec,
  value,
}: EncodeContentHashParameters): ContentHashValue => {
  if (!Schema.is(ContentHashCodec)(codec)) {
    throw new CodecError({
      code: "UNSUPPORTED_CONTENT_CODEC",
      message: `Unsupported content hash codec: ${codec}`,
    });
  }

  try {
    return Schema.decodeSync(ContentHash)(`0x${encode(codec as EnsContentHashCodec, value)}`);
  } catch {
    throw new CodecError({
      code: "INVALID_CONTENT_HASH",
      message: `Invalid ${codec} content hash value`,
    });
  }
};

export const decodeContentHash = (
  contentHash: `0x${string}` | ContentHashValue,
): DecodedContentHash | null => {
  let encoded: ContentHashValue;

  try {
    encoded = Schema.decodeSync(ContentHash)(contentHash);
  } catch {
    throw new CodecError({
      code: "INVALID_CONTENT_HASH",
      message: "Invalid encoded content hash",
    });
  }

  if (encoded.length === 2) return null;

  const unprefixed = encoded.slice(2);

  try {
    const codec = getCodec(unprefixed);

    if (codec === undefined || !Schema.is(ContentHashCodec)(codec)) {
      throw new CodecError({
        code: "UNSUPPORTED_CONTENT_CODEC",
        message: "Unsupported encoded content hash codec",
      });
    }

    return Object.freeze({ codec, value: decode(unprefixed) });
  } catch (error) {
    if (error instanceof CodecError) throw error;
    throw new CodecError({
      code: "INVALID_CONTENT_HASH",
      message: "Invalid encoded content hash",
    });
  }
};
