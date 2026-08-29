"use client";

import { createContext, useContext } from "react";

import type { Ensforge } from "@ensforge/sdk";

import type { EnsQueryDefaults } from "../query/options.js";

export interface EnsforgeReactDefaults {
  readonly queries?: EnsQueryDefaults;
}

export interface EnsforgeReactContextValue {
  readonly defaults: EnsforgeReactDefaults;
  readonly sdk: Ensforge;
}

export const EnsforgeReactContext = createContext<EnsforgeReactContextValue | undefined>(undefined);

export const useEnsforgeContext = (): EnsforgeReactContextValue => {
  const value = useContext(EnsforgeReactContext);
  if (value === undefined) {
    throw new Error("Ensforge React hooks must be used inside an EnsforgeProvider");
  }
  return value;
};
