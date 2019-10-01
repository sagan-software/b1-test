import React, { useState, useEffect } from 'react'
import useInterval from '@use-it/interval'
import { BlockNum } from '../../api'
import * as store from '../../store'
import { BlockSummary } from './BlockSummary'
import { ChainInfo } from './ChainInfo'

export const ChainOk: React.FC<{ chain: store.ChainSuccess }> = ({ chain }) => {
  const dispatch = store.useDispatch()
  const [autoplay, setAutoplay] = useState(true)

  useInterval(
    () => {
      dispatch(store.incrementBlockNumAction())
    },
    autoplay ? 500 : null,
  )

  const headBlockNum = (chain.headBlockNum as unknown) as number
  const blocks = []
  for (let i = 0; i < 10; i++) {
    const num = (headBlockNum - i) as BlockNum
    blocks.push(<BlockSummary key={num} num={num} />)
  }

  const toggleAutoplay = () => {
    if (!autoplay) {
      dispatch(store.getInfoAction())
    }
    setAutoplay(!autoplay)
  }

  return (
    <div>
      <div>
        <button onClick={toggleAutoplay}>Toggle Autoplay</button>
      </div>
      {blocks}
    </div>
  )
}
