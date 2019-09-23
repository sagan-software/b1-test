import {
  Action,
  ActionType,
  SetBasicAction,
  RemoveAction,
  SetInfoAction,
  AddBlockAction,
} from './actions'
import { defaultState, State, ChainType } from './state'

export function reducer(
  state: Readonly<State> = defaultState,
  action: Readonly<Action>,
): Readonly<State> {
  switch (action.type) {
  case ActionType.SetBasic:
    return onSetBasic(state, action)
  case ActionType.SetInfo:
    return onSetInfo(state, action)
  case ActionType.AddBlock:
    return onAddBlock(state, action)
  case ActionType.Remove:
    return onRemove(state, action)
  default:
    return state
  }
}

function onSetBasic(
  state: Readonly<State>,
  action: Readonly<SetBasicAction>,
): Readonly<State> {
  return {
    ...state,
    [action.chainId]: {
      ...(state[action.chainId] || { info: undefined, blocks: [] }),
      id: action.chainId,
      name: action.chainName,
      type: action.chainType,
    },
  }
}

function onSetInfo(
  state: Readonly<State>,
  action: Readonly<SetInfoAction>,
): Readonly<State> {
  const chainId = action.info.chain_id
  const chain = state[chainId]
  if (chain) {
    return {
      ...state,
      [chainId]: {
        ...chain,
        info: action.info,
      },
    }
  } else {
    return {
      ...state,
      [chainId]: {
        id: chainId,
        type: ChainType.Mainnet,
        name: 'Unknown Chain',
        info: action.info,
        blocks: {},
      },
    }
  }
}

function onAddBlock(
  state: Readonly<State>,
  action: Readonly<AddBlockAction>,
): Readonly<State> {
  const chain = state[action.chainId]
  if (chain) {
    // TODO prune blocks
    return {
      ...state,
      [action.chainId]: {
        ...chain,
        blocks: {
          ...chain.blocks,
          [action.block.id]: action.block,
        },
      },
    }
  } else {
    return {
      ...state,
      [action.chainId]: {
        id: action.chainId,
        type: ChainType.Mainnet,
        name: 'Unknown Chain',
        info: undefined,
        blocks: {
          [action.block.id]: action.block,
        },
      },
    }
  }
}

function onRemove(
  state: Readonly<State>,
  action: Readonly<RemoveAction>,
): Readonly<State> {
  return state
}
