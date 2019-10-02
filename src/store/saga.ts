import {
  delay,
  fork,
  put,
  actionChannel,
  cancel,
  race,
} from 'redux-saga/effects'
import { call, take, select } from 'typed-redux-saga'
import * as api from '../api'
import {
  Action,
  ActionType,
  GetInfoAction,
  GetBlockAction,
  GetAbiAction,
  IncrementHeadBlockNumAction,
  DelBlockAction,
} from './action'
import { setInfoAction, setBlockAction } from './actionCreators'
import * as selectors from './selectors'
import { RemoteDataType } from '../coreTypes'
import { ChainSuccess } from './state'
import { BlockNum } from '../api'
import { Task } from 'redux-saga'

export function* saga() {
  while (true) {
    const rpcUrl = yield* select(selectors.getRpcUrl)
    let task: Task | void
    if (rpcUrl) {
      task = yield fork(rpcFlow, rpcUrl)
    }

    yield* take<GetInfoAction>(ActionType.GetInfo)
    if (task) {
      yield cancel(task)
    }
  }
}

function* rpcFlow(rpcUrl: Readonly<URL>) {
  yield* getInfo(rpcUrl)
  const chain = yield* select(selectors.getChain)
  if (chain.type === RemoteDataType.Success) {
    const rpcActionChannel = yield actionChannel([
      ActionType.GetBlock,
      ActionType.GetAbi,
      ActionType.DelBlock,
    ])
    const delBlocks: { [blockNum: number]: void } = {}
    while (true) {
      const action = yield* take<
        DelBlockAction | GetBlockAction | GetAbiAction
      >(rpcActionChannel)
      const startTime = Date.now()
      switch (action.type) {
      case ActionType.DelBlock:
        delBlocks[(action.blockNum as unknown) as number] = undefined
        continue
      case ActionType.GetBlock:
        const key = (action.blockNum as unknown) as number
        if (key in delBlocks) {
            delete delBlocks[key]
            continue
          }
        const controller = new AbortController()
        const { task, drop } = yield race({
            task: call(getBlock, rpcUrl, action.blockNum, controller.signal),
            drop: call(cancelGetBlock, action.blockNum),
          })
        if (drop) {
            console.log('ABORTED!!!!!!!!!!!!!!!!!!!!!!!')
            controller.abort()
          }
        break
      case ActionType.GetAbi:
          // TODO
        break
      }
      const endTime = Date.now()
      const elapsed = endTime - startTime
      if (elapsed < 300) {
        yield delay(150)
      }
    }
  }
}

function* getInfo(rpcUrl: Readonly<URL>) {
  const result = yield* call(api.getInfo, rpcUrl)
  yield put(setInfoAction(result))
}

function* getBlock(
  rpcUrl: Readonly<URL>,
  blockNum: Readonly<BlockNum>,
  signal: AbortSignal,
) {
  const result = yield* call(api.getBlock, rpcUrl, blockNum, signal)
  yield put(setBlockAction(blockNum, result))
}

function* cancelGetBlock(blockNum: Readonly<BlockNum>) {
  while (true) {
    const action = yield* take<DelBlockAction>([ActionType.DelBlock])
    if (action.blockNum === blockNum) {
      return true
    }
  }
}
