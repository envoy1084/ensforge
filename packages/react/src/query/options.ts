import type { Duration, Schedule } from "effect";

export interface EnsAtomSwrOptions {
  readonly revalidateOnFocus?: boolean | "always";
  readonly revalidateOnMount?: boolean;
  readonly staleTime?: Duration.Input;
}

export interface EnsAtomOptions<Failure = unknown> {
  readonly idleTTL?: Duration.Input;
  readonly refreshInterval?: false | Duration.Input;
  readonly retry?: false | Schedule.Schedule<unknown, Failure>;
  readonly swr?: false | EnsAtomSwrOptions;
}

export type EnsAtomDefaults = EnsAtomOptions<unknown>;

export interface ResolvedEnsAtomSwrOptions {
  readonly revalidateOnFocus: boolean | "always";
  readonly revalidateOnMount: boolean;
  readonly staleTime: Duration.Input;
}

export interface ResolvedEnsAtomOptions<Failure = unknown> {
  readonly idleTTL: Duration.Input;
  readonly refreshInterval: false | Duration.Input;
  readonly retry: false | Schedule.Schedule<unknown, Failure>;
  readonly swr: false | ResolvedEnsAtomSwrOptions;
}

export const defaultEnsAtomOptions: ResolvedEnsAtomOptions = Object.freeze({
  idleTTL: 5 * 60_000,
  refreshInterval: false,
  retry: false,
  swr: Object.freeze({
    revalidateOnFocus: false,
    revalidateOnMount: true,
    staleTime: 30_000,
  }),
});

const resolveSwrOptions = <Failure>(
  defaults: EnsAtomDefaults | undefined,
  options: EnsAtomOptions<Failure> | undefined,
): false | ResolvedEnsAtomSwrOptions => {
  const selected = options?.swr ?? defaults?.swr ?? defaultEnsAtomOptions.swr;
  if (selected === false) return false;

  const fallback = defaultEnsAtomOptions.swr;
  if (fallback === false) return false;
  const defaultSwr = defaults?.swr === false ? undefined : defaults?.swr;

  return {
    revalidateOnFocus:
      selected.revalidateOnFocus ?? defaultSwr?.revalidateOnFocus ?? fallback.revalidateOnFocus,
    revalidateOnMount:
      selected.revalidateOnMount ?? defaultSwr?.revalidateOnMount ?? fallback.revalidateOnMount,
    staleTime: selected.staleTime ?? defaultSwr?.staleTime ?? fallback.staleTime,
  };
};

export const resolveEnsAtomOptions = <Failure>(
  defaults: EnsAtomDefaults | undefined,
  options: EnsAtomOptions<Failure> | undefined,
): ResolvedEnsAtomOptions<Failure> => ({
  idleTTL: options?.idleTTL ?? defaults?.idleTTL ?? defaultEnsAtomOptions.idleTTL,
  refreshInterval:
    options?.refreshInterval ?? defaults?.refreshInterval ?? defaultEnsAtomOptions.refreshInterval,
  retry:
    options?.retry ??
    (defaults?.retry as false | Schedule.Schedule<unknown, Failure> | undefined) ??
    false,
  swr: resolveSwrOptions(defaults, options),
});

export type UseEnsAtomParameters<Parameters, Success, Failure, Mapped = Success> = Parameters & {
  readonly atom?: EnsAtomOptions<Failure>;
  readonly enabled?: boolean;
  readonly map?: (value: Success) => Mapped;
};
