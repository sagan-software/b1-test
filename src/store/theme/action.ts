import { Theme } from './state'

export type ThemeAction = SetTheme

export enum ThemeActionType {
  SetTheme = 'THEME/SET_THEME',
}

export interface SetTheme {
  readonly type: ThemeActionType.SetTheme
  readonly theme: Readonly<Theme>
}
