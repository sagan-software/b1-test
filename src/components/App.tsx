import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../store'
import LoadingPage from './LoadingPage'
import { getRouteTemplate, Route, Router, RouteType, Switch } from './Router'

// Lazy load pages to improve bundle sizes
const HomePage = React.lazy(() => import('./HomePage'))
const ChainPage = React.lazy(() => import('./ChainPage'))
const BlockPage = React.lazy(() => import('./BlockPage'))
const AccountPage = React.lazy(() => import('./AccountPage'))
const TransactionPage = React.lazy(() => import('./TransactionPage'))
const NotFoundPage = React.lazy(() => import('./NotFoundPage'))

const App: React.FC = () => (
  <React.Suspense fallback={<LoadingPage />}>
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
          <Route
            component={AccountPage}
            path={getRouteTemplate(RouteType.Account)}
          />
          <Route
            component={TransactionPage}
            path={getRouteTemplate(RouteType.Transaction)}
          />
          <Route component={NotFoundPage} />
        </Switch>
        <CssBaseline />
      </Router>
    </Provider>
  </React.Suspense>
)

export default App
