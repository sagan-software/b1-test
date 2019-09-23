import React from 'react'
import { useSelector } from 'react-redux'
import * as store from '../store'
import { AppMain } from './App'
import styled from 'styled-components'
import { Sparklines, SparklinesLine } from 'react-sparklines'

const Component: React.FC = () => {
  const chains = useSelector(store.chains.getAll)
  return (
    <AppMain>
      <Sparklines data={[10, 1, 9, 2, 8, 3, 7, 4, 6, 5]} min={0}>
        <SparklinesLine color='blue' />
      </Sparklines>
    </AppMain>
  )
}

export default Component
