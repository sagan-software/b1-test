import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Hidden,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core'
import ReceiptIcon from '@material-ui/icons/Receipt'
import React from 'react'
import * as api from '../api'
import * as store from '../store'
import Link from './Link'
import RicardianText from './RicardianText'
import { accountRoute } from './Router'

const RicardianDialog: React.FC<{
  url: URL;
  action: api.ActionWithTransactionId;
}> = ({ url, action }) => {
  const [open, setOpen] = React.useState(false)

  const openDialog = React.useCallback(() => setOpen(true), [setOpen])
  const closeDialog = React.useCallback(() => setOpen(false), [setOpen])
  const selected = store.useSelector(store.getSelectedAccount)
  const isSelected = selected && selected.name === action.account
  const dispatch = store.useDispatch()

  React.useEffect(() => {
    if (open && !isSelected) {
      dispatch(store.createSelectAccount(url, action.account))
    }
  }, [url, action.account, isSelected, dispatch, open])

  let content
  if (!selected || !selected.abi) {
    content = 'Loading'
  } else if (api.isErr(selected.abi)) {
    content = 'Error fetching ABI'
  } else if (!selected.abi.data.abi) {
    content = 'Not a smart contract'
  } else {
    const abi = selected.abi.data.abi
    for (let i = abi.actions.length; i--; ) {
      const actionAbi = abi.actions[i]
      if (actionAbi.name === action.name) {
        if (actionAbi.ricardian_contract) {
          content = (
            <RicardianText
              text={actionAbi.ricardian_contract}
              data={action.data}
            />
          )
        } else {
          content = 'No ricardian contract'
        }
        break
      }
    }
  }

  return (
    <>
      <Tooltip title='View ricardian contract' placement='top-end'>
        <IconButton size='small' onClick={openDialog}>
          <ReceiptIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby='scroll-dialog-title'
      >
        <DialogTitle id='scroll-dialog-title'>
          {action.account} / {action.name}
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText component='div'>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const ActionRow: React.FC<{
  url: URL;
  action: api.ActionWithTransactionId;
}> = ({ url, action }) => {
  const authorization = action.authorization.map((auth) => {
    const key = auth.actor + auth.permission
    return (
      <Typography noWrap={true} key={key} variant='body2'>
        {auth.actor}
        <Hidden smDown={true}> @ {auth.permission}</Hidden>
      </Typography>
    )
  })
  return (
    <TableRow>
      <Hidden xsDown={true}>
        <TableCell>
          <Typography
            noWrap={true}
            style={{ maxWidth: 100 }}
            variant='body2'
            color='inherit'
          >
            {action.id}
          </Typography>
        </TableCell>
      </Hidden>
      <TableCell>
        <Link to={accountRoute(url.host, action.account)}>
          {action.account}
        </Link>
      </TableCell>
      <TableCell>
        <Link to={accountRoute(url.host, action.account, action.name)}>
          {action.name}
        </Link>
      </TableCell>
      <Hidden xsDown={true}>
        <TableCell>{authorization}</TableCell>
      </Hidden>
      <Hidden smDown={true}>
        <TableCell>
          <Typography noWrap={true} variant='body2' style={{ maxWidth: 150 }}>
            {JSON.stringify(action.data)}
          </Typography>
        </TableCell>
      </Hidden>
      <TableCell>
        <RicardianDialog url={url} action={action} />
      </TableCell>
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
            <Hidden xsDown={true}>
              <TableCell>Authorization</TableCell>
            </Hidden>
            <Hidden smDown={true}>
              <TableCell>Data</TableCell>
            </Hidden>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    </Paper>
  )
}

export default ActionsTable
