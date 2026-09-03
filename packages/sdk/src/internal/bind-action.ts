import type { Effect, Stream } from "effect";

import type {
  EnsAction,
  EnsEvent,
  EnsNoParametersAction,
  EnsReadAction,
  EnsReadRequest,
  EnsforgeConfig,
  EnsWriteAction,
  EnsWriteIntent,
  GetRecordsAction,
  GetRecordsError,
  GetRecordsParameters,
  GetRecordsResult,
  GetRecordsSelection,
  ReadBatch,
  ReadBatchError,
  ReadBatchOptions,
  ReadBatchResult,
  ReadBatchSettled,
  ReadBatchSettledResult,
  RpcError,
  WatchEnsEvents,
  WatchEnsEventsError,
  WatchEnsEventsParameters,
} from "@ensforge/core";

type Callable = (...arguments_: never[]) => unknown;

export interface BoundBaseAction<Parameters, Success, Failure> {
  (parameters: Parameters, options?: Effect.RunOptions): Promise<Success>;

  readonly effect: (parameters: Parameters) => Effect.Effect<Success, Failure>;
}

export interface BoundNoParametersAction<Success, Failure> {
  (options?: Effect.RunOptions): Promise<Success>;

  readonly effect: () => Effect.Effect<Success, Failure>;
}

export interface BoundReadAction<Parameters, Success, Failure> extends BoundBaseAction<
  Parameters,
  Success,
  Failure
> {
  readonly request: (parameters: Parameters) => EnsReadRequest<Success, Failure>;
}

export interface BoundWriteAction<Parameters, Success, Failure> extends BoundBaseAction<
  Parameters,
  Success,
  Failure
> {
  readonly call: (parameters: Parameters) => EnsWriteIntent<Success, Failure>;
}

export type BoundAction<Action extends Callable> =
  Action extends EnsNoParametersAction<infer Success, infer Failure>
    ? BoundNoParametersAction<Success, Failure>
    : Action extends EnsReadAction<infer Parameters, infer Success, infer Failure>
      ? BoundReadAction<Parameters, Success, Failure>
      : Action extends EnsWriteAction<infer Parameters, infer Success, infer Failure>
        ? BoundWriteAction<Parameters, Success, Failure>
        : Action extends EnsAction<infer Parameters, infer Success, infer Failure>
          ? BoundBaseAction<Parameters, Success, Failure>
          : never;

export interface BoundGetRecordsAction {
  <const Selection extends GetRecordsSelection>(
    parameters: GetRecordsParameters<Selection>,
    options?: Effect.RunOptions,
  ): Promise<GetRecordsResult<Selection>>;

  readonly effect: <const Selection extends GetRecordsSelection>(
    parameters: GetRecordsParameters<Selection>,
  ) => Effect.Effect<GetRecordsResult<Selection>, GetRecordsError>;

  readonly request: GetRecordsAction["request"];
}

type ReadRequests = Readonly<Record<string, EnsReadRequest<unknown, unknown>>>;

export interface BoundReadBatch {
  <const Requests extends ReadRequests>(
    requests: Requests,
    options?: ReadBatchOptions,
    runOptions?: Effect.RunOptions,
  ): Promise<ReadBatchResult<Requests>>;

  readonly effect: <const Requests extends ReadRequests>(
    requests: Requests,
    options?: ReadBatchOptions,
  ) => Effect.Effect<ReadBatchResult<Requests>, ReadBatchError<Requests>>;
}

export interface BoundReadBatchSettled {
  <const Requests extends ReadRequests>(
    requests: Requests,
    options?: ReadBatchOptions,
    runOptions?: Effect.RunOptions,
  ): Promise<ReadBatchSettledResult<Requests>>;

  readonly effect: <const Requests extends ReadRequests>(
    requests: Requests,
    options?: ReadBatchOptions,
  ) => Effect.Effect<ReadBatchSettledResult<Requests>, RpcError>;
}

export interface BoundWatchEnsEvents {
  (
    parameters: WatchEnsEventsParameters,
    onEvent: (event: EnsEvent) => void,
    onError: (error: WatchEnsEventsError) => void,
  ): Promise<() => void>;

  readonly stream: (
    parameters: WatchEnsEventsParameters,
  ) => Stream.Stream<EnsEvent, WatchEnsEventsError>;
}

export function bindAction(config: EnsforgeConfig, action: GetRecordsAction): BoundGetRecordsAction;
export function bindAction(config: EnsforgeConfig, action: ReadBatch): BoundReadBatch;
export function bindAction(config: EnsforgeConfig, action: ReadBatchSettled): BoundReadBatchSettled;
export function bindAction(config: EnsforgeConfig, action: WatchEnsEvents): BoundWatchEnsEvents;
export function bindAction<Action extends Callable>(
  config: EnsforgeConfig,
  action: Action,
): BoundAction<Action>;
export function bindAction(config: EnsforgeConfig, action: Callable): Callable {
  const invoke = action as (...arguments_: ReadonlyArray<unknown>) => unknown;
  const bound = (...arguments_: ReadonlyArray<unknown>) =>
    Reflect.apply(invoke, undefined, [config, ...arguments_]);

  for (const property of ["effect", "stream"] as const) {
    const extension = Reflect.get(action, property);
    if (typeof extension === "function") {
      Object.defineProperty(bound, property, {
        value: (...arguments_: ReadonlyArray<unknown>) =>
          Reflect.apply(extension, action, [config, ...arguments_]),
        enumerable: true,
        configurable: false,
        writable: false,
      });
    }
  }

  for (const property of ["request", "call"] as const) {
    const extension = Reflect.get(action, property);
    if (typeof extension === "function") {
      Object.defineProperty(bound, property, {
        value: extension,
        enumerable: true,
        configurable: false,
        writable: false,
      });
    }
  }

  return Object.freeze(bound);
}
