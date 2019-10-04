import { put, delay, fork, cancel } from 'redux-saga/effects'
import { take, call, select } from 'typed-redux-saga'
import * as api from '../api'
import { ActionType, PlayBlocks, SelectAccount, SelectBlock } from './actions'
import {
  createSetInfo,
  createPushBlock,
  createSetSelectedAccount,
  createSetSelectedBlock,
} from './actionCreators'
import * as selectors from './selectors'

export function* saga() {
  while (true) {
    const action = yield* take<PlayBlocks | SelectAccount | SelectBlock>([
      ActionType.PlayBlocks,
      ActionType.SelectAccount,
      ActionType.SelectBlock,
    ])

    switch (action.type) {
    case ActionType.PlayBlocks:
      yield* onPlayBlocks(action)
      break
    case ActionType.SelectBlock:
      yield* onSelectBlock(action)
      break
    case ActionType.SelectAccount:
      yield* onSelectAccount(action)
      break
    }
  }
}

function* getInfo(url: URL, isPlaying: boolean) {
  const info = yield* call(api.getInfo, url)
  yield put(createSetInfo(url, info, isPlaying))
}

function* getInfoIfNecessary(url: URL, isPlaying: boolean) {
  const previousUrl = yield* select(selectors.getUrl)
  if (!previousUrl || previousUrl.host !== url.host) {
    yield* getInfo(url, isPlaying)
  }
}

function* onPlayBlocks({ url }: PlayBlocks) {
  yield* getInfo(url, true)

  const info = yield* select(selectors.getInfo)
  if (!info) {
    return
  }

  const task = yield fork(playBlocksFlow, url, info.head_block_num)
  yield* take(ActionType.PauseBlocks)
  yield cancel(task)
}

export function* playBlocksFlow(url: URL, headBlockNum: api.BlockNum) {
  const controller = new AbortController()
  try {
    while (true) {
      const block = yield* call(
        api.getBlock,
        url,
        headBlockNum,
        controller.signal,
      )
      yield put(createPushBlock(url, headBlockNum, block))
      yield delay(500)
      headBlockNum++
    }
  } finally {
    controller.abort()
  }
}

function* onSelectBlock({ url, num }: SelectBlock) {
  yield* getInfoIfNecessary(url, false)
  const selected = yield* select(selectors.getSelectedBlock)
  if (!selected) {
    const result = yield* call(api.getBlock, url, num)
    yield put(createSetSelectedBlock(url, { num, result }))
  }
}

function* onSelectAccount({ url, account }: SelectAccount) {
  yield* getInfoIfNecessary(url, false)
  const selected = yield* select(selectors.getSelectedAccount)
  if (!selected) {
    const abi = yield* call(api.getAbi, url, account)
    yield put(createSetSelectedAccount(url, { name: account, abi }))
  }
}
