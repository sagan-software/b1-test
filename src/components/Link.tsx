import { Link as MuiLink } from '@material-ui/core'
import React from 'react'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'
import { getRouteString, RouteParams } from './Router'

const Component: React.FC<{ to: RouteParams }> = ({
  to,
  children,
  ...props
}) => {
  const renderLink = React.useMemo(
    () =>
      React.forwardRef<
        HTMLAnchorElement,
        Omit<RouterLinkProps, 'innerRef' | 'to'>
      >((itemProps, ref) => (
        // With react-router-dom@^6.0.0 use `ref` instead of `innerRef`
        // See https://github.com/ReactTraining/react-router/issues/6056
        <RouterLink to={getRouteString(to)} {...itemProps} innerRef={ref} />
      )),
    [to],
  )

  return (
    <MuiLink component={renderLink} {...props}>
      {children}
    </MuiLink>
  )
}

export default Component
