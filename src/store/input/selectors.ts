import { RootState } from '../rootState'

export function getUrlInput(state: Readonly<RootState>): Readonly<string> {
  return state.input.url
}

export function getAutoplayInput(
  state: Readonly<RootState>,
): Readonly<boolean> {
  return state.input.autoplay
}
