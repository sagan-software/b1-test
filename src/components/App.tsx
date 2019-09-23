import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'
import styled, {
  createGlobalStyle,
  ThemeProps,
  ThemeProvider,
} from 'styled-components'
import HomePage from './HomePage'
import ChainPage from './ChainPage'
import SettingsPage from './SettingsPage'
import BlockPage from './SettingsPage'
import NotFoundPage from './NotFoundPage'
import { Theme, darkTheme } from '../styles'
import { history } from '../store'
import { getRouteTemplate, RouteType } from '../routes'

const GlobalStyles = createGlobalStyle<ThemeProps<Theme>>`
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
  return (
    <ThemeProvider theme={darkTheme}>
      <AppContainer>
        <AppHeader>
          <AppTitle>eosblock.watch</AppTitle>
          <AppNav>Settings</AppNav>
        </AppHeader>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              exact={true}
              path={getRouteTemplate(RouteType.Home)}
              component={HomePage}
            />
            <Route
              exact={true}
              path={getRouteTemplate(RouteType.Settings)}
              component={SettingsPage}
            />
            <Route
              path={getRouteTemplate(RouteType.Chain)}
              component={ChainPage}
            />
            <Route
              path={getRouteTemplate(RouteType.Block)}
              component={BlockPage}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </ConnectedRouter>
        <GlobalStyles />
      </AppContainer>
    </ThemeProvider>
  )
}

export default Component
