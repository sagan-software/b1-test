import React from 'react'
import styled, {
  createGlobalStyle,
  ThemeProps,
  ThemeProvider,
} from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import * as store from '../store'
import Chain from './Chain'

const GlobalStyles = createGlobalStyle<ThemeProps<store.Theme>>`
body {
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  font-family: "Share Tech Mono", monospace;
}
`

const AppContainer = styled.div``

const AppHeader = styled.header``

const AppTitle = styled.a``

const AppNav = styled.nav``

export const AppMain = styled.main``

const Component: React.FC = () => {
  const theme = useSelector(store.getTheme)
  const dispatch = useDispatch<typeof store.store.dispatch>()
  const urlInput = useSelector(store.getUrlInput)
  const onChangeUrlInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(store.setUrl(e.target.value))
  const autoplay = useSelector(store.getAutoplay)
  const maxBlockCount = useSelector(store.getMaxBlockCount)
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <AppHeader>
          <AppTitle>b1-test</AppTitle>
          <form>
            <input value={urlInput} type='url' onChange={onChangeUrlInput} />
            <label>
              <input type='checkbox' checked={autoplay} />
              Autoplay
            </label>
            <label>
              <input value={maxBlockCount} type='number' />
              Max Block Count
            </label>
            <button type='submit'>Go</button>
          </form>
        </AppHeader>
        <main>
          <Chain />
        </main>
        <GlobalStyles />
      </AppContainer>
    </ThemeProvider>
  )
}

export default Component
