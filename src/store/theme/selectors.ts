import { RootState } from '../rootState'
import { Theme } from './state'

export function getTheme(state: Readonly<RootState>): Readonly<Theme> {
  return state.theme
}
