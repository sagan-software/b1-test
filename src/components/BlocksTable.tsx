import React from 'react'
import {
  Paper,
  Hidden,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import Link from './Link'
import { blockRoute, accountRoute } from './Router'
import * as api from '../api'
import * as store from '../store'

const BlockRow: React.FC<{ url: URL; block: store.Block }> = ({
  block,
  url,
}) => {
  const result = block.result
  const route = blockRoute(url.host, block.num)
  let producer
  let actions
  let timestamp
  let id
  if (result && api.isOk(result)) {
    const data = result.data
    producer = (
      <Link to={accountRoute(url.host, data.producer)}>{data.producer}</Link>
    )
    actions = api.getNumActionsInBlock(data).toLocaleString()
    timestamp = data.timestamp
    id = data.id
  } else {
    producer = <Skeleton />
    actions = <Skeleton />
    timestamp = <Skeleton />
    id = <Skeleton />
  }
  return (
    <TableRow>
      <TableCell component='th' scope='row'>
        <Link to={route}>{block.num.toLocaleString()}</Link>
      </TableCell>
      <Hidden smDown={true}>
        <TableCell align='right'>
          <Link to={route}>
            <Typography variant='body2' noWrap={true} style={{ maxWidth: 250 }}>
              {id}
            </Typography>
          </Link>
        </TableCell>
      </Hidden>
      <TableCell align='center'>{producer}</TableCell>
      <TableCell align='right'>{actions}</TableCell>
      <Hidden xsDown={true}>
        <TableCell align='right'>{timestamp}</TableCell>
      </Hidden>
    </TableRow>
  )
}

const BlocksTable: React.FC<{ url: URL; blocks: store.Block[] }> = ({
  url,
  blocks,
}) => {
  const rows = blocks.map((block) => (
    <BlockRow key={block.num} block={block} url={url} />
  ))
  return (
    <Paper>
      <Table stickyHeader={true}>
        <TableHead>
          <TableRow>
            <TableCell>Block #</TableCell>
            <Hidden smDown={true}>
              <TableCell>Block Id</TableCell>
            </Hidden>
            <TableCell align='center'>Producer</TableCell>
            <TableCell align='right'>Actions</TableCell>
            <Hidden xsDown={true}>
              <TableCell align='right'>Timestamp</TableCell>
            </Hidden>
          </TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    </Paper>
  )
}

export default BlocksTable
