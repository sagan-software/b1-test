import sendRequest from './sendRequest'
import * as api from './types'

export interface Info {
  readonly chain_id: api.ChainId
  readonly head_block_num: api.BlockNum
  readonly last_irreversible_block_num: api.BlockNum
}

export function getInfo(serverUrl: URL): Promise<api.Result<Info>> {
  const url = new URL('/v1/chain/get_info', serverUrl)
  return sendRequest(url.toString())
}
