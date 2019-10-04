import * as api from '../api'

export type State = api.Result<ChainState> | void

export interface ChainState {
  readonly url: URL
  readonly info: api.Info
  readonly isPlaying: boolean
  readonly latestBlocks: Block[]
  readonly selectedBlock: Block | void
  readonly selectedAccount: Account | void
}

export interface Block {
  readonly num: api.BlockNum
  readonly result: api.Result<api.Block> | void
}

export interface Account {
  readonly name: api.AccountName
  readonly abi: api.Result<api.Abi> | void
}
