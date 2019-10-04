import React from 'react'
import { Provider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import { store } from '../store'
import BlockPage from './BlockPage'
import ChainPage from './ChainPage'
import HomePage from './HomePage'
// import AccountPage from './AccountPage'
import NotFoundPage from './NotFoundPage'
import { Router, Switch, Route, RouteType, getRouteTemplate } from './Router'

const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <Switch>
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
        <Route
          exact={true}
          component={BlockPage}
          path={getRouteTemplate(RouteType.Block)}
        />
        {/* <Route
          component={AccountPage}
          path={getRouteTemplate(RouteType.Account)}
        /> */}
        <Route component={NotFoundPage} />
      </Switch>
      <CssBaseline />
    </Router>
  </Provider>
)

export default App
