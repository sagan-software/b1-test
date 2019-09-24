import React from 'react'
import { useSelector } from 'react-redux'
import * as store from '../store'
import {
  RpcServerStatus,
  RemoteData,
  Info,
  RemoteDataOk,
  RemoteDataStatus,
  RemoteDataUpdating,
} from '../store'
import Block from './Block'

const ChainInfoOk: React.FC<{
  readonly info: RemoteDataOk<Info> | RemoteDataUpdating<Info>;
}> = (props) => {
  return (
    <div>
      <div>Chain id: {props.info.data.chain_id}</div>
      <Block num={props.info.data.head_block_num} />
      <Block num={props.info.data.head_block_num - 1} />
      <Block num={props.info.data.head_block_num - 2} />
      <Block num={props.info.data.head_block_num - 3} />
      <Block num={props.info.data.head_block_num - 4} />
      <Block num={props.info.data.head_block_num - 5} />
      <Block num={props.info.data.head_block_num - 6} />
      <Block num={props.info.data.head_block_num - 7} />
      <Block num={props.info.data.head_block_num - 8} />
      <Block num={props.info.data.head_block_num - 9} />
    </div>
  )
}

const ChainInfo: React.FC<{
  readonly info: RemoteData<Info>;
}> = (props) => {
  switch (props.info.status) {
  case RemoteDataStatus.Ok:
  case RemoteDataStatus.Updating:
    return <ChainInfoOk info={props.info} />
  default:
    return <div>Balls</div>
  }
}

export default ChainInfo
