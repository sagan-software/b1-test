import React, { useCallback } from 'react'
import useInterval from '@use-it/interval'
import styled from 'styled-components'
import * as api from '../../api'
import * as store from '../../store'
import { Block } from './Block'
import { TruncatedText } from '../TruncatedText'
import { FadeIn } from '../FadeIn'

const Wrapper = styled(FadeIn)``

const PageHeader = styled.header`
  display: grid;
  grid-template-areas:
    "chainName"
    "hostName"
    "chainId"
    "autoplay";
  padding: 20px 20px 10px;
`

const ChainName = styled.h1`
  grid-area: chainName;
  font-size: 18px;
  margin: 0;
`

const Hostname = styled.div`
  grid-area: hostName;
  font-size: 14px;
`

const ChainId = styled(TruncatedText)`
  grid-area: chainId;
  font-size: 14px;
  opacity: 0.75;
`

const BlocksHeader = styled.header`
  display: grid;
  grid-template-areas: "autoplay";
  padding: 10px 20px;
`

const ToggleAutoplay = styled.button`
  grid-area: autoplay;
`

const Blocks = styled.div``

export const ChainSuccessPage: React.FC<{
  readonly chain: Readonly<store.ChainSuccess>;
}> = ({ chain }) => {
  const dispatch = store.useDispatch()
  const autoplay = store.useSelector(store.getAutoplay)
  const hostname = store.useSelector(store.getRpcHostnameInput)
  const preset = store.useSelector(store.getChainPreset)
  const blockNum = (chain.headBlockNum as unknown) as number

  useInterval(
    () => {
      dispatch(store.incrementBlockNumAction())
    },
    autoplay ? 500 : null,
  )

  const blocks = []
  for (let i = 0; i < 10; i++) {
    const num = (blockNum - i) as api.BlockNum
    blocks.push(<Block key={num} num={num} />)
  }

  const toggleAutoplay = useCallback(() => {
    if (!autoplay) {
      dispatch(store.getInfoAction(hostname))
    }
    dispatch(store.setAutoplayAction(!autoplay))
  }, [dispatch, autoplay, hostname])

  return (
    <Wrapper>
      <PageHeader>
        <ChainName>{preset ? preset.name : 'Unknown chain'}</ChainName>
        <Hostname>{hostname}</Hostname>
        <ChainId>{chain.chainId}</ChainId>
      </PageHeader>
      <BlocksHeader>
        <ToggleAutoplay onClick={toggleAutoplay}>
          {autoplay ? 'Pause' : 'Play'}
        </ToggleAutoplay>
      </BlocksHeader>
      <Blocks>{blocks}</Blocks>
    </Wrapper>
  )
}
