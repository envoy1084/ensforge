import type { Effect, Stream } from "effect";

import type {
  EnsEvent,
  EnsReadRequest,
  EnsforgeConfig,
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

type BindConfigFunction<Function_> = Function_ extends (
  config: EnsforgeConfig,
  ...arguments_: infer Arguments
) => infer Result
  ? (...arguments_: Arguments) => Result
  : Function_;

type BoundProperties<Action> = {
  readonly [Key in keyof Action]: Key extends "effect" | "stream"
    ? BindConfigFunction<Action[Key]>
    : Action[Key];
};

export type BoundAction<Action extends Callable> = BindConfigFunction<Action> &
  BoundProperties<Action>;

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
