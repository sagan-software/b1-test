import React from 'react'
import styled from 'styled-components'
import * as store from '../../store'
import { ChainPresets } from './ChainPresets'
import { FadeIn } from '../FadeIn'

const Wrapper = styled(FadeIn)``

export const HomePage: React.FC = () => {
  return (
    <Wrapper>
      <ChainPresets presets={store.chainPresets} />
    </Wrapper>
  )
}
