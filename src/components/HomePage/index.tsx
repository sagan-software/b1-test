import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { selectors, state, constants } from '../../store'
import { ChainPresets } from './ChainPresets'

const Title = styled.h1`
  text-align: center;
`

export const HomePage: React.FC = () => {
  // const dispatch = store.useDispatch()
  const urlInput = useSelector(selectors.getUrlInput)
  // const onChangeUrlInput = (e: React.ChangeEvent<HTMLInputElement>) =>
  //   dispatch(actions.setUrl(e.target.value))
  const mainnets = constants.chainPresets.filter(
    (preset) => preset.env === state.ChainEnv.Mainnet,
  )
  const testnets = constants.chainPresets.filter(
    (preset) => preset.env === state.ChainEnv.Testnet,
  )
  return (
    <main>
      <Title>Select a chain</Title>
      <ChainPresets presets={mainnets} />
      <ChainPresets presets={testnets} />
    </main>
  )
}
