import { Data, Schedule, Stream, type Cause } from "effect";
import { Atom } from "effect/unstable/reactivity";

import type { Ensforge } from "@ensforge/sdk";

import { atomRuntime } from "../internal/runtime.js";
import { makeReactivityKeys } from "../query/keys.js";
import type { EnsQueryAtom, EnsQueryAtomFactory, QueryAtomOptions } from "./query.js";

interface BoundStreamAction<Parameters, Success, Failure> {
  readonly stream: (parameters: Parameters) => Stream.Stream<Success, Failure>;
}

class StreamAtomInput<Parameters> extends Data.Class<{
  readonly options: QueryAtomOptions;
  readonly parameters: Parameters;
  readonly sdk: Ensforge;
}> {}

export const makeStreamAtom = <Parameters, Success, Failure>(
  group: string,
  getAction: (sdk: Ensforge) => BoundStreamAction<Parameters, Success, Failure>,
): EnsQueryAtomFactory<Parameters, Success, Failure | Cause.NoSuchElementError> => {
  const family = Atom.family((input: StreamAtomInput<Parameters>) => {
    const actionStream = Stream.suspend(() => getAction(input.sdk).stream(input.parameters));
    const stream =
      input.options.retry === false
        ? actionStream
        : actionStream.pipe(Stream.retry(Schedule.recurs(input.options.retry)));
    return atomRuntime
      .atom(stream)
      .pipe(
        Atom.withReactivity(makeReactivityKeys(input.sdk, group, input.parameters)),
        Atom.setIdleTTL(input.options.gcTime),
      );
  });

  return (sdk, parameters, options): EnsQueryAtom<Success, Failure | Cause.NoSuchElementError> =>
    family(new StreamAtomInput({ options, parameters, sdk }));
};
