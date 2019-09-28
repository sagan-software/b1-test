import { InputAction, InputActionType } from './action'
import { defaultInput } from './constants'
import { Input } from './state'

export function inputReducer(
  input: Readonly<Input> = defaultInput,
  action: Readonly<InputAction>,
): Readonly<Input> {
  switch (action.type) {
  default:
    return input
  }
}
