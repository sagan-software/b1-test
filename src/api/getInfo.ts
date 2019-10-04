import * as api from './types'

/** Partial raw data returned from `/v1/chain/get_info` endpoint */
export interface Info {
  /** ID of the EOSIO blockchain */
  readonly chain_id: api.ChainId
  /** Latest block number */
  readonly head_block_num: api.BlockNum
  /** Latest irreversible block number */
  readonly last_irreversible_block_num: api.BlockNum
}

export async function getInfo(serverUrl: URL): Promise<api.Result<Info>> {
  const url = new URL('/v1/chain/get_info', serverUrl)

  // TODO abort controllers
  // TODO make a HEAD call to check for CORS headers

  let res: Response
  try {
    res = await fetch(url.toString())
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
  const rawInfo = json as Info

  return api.resultOk(rawInfo)
}
