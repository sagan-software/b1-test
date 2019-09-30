import { take, takeLatest, put } from 'redux-saga/effects'
import { select, call } from 'typed-redux-saga'
import * as api from '../../api'
import {
  remoteDataLoading,
  remoteDataSuccess,
  ResultType,
  resultToRemoteData,
} from '../../coreTypes'
import { getUrlInput } from '../rootSelectors'
import { InputActionType } from '../input/action'
import { setChain, ChainActionType, GetInfo } from './action'
// import {
//   getUrl,
//   getHasBlock,
//   getBlockCount,
//   RawInfo,
//   remoteDataSuccess,
//   remoteDataFailure,
//   RemoteDataType,
//   RemoteData,
//   RawBlock,
// } from '../state'

export function* chainSaga() {
  yield takeLatest(InputActionType.SetUrl, onSetUrl)
  yield takeLatest(ChainActionType.GetInfo, onGetInfo)
  // yield takeLatest(ActionType.FetchedInfo, onFetchedInfo)
  // yield fork(fetchBlocks)
  //   yield takeEvery(ActionType.FetchedBlock, onFetchedBlock)
}

// function* fetchBlocks() {
//   const fetchBlockChan = yield actionChannel(ActionType.FetchBlock)
//   while (true) {
//     const action = yield take(fetchBlockChan)
//     yield onFetchBlock(action)
//     // yield delay(25)
//   }
// }

function* onSetUrl() {
  const url = yield* select(getUrlInput)
  if (url) {
    yield* checkChain(url)
  }
}

function* checkChain(urlInput: string) {
  const url = new URL(`https://${urlInput}`)
  yield put(setChain(remoteDataLoading()))
  const info = yield* call(api.getInfo, url)
  yield put(
    setChain(
      remoteDataSuccess({
        url,
        info: resultToRemoteData(info),
        blocks: {},
      }),
    ),
  )
}

function* onGetInfo(_action: GetInfo) {
  //   const url: ReturnType<typeof getUrl> = yield select(getUrl)
  //   if (url) {
  //     const infoUrl = new URL('/v1/chain/get_info', url)
  //     let data: RemoteData<RawInfo>
  //     try {
  //       const res: Response = yield call(fetch, infoUrl.toString())
  //       const info: RawInfo = yield call(res.json.bind(res))
  //       data = remoteDataOk(info)
  //     } catch (e) {
  //       data = remoteDataError('bad response')
  //     }
  //     yield put(fetchedInfo(data))
  //   }
}

// function* onFetchedInfo(action: FetchedInfo) {
//   if (action.info.status === RemoteDataStatus.Success) {
//     const blockNum = action.info.data.head_block_num
//     const hasBlock: ReturnType<typeof getHasBlock> = yield select(
//       getHasBlock,
//       blockNum,
//     )
//     if (!hasBlock) {
//       yield put(fetchBlock(blockNum))
//     }
//   }
// }

// function* onFetchBlock(action: FetchBlock) {
//   const serverUrl: ReturnType<typeof getUrl> = yield select(getUrl)
//   if (serverUrl) {
//     const url = new URL('/v1/chain/get_block', serverUrl)
//     let data: RemoteData<RawBlock>
//     try {
//       const res = yield call(fetch, url.toString(), {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           block_num_or_id: action.blockNum,
//         }),
//       })
//       try {
//         const block: RawBlock = yield call(res.json.bind(res))
//         data = remoteDataOk(block)
//       } catch (e) {
//         data = remoteDataError('bad json')
//       }
//     } catch (e) {
//       data = remoteDataError('bad response')
//     }
//     yield put(fetchedBlock(action.blockNum, data))
//   }
// }

// function* onFetchedBlock(action: FetchedBlock) {
//   if (action.block.status === RemoteDataStatus.Ok) {
//     const blockCount: ReturnType<typeof getBlockCount> = yield select(
//       getBlockCount,
//     )
//     const maxBlockCount: ReturnType<typeof getMaxBlockCount> = yield select(
//       getMaxBlockCount,
//     )
//     if (blockCount < maxBlockCount) {
//       yield put(fetchBlock(action.block.data.previous))
//     }
//   }
// }

//   function* onFetchBlockOk(action: actions.FetchBlockOkAction) {
//     const chain: ReturnType<typeof chains.getById> = yield select(
//       chains.getById,
//       action.chainId,
//     )
//     if (chain && Object.keys(chain.blocks).length < 10) {
//       yield put(
//         actions.fetchBlock(action.url, action.chainId, action.block.previous),
//       )
//     }
//   }
