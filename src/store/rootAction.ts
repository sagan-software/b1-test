import { ChainAction, ChainActionType } from './chain/action'
import { InputAction, InputActionType } from './input/action'
import { RouterAction, RouterActionType } from './router/action'
import { ThemeAction, ThemeActionType } from './theme/action'

export type RootAction = ChainAction | InputAction | RouterAction | ThemeAction

export type RootActionType =
  | ChainActionType
  | InputActionType
  | RouterActionType
  | ThemeActionType

export * from './chain/action'
export * from './input/action'
export * from './router/action'
export * from './theme/action'
