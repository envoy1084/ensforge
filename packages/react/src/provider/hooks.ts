"use client";

import { useContext } from "react";

import { RegistryContext } from "@effect/atom-react";

import { useEnsforgeContext } from "./context.js";

export const useEnsforge = () => useEnsforgeContext().sdk;

export const useEnsforgeRegistry = () => useContext(RegistryContext);
