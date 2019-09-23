import { RootState } from '../'
import { Chain } from './state'

export const getAll = (state: Readonly<RootState>): ReadonlyArray<Chain> =>
  Object.values(state.chains)

export const getById = (
  state: Readonly<RootState>,
  chainId: Readonly<string>,
): Readonly<Chain> | void => state.chains[chainId]

export const getByIdPrefix = (
  state: Readonly<RootState>,
  chainIdPrefix: Readonly<string>,
): Readonly<Chain> | void =>
  getAll(state).filter((c) => c.id.startsWith(chainIdPrefix))[0]
