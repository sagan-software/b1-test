import React from 'react'
import { Info } from '../../api'
import * as store from '../../store'
import { RemoteDataType } from '../../coreTypes'

const ChainInfoOkWithPreset: React.FC<{
  info: Info;
  preset: store.ChainPreset;
}> = ({ info, preset }) => (
  <div>
    Chain ID: {info.chainId}, Preset: {preset.name}
  </div>
)

const ChainInfoOkWithoutPreset: React.FC<{ info: Info }> = ({ info }) => (
  <div>Chain ID: {info.chainId}, Unknown Chain</div>
)

export const ChainInfo: React.FC<{ info: Info }> = ({ info }) => {
  const preset = store.useSelector(store.getChainPreset)
  if (preset) {
    return <ChainInfoOkWithPreset info={info} preset={preset} />
  } else {
    return <ChainInfoOkWithoutPreset info={info} />
  }
}
