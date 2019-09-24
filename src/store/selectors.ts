import {
  State,
  RpcServerStatus,
  Theme,
  RpcServer,
  RemoteData,
  Block,
} from './state'

export const getUrlInput = (state: Readonly<State>): Readonly<string> =>
  state.server.input

export const getUrl = (state: Readonly<State>): Readonly<URL> | void =>
  state.server.status === RpcServerStatus.ValidUrl
    ? state.server.url
    : undefined

export const getAutoplay = (state: Readonly<State>): Readonly<boolean> =>
  state.autoplay

export const getMaxBlockCount = (state: Readonly<State>): Readonly<number> =>
  state.maxBlockCount

export const getTheme = (state: Readonly<State>): Readonly<Theme> =>
  state.theme

export const getHasBlock = (
  state: Readonly<State>,
  blockNum: Readonly<number>,
): Readonly<boolean> =>
  state.server.status === RpcServerStatus.ValidUrl
    ? blockNum in state.server.blocks
    : false

export const getBlockCount = (state: Readonly<State>): Readonly<number> =>
  state.server.status === RpcServerStatus.ValidUrl
    ? Object.keys(state.server.blocks).length
    : 0

export const getBlock = (
  state: Readonly<State>,
  blockNum: Readonly<number>,
): Readonly<RemoteData<Block>> | void =>
  state.server.status === RpcServerStatus.ValidUrl
    ? state.server.blocks[blockNum]
    : undefined

export const getChain = (state: Readonly<State>): Readonly<RpcServer> =>
  state.server
