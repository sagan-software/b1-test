import { Info, ChainType, Block } from './state'

export enum ActionType {
  SetBasic = 'CHAINS/SET_BASIC',
  SetInfo = 'CHAINS/SET_INFO',
  AddBlock = 'CHAINS/ADD_BLOCK',
  Remove = 'CHAINS/REMOVE',
}

export type Action =
  | SetBasicAction
  | SetInfoAction
  | AddBlockAction
  | RemoveAction

export interface SetBasicAction {
  readonly type: ActionType.SetBasic
  readonly chainId: string
  readonly chainName: string
  readonly chainType: ChainType
}

export const setName = (
  chainId: Readonly<string>,
  chainName: Readonly<string>,
  chainType: Readonly<ChainType>,
): Readonly<SetBasicAction> => ({
  type: ActionType.SetBasic,
  chainId,
  chainName,
  chainType,
})

export interface SetInfoAction {
  readonly type: ActionType.SetInfo
  readonly info: Info
}

export const setInfo = (info: Readonly<Info>): Readonly<SetInfoAction> => ({
  type: ActionType.SetInfo,
  info,
})

export interface AddBlockAction {
  readonly type: ActionType.AddBlock
  readonly chainId: string
  readonly block: Block
}

export const addBlock = (
  chainId: Readonly<string>,
  block: Readonly<Block>,
): Readonly<AddBlockAction> => ({
  type: ActionType.AddBlock,
  chainId,
  block,
})

export interface RemoveAction {
  readonly type: ActionType.Remove
  readonly chainId: string
}

export const remove = (chainId: Readonly<string>): RemoveAction => ({
  type: ActionType.Remove,
  chainId,
})
