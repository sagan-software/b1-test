import { put, delay, fork, cancel } from 'redux-saga/effects'
import { take, call, cancelled, select } from 'typed-redux-saga'
import * as api from '../api'
import { ActionType, PlayBlocks, SelectAccount, SelectBlock } from './actions'
import {
  createSetInfo,
  createPushBlock,
  createSetSelectedBlock,
} from './actionCreators'
import { getBlock, getSelectedBlock, getUrl, getInfo } from './selectors'

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
    }
  }
}

function* onPlayBlocks({ url }: PlayBlocks) {
  const info = yield* call(api.getInfo, url)
  yield put(createSetInfo(url, info, true))

  if (info.type === api.ResultType.Err) {
    return
  }

  const task = yield fork(playBlocksFlow, url, info.data.head_block_num)
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
  const block = yield* select(getSelectedBlock)
  if (!block) {
    const info = yield* select(getInfo)
    if (!info) {
      const info = yield* call(api.getInfo, url)
      yield put(createSetInfo(url, info, false))
    }

    const result = yield* call(api.getBlock, url, num)
    yield put(createSetSelectedBlock(url, { num, result }))
  }
}
