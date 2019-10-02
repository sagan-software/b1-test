import React, { useCallback } from 'react'
import styled from 'styled-components'
import * as store from '../../store'
import { Link, homeRoute } from '../Router'

const Wrapper = styled.header`
  display: grid;
  grid-template-areas:
    "title theme"
    "input input";
  padding: 10px 20px;
  text-transform: uppercase;
  border-bottom: 1px solid #ccc;
`

const Title = styled(Link)`
  grid-area: title;
  align-content: center;
`

const ThemeToggle = styled.button`
  grid-area: theme;
`

const UrlInput = styled.input`
  grid-area: input;
  text-align: center;
  padding: 10px;
`

export const AppHeader: React.FC = () => {
  const rpcHostnameInput = store.useSelector(store.getRpcHostnameInput)
  const dispatch = store.useDispatch()
  const theme = store.useSelector(store.getTheme)
  const isDarkTheme = theme === store.darkTheme
  const toggleTheme = useCallback(() => {
    const newTheme = isDarkTheme ? store.lightTheme : store.darkTheme
    dispatch(store.setThemeAction(newTheme))
  }, [dispatch, isDarkTheme])
  return (
    <Wrapper>
      <Title to={homeRoute()}>b1 dev test</Title>
      <ThemeToggle onClick={toggleTheme}>
        {isDarkTheme ? 'Light theme' : 'Dark theme'}
      </ThemeToggle>
    </Wrapper>
  )
}
