import React from 'react'
import styled from 'styled-components'
import * as store from '../../store'
import { Link, chainRoute } from '../Router'
import { TruncatedText } from '../TruncatedText'

const Wrapper = styled(Link)`
  border: 1px solid #fff;
  display: grid;
  grid-template-areas:
    "name"
    "hostname";
  grid-template-columns: 1fr;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
`

const Name = styled.h2`
  grid-area: name;
  margin: 0;
`

const Hostname = styled.div`
  grid-area: hostname;
  text-align: left;
`

const Id = styled(TruncatedText)`
  grid-area: id;
  display: none;
`

export const ChainPreset: React.FC<{
  readonly preset: Readonly<store.ChainPreset>;
}> = ({ preset }) => {
  return (
    <Wrapper to={chainRoute(preset.defaultHostname)}>
      <Name>{preset.name}</Name>
      <Hostname>{preset.defaultHostname}</Hostname>
      <Id>{preset.id}</Id>
    </Wrapper>
  )
}
