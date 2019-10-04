import {
  Box,
  Button,
  Grid,
  Hidden,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core'
import PauseIcon from '@material-ui/icons/Pause'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import React, { useCallback, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import * as api from '../api'
import * as store from '../store'
import ActionsTable from './ActionsTable'
import BlocksTable from './BlocksTable'
import ErrorPage from './ErrorPage'
import PageBody from './PageBody'
import PageHeader from './PageHeader'
import PageWrapper from './PageWrapper'
import { ChainTab } from './Router'
import TransactionsTable from './TransactionsTable'

// The button that starts/stops auto-playing blocks
const AutoplayButton: React.FC<{ url: URL }> = ({ url }) => {
  const dispatch = store.useDispatch()
  const isPlaying = store.useSelector(store.getIsPlaying)
  const onClick = useCallback(() => {
    if (isPlaying) {
      dispatch(store.createPauseBlocks())
    } else {
      dispatch(store.createPlayBlocks(url))
    }
  }, [dispatch, url, isPlaying])
  const icon = isPlaying ? <PauseIcon /> : <PlayArrowIcon />
  const text = isPlaying ? 'Pause' : 'Play'
  return (
    <Button
      variant='contained'
      endIcon={icon}
      onClick={onClick}
      color='primary'
      size='large'
    >
      {text}
    </Button>
  )
}

// Max number of rows on actions/transactions tabs
const maxNonBlockRows = 20

// Gets desired # of transactions and returns early
function getTransactions(chain: store.ChainState): api.Transaction[] {
  let transactions: api.Transaction[] = []
  for (let i = 0, l = chain.latestBlocks.length; i < l; i++) {
    const block = chain.latestBlocks[i]
    if (block && block.result && api.isOk(block.result)) {
      const budget = maxNonBlockRows - transactions.length
      transactions = transactions.concat(
        block.result.data.transactions.slice(0, budget),
      )

      if (transactions.length >= maxNonBlockRows) {
        break
      }
    }
  }
  return transactions
}

// Gets desired # of actions and returns early
function getActions(chain: store.ChainState): api.ActionWithTransactionId[] {
  let actions: api.ActionWithTransactionId[] = []
  for (let i = 0, l = chain.latestBlocks.length; i < l; i++) {
    const block = chain.latestBlocks[i]
    if (block && block.result && api.isOk(block.result)) {
      const data = block.result.data
      for (let x = 0, y = data.transactions.length; x < y; x++) {
        const transaction = data.transactions[x]
        const budget = maxNonBlockRows - actions.length
        actions = actions.concat(
          api.getActionsInTransaction(transaction).slice(0, budget),
        )

        if (actions.length >= maxNonBlockRows) {
          break
        }
      }
    }
  }
  return actions
}

const Table: React.FC<{ url: URL; tab?: ChainTab }> = ({ url, tab }) => {
  const state = store.useSelector(store.getChainState)

  if (state) {
    if (api.isOk(state)) {
      switch (tab) {
      case ChainTab.Transactions:
        const transactions = getTransactions(state.data)
        return <TransactionsTable url={url} transactions={transactions} />
      case ChainTab.Actions:
        const actions = getActions(state.data)
        return <ActionsTable url={url} actions={actions} />
      case ChainTab.Blocks:
      default:
        return <BlocksTable url={url} blocks={state.data.latestBlocks} />
      }
    } else {
      return (
        <Grid item={true} xs={12}>
          <Paper>
            <Box p={10}>
              <Typography variant='body2' color='error' align='center'>
                Error fetching chain info
              </Typography>
            </Box>
          </Paper>
        </Grid>
      )
    }
  } else {
    return <>Loading</>
  }
}

const Contents: React.FC<{ url: URL }> = ({ url }) => {
  const [tab, setTab] = React.useState(ChainTab.Blocks)
  const handleChange = useCallback(
    (event: React.ChangeEvent<{}>, newTab: ChainTab) => {
      setTab(newTab)
    },
    [setTab],
  )
  return (
    <>
      <Grid item={true} xs={12}>
        <Paper>
          <Tabs value={tab} onChange={handleChange} variant='fullWidth'>
            <Tab label='Blocks' />
            <Tab label='Actions' />
            <Tab label='Transactions' />
          </Tabs>
        </Paper>
      </Grid>
      <Grid item={true} xs={12}>
        <Table url={url} tab={tab} />
      </Grid>
    </>
  )
}

const Component: React.FC<RouteComponentProps<{ host: string }>> = ({
  match,
}) => {
  // Try to parse the URL
  let url: URL | void
  try {
    url = new URL(`https://${match.params.host}`)
  } catch (_) {
    // Ignore for now, show error message later
  }

  // Start auto-playing blocks
  const dispatch = store.useDispatch()
  useEffect(() => {
    if (url) {
      dispatch(store.createPlayBlocks(url))
    }
    return () => {
      dispatch(store.createPauseBlocks())
    }
  }, [dispatch, url])

  // Return early with errors
  if (!url) {
    return <ErrorPage message={'Invalid Host'} />
  }

  const crumb = (
    <>
      Live <Hidden xsDown={true}>Transactions</Hidden>
    </>
  )

  return (
    <PageWrapper>
      <PageHeader url={url} crumb={crumb}>
        <AutoplayButton url={url} />
      </PageHeader>
      <PageBody>
        <Contents url={url} />
      </PageBody>
    </PageWrapper>
  )
}

export default Component
