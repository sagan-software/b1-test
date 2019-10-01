/**
 * A simple wrapper to strengthen basic types
 * @see {@link https://codemix.com/opaque-types-in-javascript/}
 */
export type Opaque<K, T> = T & { readonly __TYPE__: K }

export type Result<T, E> = ResultOk<T> | ResultErr<E>

export enum ResultType {
  Ok = 'OK',
  Err = 'ERR',
}

export interface ResultOk<T> {
  readonly type: ResultType.Ok
  readonly data: T
}

export const resultOk = <T>(data: T): ResultOk<T> => ({
  type: ResultType.Ok,
  data,
})

export interface ResultErr<E> {
  readonly type: ResultType.Err
  readonly error: E
}

export const resultErr = <E>(error: E): ResultErr<E> => ({
  type: ResultType.Err,
  error,
})

/**
 * Represents fallible data fetched from a remote resource.
 * @see {@link http://blog.jenkster.com/2016/06/how-elm-slays-a-ui-antipattern.html}
 */
export type RemoteData<S, E, L = S> =
  | RemoteDataDefault
  | RemoteDataSuccess<S>
  | RemoteDataFailure<E>
  | RemoteDataLoading<L>

/** Remote data union type tag */
export enum RemoteDataType {
  Default = 'DEFAULT',
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Failure = 'FAILURE',
}

/** Represents the default state of remote data */
export interface RemoteDataDefault {
  /** Union type tag */
  readonly type: RemoteDataType.Default
}

/** Represents the loading state of remote data */
export interface RemoteDataLoading<L> {
  /** Union type tag */
  readonly type: RemoteDataType.Loading
  /** Optional previously loaded data */
  readonly data?: Readonly<L> | void
}

/** Represents the successful state of remote data */
export interface RemoteDataSuccess<S> {
  /** Union type tag */
  readonly type: RemoteDataType.Success
  /** Data that was successfully loaded */
  readonly data: Readonly<S>
}

/** Represents the failed state of remote data */
export interface RemoteDataFailure<E> {
  /** Union type tag */
  readonly type: RemoteDataType.Failure
  /** Failure type */
  readonly data: Readonly<E>
}

export function getData<S, E, L>(
  remoteData: RemoteData<S, E, L>,
): S | L | E | void {
  switch (remoteData.type) {
  case RemoteDataType.Success:
  case RemoteDataType.Loading:
  case RemoteDataType.Failure:
    return remoteData.data
  }
}

/** Default remote data state */
export const remoteDataDefault: Readonly<RemoteDataDefault> = {
  type: RemoteDataType.Default,
}

/** Creates remote data a loading state */
export const remoteDataLoading = <L, E>(
  data?: L | void,
): Readonly<RemoteDataLoading<L>> => ({
  type: RemoteDataType.Loading,
  data,
})

/** Creates remote data a successful state */
export const remoteDataSuccess = <S>(
  data: Readonly<S>,
): Readonly<RemoteDataSuccess<S>> => ({
  type: RemoteDataType.Success,
  data,
})

/** Creates remote data a failed state */
export const remoteDataFailure = <E>(
  data: Readonly<E>,
): Readonly<RemoteDataFailure<E>> => ({
  type: RemoteDataType.Failure,
  data,
})

export function resultToRemoteData<T, E>(
  result: Result<T, E>,
): RemoteData<T, E> {
  switch (result.type) {
  case ResultType.Ok:
    return remoteDataSuccess(result.data)
  case ResultType.Err:
    return remoteDataFailure(result.error)
  }
}
