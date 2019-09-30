import { ChainAction, ChainActionType } from './chain/action'
import { InputAction, InputActionType } from './input/action'
import { ThemeAction, ThemeActionType } from './theme/action'

export type RootAction = ChainAction | InputAction | ThemeAction

export type RootActionType =
  | ChainActionType
  | InputActionType
  | ThemeActionType

export * from './chain/action'
export * from './input/action'
export * from './theme/action'
