import { Layer } from "effect";
import { Atom } from "effect/unstable/reactivity";

export const atomRuntime = Atom.runtime(Layer.empty);
