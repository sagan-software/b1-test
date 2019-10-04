import sendRequest from './sendRequest'
import * as api from './types'

export interface Abi {
  readonly account_name: api.AccountName
  readonly abi?: AbiInner
}

export interface AbiInner {
  readonly actions: AbiAction[]
  readonly ricardian_clauses: RicardianClause[]
}

export interface AbiAction {
  readonly name: api.ActionName
  readonly ricardian_contract?: string | void
}

export interface RicardianClause {
  readonly id: string
  readonly body: string
}

export function getAbi(
  serverUrl: Readonly<URL>,
  accountName: Readonly<api.AccountName>,
  signal?: AbortSignal,
): Promise<api.Result<Abi>> {
  const url = new URL('/v1/chain/get_abi', serverUrl)
  return sendRequest(url.toString(), {
    method: 'POST',
    body: JSON.stringify({
      account_name: accountName,
    }),
    signal,
  })
}
