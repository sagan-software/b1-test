import {
  actionChannel,
  put,
  delay,
  fork,
  takeEvery,
  takeLatest,
  call,
  select,
} from 'redux-saga/effects'
import { take } from './sagaEffects'
import { ActionType } from '../actions'
import {
  getUrl,
  getHasBlock,
  getBlockCount,
  RawInfo,
  remoteDataSuccess,
  remoteDataFailure,
  RemoteDataType,
  RemoteData,
  RawBlock,
} from '../state'

export function* saga() {
  // yield takeLatest(ActionType.UrlInput, onSetUrl)
  // yield takeLatest(ActionType.FetchInfo, onFetchInfo)
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

// function* onSetUrl() {
//   const url: ReturnType<typeof getUrl> = yield select(getUrl)
//   if (url) {
//     yield put(fetchInfo())
//   }
// }

// function* onFetchInfo(_action: FetchInfo) {
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
// }

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
