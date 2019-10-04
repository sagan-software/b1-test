import * as api from './types'

export interface Abi {
  readonly actions: ReadonlyArray<AbiAction>
  readonly ricardian_clauses: ReadonlyArray<RicardianClause>
}

export interface AbiAction {
  readonly name: Readonly<api.ActionName>
  readonly ricardian_contract?: Readonly<string> | void
}

export interface RicardianClause {
  readonly id: Readonly<string>
  readonly body: Readonly<string>
}

export async function getAbi(
  serverUrl: Readonly<URL>,
  accountName: Readonly<api.AccountName>,
  signal?: AbortSignal,
): Promise<api.Result<Abi>> {
  const url = new URL('/v1/chain/get_abi', serverUrl)
  // TODO abort controllers
  // TODO make a HEAD call to check for CORS headers

  let res: Response
  try {
    res = await fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify({
        account_name: accountName,
      }),
      signal,
    })
  } catch (e) {
    return api.resultErr({ type: api.RpcErrorType.BadStatus, status: 0 }) // TODO this is wrong
  }

  let json: any
  try {
    json = await res.json()
  } catch (e) {
    return api.resultErr({ type: api.RpcErrorType.InvalidJson })
  }

  // TODO validate json schema
  const raw = json as Abi
  return api.resultOk(raw)
}
