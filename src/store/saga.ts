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
  ActionType,
  GetInfoAction,
  GetBlockAction,
  GetAbiAction,
  DelBlockAction,
} from './action'
import { setInfoAction, setBlockAction, setAbiAction } from './actionCreators'
import * as selectors from './selectors'
import { RemoteDataType } from '../coreTypes'
import { BlockNum, AccountName } from '../api'
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
    ])
    while (true) {
      const action = yield* take<GetBlockAction | GetAbiAction>(
        rpcActionChannel,
      )
      switch (action.type) {
      case ActionType.GetBlock:
        yield call(getBlock, rpcUrl, action.blockNum)
        break
      case ActionType.GetAbi:
          // TODO
        yield call(getAbi, rpcUrl, action.account)
        break
      }
      yield delay(150)
    }
  }
}

function* getInfo(rpcUrl: Readonly<URL>) {
  const result = yield* call(api.getInfo, rpcUrl)
  yield put(setInfoAction(result))
}

function* getBlock(rpcUrl: Readonly<URL>, blockNum: Readonly<BlockNum>) {
  const result = yield* call(api.getBlock, rpcUrl, blockNum)
  yield put(setBlockAction(blockNum, result))
}

function* getAbi(rpcUrl: Readonly<URL>, account: Readonly<AccountName>) {
  const result = yield* call(api.getAbi, rpcUrl, account)
  yield put(setAbiAction(account, result))
}
