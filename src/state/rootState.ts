import { Chain, defaultChainData } from './chain'
import { Theme, defaultTheme } from './theme'

export interface State {
  readonly autoplay: boolean
  readonly maxBlockCount: number
  readonly urlInput: string
  readonly chain: Readonly<Chain>
  readonly theme: Readonly<Theme>
}

export const defaultState: Readonly<State> = {
  autoplay: true,
  maxBlockCount: 10,
  urlInput: '',
  chain: defaultChainData,
  theme: defaultTheme,
}
