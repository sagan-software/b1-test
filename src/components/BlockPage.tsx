import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Avatar from '@material-ui/core/Avatar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import JSONTree from 'react-json-tree'
import ActionsTable from './ActionsTable'
import TransactionsTable from './TransactionsTable'
import ErrorPage from './ErrorPage'
import Link from './Link'
import { homeRoute, chainRoute } from './Router'
import * as chainPresets from '../chainPresets'
import * as api from '../api'
import * as store from '../store'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2),
    },
  }),
)

const TabPanel: React.FC<{ index: number; value: number }> = ({
  index,
  value,
  children,
  ...props
}) => {
  return (
    <Grid item={true} xs={12}>
      <Box
        component='div'
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        pt={2}
        {...props}
      >
        {children}
      </Box>
    </Grid>
  )
}

const BlockOk: React.FC<{ url: URL; block: api.Block }> = ({ url, block }) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Grid container={true}>
      <Grid item={true} xs={12}>
        <Paper>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
          >
            <Tab label='Actions' />
            <Tab label='Transactions' />
            <Tab label='Raw' />
          </Tabs>
        </Paper>
      </Grid>
      <TabPanel value={value} index={0}>
        <ActionsTable url={url} actions={api.getActionsInBlock(block)} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TransactionsTable url={url} transactions={block.transactions} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <JSONTree data={block} />
      </TabPanel>
    </Grid>
  )
}

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
  RouteComponentProps<{ hostname: string; blockNum: string }>
> = ({ match }) => {
  const { hostname, blockNum } = match.params
  const classes = useStyles()

  let url: URL | void
  try {
    url = new URL(`https://${hostname}`)
  } catch (_) {}

  let num: api.BlockNum | void
  try {
    const numOrNaN = parseInt(blockNum, 10)
    if (numOrNaN) {
      num = numOrNaN as api.BlockNum
    }
  } catch (_) {}

  const block = store.useSelector(store.getSelectedBlock)
  const isAlreadySelected = block && block.num === num
  const dispatch = store.useDispatch()

  const preset = chainPresets.getByHostname(hostname)
  const chainName = preset ? preset.name : 'Unknown Chain'
  const avatar = preset ? <Avatar src={`/${preset.logo}`} /> : <></>

  useEffect(() => {
    if (url && num && !isAlreadySelected) {
      dispatch(store.createSelectBlock(url, num))
    }
  }, [dispatch, url, num, isAlreadySelected])

  if (!url) {
    return <ErrorPage message={'Invalid Hostname'} />
  }

  if (!num) {
    return <ErrorPage message={'Invalid Block Number'} />
  }

  return (
    <Fade in={true}>
      <Container maxWidth='md'>
        <Grid container={true} justify='center' spacing={4}>
          <Grid item={true}>
            <Box pt={3}>
              <Breadcrumbs>
                <Link to={homeRoute()}>Home</Link>
                <Link to={chainRoute(url.hostname)}>{chainName}</Link>
                <Typography>Block</Typography>
              </Breadcrumbs>
            </Box>
          </Grid>
          <Grid item={true} xs={12}>
            <Grid
              container={true}
              justify='center'
              alignItems='center'
              direction='column'
            >
              <Grid item={true}>
                <Box pb={2}>{avatar}</Box>
              </Grid>
              <Grid item={true}>
                <Typography variant='h5' align='center'>
                  {chainName}
                </Typography>
                <Typography
                  variant='subtitle1'
                  color='textSecondary'
                  align='center'
                >
                  {hostname}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true}>
            {block && block.result ? (
              api.isOk(block.result) ? (
                <BlockOk url={url} block={block.result.data} />
              ) : (
                <BlockErr message='Error fetching block' />
              )
            ) : (
              'Loading'
            )}
          </Grid>
        </Grid>
      </Container>
    </Fade>
  )
}

export default Component
