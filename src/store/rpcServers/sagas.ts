import {
  call,
  cancel,
  put,
  race,
  select,
  take,
  fork,
  takeEvery,
  all,
  takeLatest,
} from 'redux-saga/effects'
import * as chains from '../chains'
import * as actions from './actions'
import * as selectors from './selectors'

export function* saga() {
  yield fork(init)
  yield takeEvery(actions.ActionType.GetInfo, onGetInfo)
  yield takeEvery(actions.ActionType.GetInfoOk, onGetInfoOk)
  yield takeEvery(actions.ActionType.GetBlock, onGetBlock)
  yield takeEvery(actions.ActionType.GetBlockOk, onGetBlockOk)
}

export function* init() {
  const servers: ReturnType<typeof selectors.getAll> = yield select(
    selectors.getAll,
  )
  yield all(servers.map((s) => put(actions.getInfo(s.url))))
}

function* onGetInfo(action: actions.GetInfoAction) {
  const url = `${action.url}/v1/chain/get_info`
  const start = new Date()
  try {
    const res = yield call(fetch, url)
    const end = new Date()
    const info: chains.Info = yield call(res.json.bind(res))
    const ping = end.getTime() - start.getTime()
    yield put(actions.getInfoOk(action.url, info, ping))
    yield put(chains.setInfo(info))
  } catch (e) {
    yield put(actions.getInfoErr(action.url))
    yield cancel()
  }
}

function* onGetInfoOk(action: actions.GetInfoOkAction) {
  const chainId = action.info.chain_id
  const blockId = action.info.head_block_id
  const chain: ReturnType<typeof chains.getById> = yield select(
    chains.getById,
    chainId,
  )
  if (chain && !(blockId in chain.blocks)) {
    yield put(actions.getBlock(action.url, chainId, blockId))
  }
}

function* onGetBlock(action: actions.GetBlockAction) {
  const url = `${action.url}/v1/chain/get_block`
  try {
    const res = yield call(fetch, url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        block_num_or_id: action.blockId,
      }),
    })
    const block = yield call(res.json.bind(res))
    yield put(actions.getBlockOk(action.url, action.chainId, block))
    yield put(chains.addBlock(action.chainId, block))
  } catch (e) {
    yield put(actions.getBlockErr(action.url, action.chainId, action.blockId))
    yield cancel()
  }
}

function* onGetBlockOk(action: actions.GetBlockOkAction) {
  const chain: ReturnType<typeof chains.getById> = yield select(
    chains.getById,
    action.chainId,
  )
  if (chain && Object.keys(chain.blocks).length < 10) {
    yield put(
      actions.getBlock(action.url, action.chainId, action.block.previous),
    )
  }
}
