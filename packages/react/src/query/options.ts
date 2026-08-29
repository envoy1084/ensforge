export interface EnsQueryOptions<Success, Selected = Success> {
  readonly enabled?: boolean;
  readonly gcTime?: number;
  readonly refetchInterval?: false | number;
  readonly refetchOnWindowFocus?: boolean;
  readonly retry?: false | number;
  readonly select?: (value: Success) => Selected;
  readonly staleTime?: number;
}

export interface EnsQueryDefaults {
  readonly gcTime?: number;
  readonly refetchInterval?: false | number;
  readonly refetchOnWindowFocus?: boolean;
  readonly retry?: false | number;
  readonly staleTime?: number;
}

export interface ResolvedEnsQueryOptions {
  readonly gcTime: number;
  readonly refetchInterval: false | number;
  readonly refetchOnWindowFocus: boolean;
  readonly retry: false | number;
  readonly staleTime: number;
}

export const defaultEnsQueryOptions: ResolvedEnsQueryOptions = Object.freeze({
  gcTime: 5 * 60_000,
  refetchInterval: false,
  refetchOnWindowFocus: false,
  retry: false,
  staleTime: 30_000,
});

export const resolveEnsQueryOptions = (
  defaults: EnsQueryDefaults | undefined,
  options: EnsQueryDefaults | undefined,
): ResolvedEnsQueryOptions => ({
  gcTime: options?.gcTime ?? defaults?.gcTime ?? defaultEnsQueryOptions.gcTime,
  refetchInterval:
    options?.refetchInterval ?? defaults?.refetchInterval ?? defaultEnsQueryOptions.refetchInterval,
  refetchOnWindowFocus:
    options?.refetchOnWindowFocus ??
    defaults?.refetchOnWindowFocus ??
    defaultEnsQueryOptions.refetchOnWindowFocus,
  retry: options?.retry ?? defaults?.retry ?? defaultEnsQueryOptions.retry,
  staleTime: options?.staleTime ?? defaults?.staleTime ?? defaultEnsQueryOptions.staleTime,
});

export type UseEnsQueryParameters<Parameters, Success, Selected = Success> = Parameters & {
  readonly query?: EnsQueryOptions<Success, Selected>;
};
