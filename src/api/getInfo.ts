import { Result, resultOk, resultErr } from '../coreTypes'
import { ChainId, BlockNum, RpcError } from './rpcTypes'

/** Partial raw data returned from `/v1/chain/get_info` endpoint */
export interface RawInfo {
  /** ID of the EOSIO blockchain */
  readonly chain_id: ChainId
  /** Latest block number */
  readonly head_block_num: BlockNum
  /** Latest irreversible block number */
  readonly last_irreversible_block_num: BlockNum
}

/** Minimal info data needed for our application */
export interface Info {
  /** ID of the EOSIO blockchain */
  readonly chainId: ChainId
  /** Latest block number */
  readonly headBlockNum: BlockNum
  /** Latest irreversible block number */
  readonly lastIrreversibleBlockNum: BlockNum
}

export async function getInfo(serverUrl: URL): Promise<Result<Info, RpcError>> {
  const url = new URL('/v1/chain/get_info', serverUrl)

  // TODO abort controllers
  // TODO make a HEAD call to check for CORS headers

  let res: Response
  try {
    res = await fetch(url.toString())
  } catch (e) {
    return resultErr(RpcError.BadStatus) // TODO this is wrong
  }

  let json: any
  try {
    json = await res.json()
  } catch (e) {
    return resultErr(RpcError.InvalidJson)
  }

  // TODO validate json schema
  const rawInfo = json as RawInfo

  return resultOk({
    chainId: rawInfo.chain_id,
    headBlockNum: rawInfo.head_block_num,
    lastIrreversibleBlockNum: rawInfo.last_irreversible_block_num,
  })
}
