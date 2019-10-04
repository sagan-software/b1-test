import {
  Box,
  Chip,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React from 'react'
import Markdown from 'react-markdown'
import { RouteComponentProps } from 'react-router'
import * as api from '../api'
import * as store from '../store'
import ErrorPage from './ErrorPage'
import PageBody from './PageBody'
import PageHeader from './PageHeader'
import PageWrapper from './PageWrapper'
import { toHashId } from './Router'

// A ricardian contract tied to an action or a ricardian clause
const Ricardian: React.FC<{
  label: string;
  title: string;
  body?: string | void;
  color: 'primary' | 'secondary';
  hash: string;
}> = ({ label, title, body, color, hash }) => {
  const details = body ? (
    <Typography component='div'>
      <Markdown source={body} escapeHtml={true} />
    </Typography>
  ) : (
    <Box py={2} style={{ width: '100%' }}>
      <Typography variant='body2' align='center' color='textSecondary'>
        No ricardian contract
      </Typography>
    </Box>
  )
  const id = toHashId(title)
  return (
    <ExpansionPanel defaultExpanded={hash === '#' + id} id={id}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${id}-content`}
        id={`${id}-header`}
      >
        <Box pr={1}>
          <Chip size='small' label={label} color={color} />
        </Box>
        <Typography>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{details}</ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

const AbiAction: React.FC<{ action: api.AbiAction; hash: string }> = ({
  action,
  hash,
}) => (
  <Ricardian
    label='Action'
    title={action.name}
    body={action.ricardian_contract}
    color='primary'
    hash={hash}
  />
)

const AbiActions: React.FC<{ actions: api.AbiAction[]; hash: string }> = ({
  actions,
  hash,
}) => {
  const children = actions.map((action) => (
    <AbiAction key={action.name} action={action} hash={hash} />
  ))
  return <>{children}</>
}

const RicardianClause: React.FC<{
  clause: api.RicardianClause;
  hash: string;
}> = ({ clause, hash }) => (
  <Ricardian
    label='Clause'
    title={clause.id}
    body={clause.body}
    color='secondary'
    hash={hash}
  />
)

const RicardianClauses: React.FC<{
  clauses: api.RicardianClause[];
  hash: string;
}> = ({ clauses, hash }) => {
  const children = clauses.map((clause) => (
    <RicardianClause key={clause.id} clause={clause} hash={hash} />
  ))
  return <>{children}</>
}

const Account: React.FC<{ hash: string }> = ({ hash }) => {
  const account = store.useSelector(store.getSelectedAccount)
  if (!account || !account.abi) {
    return <>Loading</>
  } else if (api.isOk(account.abi)) {
    const data = account.abi.data
    if (data.abi) {
      return (
        <Grid container={true} item={true} direction='column' xs={12}>
          <AbiActions actions={data.abi.actions} hash={hash} />
          <RicardianClauses clauses={data.abi.ricardian_clauses} hash={hash} />
        </Grid>
      )
    } else {
      return (
        <Grid item={true} xs={12}>
          <Paper>
            <Box p={10}>
              <Typography variant='body2' color='textSecondary' align='center'>
                Not a contract. Basic account information could be placed here.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      )
    }
  } else {
    return <>Error</>
  }
}

const Component: React.FC<
  RouteComponentProps<{ host: string; account: api.AccountName }>
> = ({ match, location }) => {
  let url: URL | void
  try {
    url = new URL(`https://${match.params.host}`)
  } catch (_) {
    // Ignore for now, show error message later
  }

  const dispatch = store.useDispatch()
  React.useEffect(() => {
    if (url) {
      dispatch(store.createSelectAccount(url, match.params.account))
    }
  }, [dispatch, url, match.params.account])

  if (!url) {
    return <ErrorPage message={'Invalid Hostname'} />
  }

  return (
    <PageWrapper>
      <PageHeader url={url} crumb={match.params.account}>
        <Box p={1}>
          <Typography variant='h3' align='right'>
            {match.params.account}
          </Typography>
        </Box>
      </PageHeader>
      <PageBody>
        <Account hash={location.hash} />
      </PageBody>
    </PageWrapper>
  )
}

export default Component
