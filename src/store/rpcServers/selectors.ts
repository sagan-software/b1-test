import { RootState } from '../'
import { RpcServer, RpcServerOk, RpcServerStatus } from './state'

export const getAll = (state: Readonly<RootState>): ReadonlyArray<RpcServer> =>
  Object.values(state.rpcServers)

export const getOk = (state: Readonly<RootState>): ReadonlyArray<RpcServerOk> =>
  getAll(state).filter(
    (s): s is RpcServerOk => s.status === RpcServerStatus.Ok,
  )

export interface BestRpcServers {
  [chainId: string]: Readonly<RpcServerOk>
}

export const getBest = (state: Readonly<RootState>): BestRpcServers =>
  getOk(state).reduce((acc: BestRpcServers, server) => {
    const previous = acc[server.chainId]
    if (!previous || (previous && previous.ping > server.ping)) {
      acc[server.chainId] = server
    }
    return acc
  }, {})

export const getByChainId = (chainId: Readonly<string>) => (
  state: Readonly<RootState>,
): ReadonlyArray<RpcServerOk> =>
  getOk(state).filter((s) => s.chainId === chainId)
