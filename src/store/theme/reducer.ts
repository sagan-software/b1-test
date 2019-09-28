import { ThemeAction, ThemeActionType } from './action'
import { defaultTheme } from './constants'
import { Theme } from './state'

export function themeReducer(
  theme: Readonly<Theme> = defaultTheme,
  action: Readonly<ThemeAction>,
): Readonly<Theme> {
  switch (action.type) {
  default:
    return theme
  }
}
