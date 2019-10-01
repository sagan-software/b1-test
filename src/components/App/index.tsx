import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { store, useSelector, getTheme } from '../../store'
import { BlockPage } from '../BlockPage'
import { ChainPage } from '../ChainPage'
import { HomePage } from '../HomePage'
import { NotFoundPage } from '../NotFoundPage'
import { Router, Switch, Route, RouteType, getRouteTemplate } from '../Router'
import { GlobalStyles } from './GlobalStyles'

const AppWithTheme: React.FC = () => {
  const theme = useSelector(getTheme)
  return (
    <ThemeProvider theme={theme}>
      <>
        <Switch>
          <Route
            exact={true}
            component={BlockPage}
            path={getRouteTemplate(RouteType.Block)}
          />
          <Route
            exact={true}
            component={HomePage}
            path={getRouteTemplate(RouteType.Home)}
          />
          <Route
            exact={true}
            component={ChainPage}
            path={getRouteTemplate(RouteType.Chain)}
          />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyles />
      </>
    </ThemeProvider>
  )
}

export const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <AppWithTheme />
    </Router>
  </Provider>
)
