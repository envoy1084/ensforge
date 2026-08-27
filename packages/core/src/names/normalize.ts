import { Schema } from "effect";

import { normalize } from "viem/ens";

import { NameError } from "../errors/name-error.js";
import {
  NormalizedLabel,
  type NormalizedLabel as NormalizedLabelValue,
  NormalizedName,
  type NormalizedName as NormalizedNameValue,
} from "../schemas/name.js";

export const normalizeName = (name: string): NormalizedNameValue => {
  try {
    return Schema.decodeSync(NormalizedName)(name === "" ? "" : normalize(name));
  } catch {
    throw new NameError({
      code: "INVALID_NAME",
      message: `Invalid ENS name: ${name}`,
    });
  }
};

export const normalizeLabel = (label: string): NormalizedLabelValue => {
  if (label.length === 0 || label.includes(".")) {
    throw new NameError({
      code: "INVALID_LABEL",
      message: `Invalid ENS label: ${label}`,
    });
  }

  try {
    return Schema.decodeSync(NormalizedLabel)(normalize(label));
  } catch {
    throw new NameError({
      code: "INVALID_LABEL",
      message: `Invalid ENS label: ${label}`,
    });
  }
};
