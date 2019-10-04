import * as api from './types'

export default async function sendRequest<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<api.Result<T>> {
  // TODO make a HEAD call to check for CORS headers

  let res: Response
  try {
    res = await fetch(input, init)
  } catch (e) {
    return api.resultErr({ type: api.RpcErrorType.Unreachable })
  }

  if (!res.ok) {
    return api.resultErr({
      type: api.RpcErrorType.BadStatus,
      status: res.status,
    })
  }

  // tslint:disable:no-any
  // tslint:disable:no-unsafe-any
  let json: any
  try {
    json = await res.json()
  } catch (e) {
    return api.resultErr({ type: api.RpcErrorType.InvalidJson })
  }

  if (!json || 'error' in json || 'code' in json) {
    return api.resultErr({
      type: api.RpcErrorType.UnexpectedData,
      error: json as api.RawError,
    })
  } else {
    return api.resultOk(json as T)
  }
}
