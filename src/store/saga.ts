import { delay, fork, put, actionChannel } from 'redux-saga/effects'
import { call, take, select } from 'typed-redux-saga'
import * as api from '../api'
import {
  Action,
  ActionType,
  GetInfoAction,
  GetBlockAction,
  GetAbiAction,
  InitChainAction,
  IncrementHeadBlockNumAction,
} from './action'
import { setInfoAction, setBlockAction } from './actionCreators'
import * as selectors from './selectors'
import { RemoteDataType } from '../coreTypes'
import { ChainSuccess } from './state'
import { BlockNum } from '../api'

export function* saga() {
  yield fork(chainFlow)
}

function* chainFlow() {
  while (true) {
    const action = yield* take<InitChainAction>(ActionType.InitChain)
    const rpcUrl = yield* select(selectors.getRpcUrl)
    if (rpcUrl) {
      yield* initChain(rpcUrl)
      const chain = yield* select(selectors.getChain)
      if (chain.type === RemoteDataType.Success) {
        yield* rpcFlow(chain.data)
      }
    }
  }
}

function* initChain(rpcUrl: URL) {
  yield* getInfo(rpcUrl)
}

function* rpcFlow(chain: Readonly<ChainSuccess>) {
  const rpcActionChannel = yield actionChannel([
    ActionType.GetInfo,
    ActionType.GetBlock,
    ActionType.GetAbi,
  ])
  while (true) {
    const action = yield* take<GetInfoAction | GetBlockAction | GetAbiAction>(
      rpcActionChannel,
    )
    const task = yield fork(onRpcAction, chain, action)
    yield delay(150)
  }
}

function* onRpcAction(
  chain: Readonly<ChainSuccess>,
  action: GetInfoAction | GetBlockAction | GetAbiAction,
) {
  switch (action.type) {
  case ActionType.GetInfo:
    yield* getInfo(chain.rpcUrl)
    break
  case ActionType.GetBlock:
    yield* getBlock(chain.rpcUrl, action.blockNum)
  case ActionType.GetAbi:
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
