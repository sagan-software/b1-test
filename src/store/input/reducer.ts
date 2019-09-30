import { InputAction, InputActionType } from './action'
import { defaultInput } from './constants'
import { Input } from './state'

export function inputReducer(
  input: Readonly<Input> = defaultInput,
  action: Readonly<InputAction>,
): Readonly<Input> {
  switch (action.type) {
  case InputActionType.SetUrl:
    return {
        ...input,
        url: action.input,
      }
  default:
    return input
  }
}
