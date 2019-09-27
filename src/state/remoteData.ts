/**
 * Represents fallible data fetched from a remote resource.
 * @see {@link http://blog.jenkster.com/2016/06/how-elm-slays-a-ui-antipattern.html}
 */
export type RemoteData<T, E> =
  | RemoteDataDefault
  | RemoteDataLoading<T>
  | RemoteDataSuccess<T>
  | RemoteDataFailure<T, E>

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
export interface RemoteDataLoading<T> {
  /** Union type tag */
  readonly type: RemoteDataType.Loading
  /** Optional previously loaded data */
  readonly previousData: Readonly<T> | void
}

/** Represents the successful state of remote data */
export interface RemoteDataSuccess<T> {
  /** Union type tag */
  readonly type: RemoteDataType.Success
  /** Data that was successfully loaded */
  readonly data: Readonly<T>
}

/** Represents the failed state of remote data */
export interface RemoteDataFailure<T, E> {
  /** Union type tag */
  readonly type: RemoteDataType.Failure
  /** Failure type */
  readonly error: Readonly<E>
  /** Optional previously loaded data */
  readonly previousData: Readonly<T> | void
}

export function getData<T, E>(remoteData: RemoteData<T, E>): T | void {
  switch (remoteData.type) {
  case RemoteDataType.Success:
    return remoteData.data
  case RemoteDataType.Loading:
  case RemoteDataType.Failure:
    return remoteData.previousData
  }
}

/** Default remote data state */
export const defaultRemoteData: Readonly<RemoteDataDefault> = {
  type: RemoteDataType.Default,
}

/** Creates remote data a loading state */
export const remoteDataLoading = <T>(
  previousData?: Readonly<T> | void,
): Readonly<RemoteDataLoading<T>> => ({
  type: RemoteDataType.Loading,
  previousData,
})

/** Creates remote data a successful state */
export const remoteDataSuccess = <T>(
  data: Readonly<T>,
): Readonly<RemoteDataSuccess<T>> => ({
  type: RemoteDataType.Success,
  data,
})

/** Creates remote data a failed state */
export const remoteDataFailure = <T, E>(
  error: Readonly<E>,
  previousData?: Readonly<T> | void,
): Readonly<RemoteDataFailure<T, E>> => ({
  type: RemoteDataType.Failure,
  error,
  previousData,
})
