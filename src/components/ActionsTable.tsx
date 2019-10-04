import React from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Link from './Link'
import { accountRoute } from './Router'
import * as api from '../api'
import { Typography, Hidden } from '@material-ui/core'

const ActionRow: React.FC<{
  url: URL;
  action: api.ActionWithTransactionId;
}> = ({ url, action }) => {
  const authorization = action.authorization.map((auth) => {
    const key = auth.actor + auth.permission
    return (
      <Typography noWrap={true} key={key} variant='body2'>
        <Link to={accountRoute(url.host, auth.actor)}>{auth.actor}</Link>
        <Hidden xsDown={true}> @ {auth.permission}</Hidden>
      </Typography>
    )
  })
  return (
    <TableRow>
      <Hidden xsDown={true}>
        <TableCell>
          <Link to={accountRoute(url.host, action.account)}>
            <Typography
              noWrap={true}
              style={{ maxWidth: 100 }}
              variant='body2'
              color='inherit'
            >
              {action.id}
            </Typography>
          </Link>
        </TableCell>
      </Hidden>
      <TableCell>
        <Link to={accountRoute(url.host, action.account)}>
          {action.account}
        </Link>
      </TableCell>
      <TableCell>
        <Link to={accountRoute(url.host, action.account)}>{action.name}</Link>
      </TableCell>
      <TableCell>{authorization}</TableCell>
      <Hidden smDown={true}>
        <TableCell>
          <Typography noWrap={true} variant='body2' style={{ maxWidth: 150 }}>
            {JSON.stringify(action.data)}
          </Typography>
        </TableCell>
      </Hidden>
    </TableRow>
  )
}

const ActionsTable: React.FC<{
  url: URL;
  actions: api.ActionWithTransactionId[];
}> = ({ url, actions }) => {
  const rows = actions.map((action) => {
    const key = `${action.id}-${action.account}-${action.name}-${action.hex_data}`
    return <ActionRow key={key} url={url} action={action} />
  })

  return (
    <Paper>
      <Table stickyHeader={true}>
        <TableHead>
          <TableRow>
            <Hidden xsDown={true}>
              <TableCell>Transaction ID</TableCell>
            </Hidden>
            <TableCell>Contract</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Authorization</TableCell>
            <Hidden smDown={true}>
              <TableCell>Data</TableCell>
            </Hidden>
          </TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    </Paper>
  )
}

export default ActionsTable
