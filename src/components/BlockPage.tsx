import {
  Box,
  Grid,
  Hidden,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'
import JSONTree from 'react-json-tree'
import { RouteComponentProps } from 'react-router'
import * as api from '../api'
import * as store from '../store'
import ActionsTable from './ActionsTable'
import ErrorPage from './ErrorPage'
import PageBody from './PageBody'
import PageHeader from './PageHeader'
import PageWrapper from './PageWrapper'
import { BlockTab } from './Router'
import TransactionsTable from './TransactionsTable'

// Displayed when a block has been loaded successfully
const BlockOk: React.FC<{ url: URL; block: api.Block }> = ({ url, block }) => {
  const [tab, setTab] = React.useState(BlockTab.Actions)

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<{}>, newTab: BlockTab) => {
      setTab(newTab)
    },
    [setTab],
  )

  let contents
  switch (tab) {
  case BlockTab.Actions:
    contents = (
        <ActionsTable url={url} actions={api.getActionsInBlock(block)} />
      )
    break
  case BlockTab.Transactions:
    contents = (
        <TransactionsTable url={url} transactions={block.transactions} />
      )
    break
  case BlockTab.Raw:
    contents = <JSONTree data={block} />
    break
  }

  return (
    <>
      <Grid item={true} xs={12}>
        <Paper>
          <Tabs value={tab} onChange={handleChange} variant='fullWidth'>
            <Tab label='Actions' />
            <Tab label='Transactions' />
            <Tab label='Raw' />
          </Tabs>
        </Paper>
      </Grid>
      <Grid item={true} xs={12}>
        {contents}
      </Grid>
    </>
  )
}

// Show an error message when the block failes to load
const BlockErr: React.FC<{ message: string }> = ({ message }) => (
  <>
    <Typography align='center'>
      <ErrorOutlineIcon style={{ fontSize: 150 }} color='error' />
    </Typography>
    <Typography align='center' variant='h6' color='error'>
      {message}
    </Typography>
  </>
)

const Component: React.FC<
  RouteComponentProps<{ host: string; num: string }>
> = ({ match }) => {
  // Try to parse the host
  let url: URL | void
  try {
    url = new URL(`https://${match.params.host}`)
  } catch (_) {
    // Show an error message later
  }

  // Try to parse the block number
  let num: api.BlockNum | void
  try {
    const numOrNaN = parseInt(match.params.num, 10)
    if (numOrNaN) {
      num = numOrNaN as api.BlockNum
    }
  } catch (_) {
    // Show an error message later
  }

  const block = store.useSelector(store.getSelectedBlock)
  const isAlreadySelected = block && block.num === num
  const dispatch = store.useDispatch()

  // Select the block if the URL and number are valid
  React.useEffect(() => {
    if (url && num && !isAlreadySelected) {
      dispatch(store.createSelectBlock(url, num))
    }
  }, [dispatch, url, num, isAlreadySelected])

  // Return early with error messages
  if (!url) {
    return <ErrorPage message={'Invalid Hostname'} />
  }
  if (!num) {
    return <ErrorPage message={'Invalid Block Number'} />
  }

  const content =
    block && block.result ? (
      api.isOk(block.result) ? (
        <BlockOk url={url} block={block.result.data} />
      ) : (
        <BlockErr message='Error fetching block' />
      )
    ) : (
      'Loading'
    )

  const crumb = (
    <>
      Block <Hidden xsDown={true}>{num}</Hidden>
    </>
  )

  const meta =
    block && block.result ? (
      api.isOk(block.result) ? (
        <>
          <Typography variant='body2' color='textSecondary' align='right'>
            Produced by <strong>{block.result.data.producer}</strong>
          </Typography>
          <Typography variant='body2' color='textSecondary' align='right'>
            {block.result.data.timestamp}
          </Typography>
        </>
      ) : (
        <></>
      )
    ) : (
      <>
        <Skeleton />
        <Skeleton />
      </>
    )

  return (
    <PageWrapper>
      <PageHeader url={url} crumb={crumb}>
        <Box p={2}>
          <Typography variant='h4' align='right'>
            Block {num.toLocaleString()}
          </Typography>
          {meta}
        </Box>
      </PageHeader>
      <PageBody>{content}</PageBody>
    </PageWrapper>
  )
}

export default Component
