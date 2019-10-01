import React from 'react'
import styled from 'styled-components'
import * as store from '../../store'
import { ChainPresets } from './ChainPresets'

const Title = styled.h1`
  text-align: center;
`

export const HomePage: React.FC = () => {
  return (
    <main>
      <Title>Select a chain</Title>
      <ChainPresets presets={store.mainnets} />
      <ChainPresets presets={store.testnets} />
    </main>
  )
}
