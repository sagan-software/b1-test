export type InputAction = SetUrl | SetAutoplay | SetMaxBlockCount

export enum InputActionType {
  SetUrl = 'INPUT/SET_URL',
  SetAutoplay = 'INPUT/SET_AUTOPLAY',
  SetMaxBlockCount = 'INPUT/SET_MAX_BLOCK_COUNT',
}

export interface SetUrl {
  readonly type: InputActionType.SetUrl
  readonly input: string
}

export interface SetAutoplay {
  readonly type: InputActionType.SetAutoplay
  readonly autoplay: boolean
}

export interface SetMaxBlockCount {
  readonly type: InputActionType.SetMaxBlockCount
  readonly maxBlockCount: number
}

export const setUrl = (input: Readonly<string>): Readonly<SetUrl> => ({
  type: InputActionType.SetUrl,
  input,
})

export const setAutoplay = (
  autoplay: Readonly<boolean>,
): Readonly<SetAutoplay> => ({
  type: InputActionType.SetAutoplay,
  autoplay,
})

export const setMaxBlockCount = (
  maxBlockCount: Readonly<number>,
): Readonly<SetMaxBlockCount> => ({
  type: InputActionType.SetMaxBlockCount,
  maxBlockCount,
})
