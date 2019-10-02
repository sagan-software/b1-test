import React, { useEffect } from 'react'
import styled from 'styled-components'
import * as api from '../../api'
import * as store from '../../store'
import { remoteDataDefault, RemoteDataType } from '../../coreTypes'
import { TruncatedText } from '../TruncatedText'
import { Link, blockRoute, BlockRouteParams } from '../Router'

const Wrapper = styled(Link)`
  display: grid;
  grid-template-areas:
    "num id id"
    "timestamp timestamp actions";
  grid-gap: 10px;
  justify-content: align-start;
  transition: 300ms opacity;
  height: 50px;
  padding: 10px 20px;
`

const WrapperOk = styled(Wrapper)``

const Num = styled.div`
  grid-area: num;
  font-weight: bold;
`

const Id = styled(TruncatedText)`
  grid-area: id;
  font-size: 14px;
`

const Producer = styled.div`
  grid-area: producer;
  display: none;
`

const Timestamp = styled.time`
  grid-area: timestamp;
  font-size: 14px;
`

const Actions = styled.div`
  grid-area: actions;
  text-align: right;
  font-size: 14px;

  &::after {
    content: " actions";
  }
`

const BlockOk: React.FC<{
  readonly block: Readonly<api.Block>;
  readonly route: Readonly<BlockRouteParams>;
}> = ({ block, route }) => {
  const numActions = api.getNumActionsInBlock(block)
  return (
    <WrapperOk to={route}>
      <Num>{block.blockNum.toLocaleString()}</Num>
      <Id>{block.id}</Id>
      <Producer>{block.producer}</Producer>
      <Timestamp title='asdf'>{block.timestamp.toISOString()}</Timestamp>
      <Actions>{numActions}</Actions>
    </WrapperOk>
  )
}

const BlockErr: React.FC<{
  readonly num: Readonly<api.BlockNum>;
  readonly error: Readonly<api.RpcError>;
  readonly route: Readonly<BlockRouteParams>;
}> = ({ num, error, route }) => {
  return (
    <Wrapper to={route}>
      <Num>{num.toLocaleString()}</Num>
    </Wrapper>
  )
}

const BlockLoading: React.FC<{
  readonly num: Readonly<api.BlockNum>;
  readonly route: Readonly<BlockRouteParams>;
}> = ({ num, route }) => {
  return (
    <Wrapper to={route}>
      <Num>{num.toLocaleString()}</Num>
    </Wrapper>
  )
}

export const Block: React.FC<{
  readonly num: Readonly<api.BlockNum>;
}> = ({ num }) => {
  const dispatch = store.useDispatch()
  const block =
    store.useSelector((state) => store.getBlock(state, num)) || remoteDataDefault
  const hostname = store.useSelector(store.getRpcHostnameInput)
  const route = blockRoute(hostname, num)

  useEffect(() => {
    if (block.type === RemoteDataType.Default) {
      dispatch(store.getBlockAction(num))
    }
    return () => {
      dispatch(store.delBlockAction(num))
    }
  }, [dispatch, num])

  switch (block.type) {
  case RemoteDataType.Success:
    return <BlockOk block={block.data} route={route} />
  case RemoteDataType.Failure:
    return <BlockErr num={num} error={block.data} route={route} />
  case RemoteDataType.Default:
  case RemoteDataType.Loading:
    return <BlockLoading num={num} route={route} />
  }
}
