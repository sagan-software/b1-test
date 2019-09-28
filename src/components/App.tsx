import React from 'react'
import styled, {
  createGlobalStyle,
  ThemeProps,
  ThemeProvider,
} from 'styled-components'
import { useSelector } from 'react-redux'
import { store, selectors, state, action } from '../store'

const GlobalStyles = createGlobalStyle<ThemeProps<state.Theme>>`
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

export const App: React.FC = () => {
  const theme = useSelector(selectors.getTheme)
  // const dispatch = store.useDispatch()
  const urlInput = useSelector(selectors.getUrlInput)
  // const onChangeUrlInput = (e: React.ChangeEvent<HTMLInputElement>) =>
  //   dispatch(actions.setUrl(e.target.value))
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <AppHeader>
          <AppTitle>b1-test</AppTitle>
        </AppHeader>
        <main />
        <GlobalStyles />
      </AppContainer>
    </ThemeProvider>
  )
}
