import { resultOk, resultErr } from '../coreTypes'
import { RpcErrorType, ActionName, RpcResult, AccountName } from './rpcTypes'

export interface RawAbi {
  readonly actions: ReadonlyArray<RawAbiAction>
  readonly ricardian_clauses: ReadonlyArray<RawRicardianClause>
}

export interface RawAbiAction {
  readonly name: Readonly<ActionName>
  readonly ricardian_contract?: Readonly<string> | void
}

export interface RawRicardianClause {
  readonly id: Readonly<string>
  readonly body: Readonly<string>
}

export async function getAbi(
  serverUrl: Readonly<URL>,
  accountName: Readonly<AccountName>,
  signal?: AbortSignal,
): Promise<RpcResult<RawAbi>> {
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
    return resultErr({ type: RpcErrorType.BadStatus, status: 0 }) // TODO this is wrong
  }

  let json: any
  try {
    json = await res.json()
  } catch (e) {
    return resultErr({ type: RpcErrorType.InvalidJson })
  }

  // TODO validate json schema
  const raw = json as RawAbi
  return resultOk(raw)
}
