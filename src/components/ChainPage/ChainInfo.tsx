import React from 'react'
import { RpcData, Info, RpcError } from '../../api'
import { useDispatch, useSelector, selectors, state } from '../../store'
import { RemoteDataType } from '../../coreTypes'

const ChainInfoOkWithPreset: React.FC<{
  info: Info;
  preset: state.ChainPreset;
}> = ({ info, preset }) => (
  <div>
    Chain ID: {info.chainId}, Preset: {preset.name}
  </div>
)

const ChainInfoOkWithoutPreset: React.FC<{ info: Info }> = ({ info }) => (
  <div>Chain ID: {info.chainId}, Unknown Chain</div>
)

const ChainInfoOk: React.FC<{ info: Info }> = ({ info }) => {
  const preset = useSelector(selectors.getChainPreset)
  if (preset) {
    return <ChainInfoOkWithPreset info={info} preset={preset} />
  } else {
    return <ChainInfoOkWithoutPreset info={info} />
  }
}

const ChainInfoFailure: React.FC<{ error: RpcError }> = ({ error }) => (
  <div>Error fetching chain info</div>
)

const ChainInfoLoading: React.FC = () => <div>Loading chain info</div>

export const ChainInfo: React.FC<{ info: RpcData<Info> }> = ({ info }) => {
  const preset = useSelector(selectors.getChainPreset)
  switch (info.type) {
  case RemoteDataType.Success:
    if (preset) {
        return <ChainInfoOkWithPreset info={info.data} preset={preset} />
      } else {
        return <ChainInfoOkWithoutPreset info={info.data} />
      }
  case RemoteDataType.Failure:
    return <ChainInfoFailure error={info.error} />
  default:
    return <ChainInfoLoading />
  }
}
