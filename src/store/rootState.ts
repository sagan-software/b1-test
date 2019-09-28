import { RouterState } from 'connected-react-router'
import { Chain } from './chain/state'
import { Input } from './input/state'
import { Theme } from './theme/state'

export interface RootState {
  readonly router: Readonly<RouterState>
  readonly chain: Readonly<Chain>
  readonly input: Readonly<Input>
  readonly theme: Readonly<Theme>
}

export * from './chain/state'
export * from './input/state'
export * from './theme/state'
