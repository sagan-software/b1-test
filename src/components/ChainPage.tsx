import React, { useEffect, useCallback } from 'react'
import { RouteComponentProps } from 'react-router'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import PauseIcon from '@material-ui/icons/Pause'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import BlocksTable from './BlocksTable'
import ErrorPage from './ErrorPage'
import Link from './Link'
import { homeRoute, chainRoute } from './Router'
import * as api from '../api'
import * as chainPresets from '../chainPresets'
import * as store from '../store'

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
    >
      {text}
    </Button>
  )
}

const Table: React.FC<{ url: URL }> = ({ url }) => {
  const state = store.useSelector(store.getChainState)

  if (state) {
    if (api.isOk(state)) {
      return <BlocksTable url={url} blocks={state.data.latestBlocks} />
    } else {
      return <>Error</>
    }
  } else {
    return <>Loading</>
  }
}

const Component: React.FC<RouteComponentProps<{ hostname: string }>> = ({
  match,
}) => {
  const hostname = match.params.hostname
  const dispatch = store.useDispatch()
  const preset = chainPresets.getByHostname(hostname)
  const chainName = preset ? preset.name : 'Unknown Chain'
  const avatar = preset ? <Avatar src={`/${preset.logo}`} /> : <></>

  let url: URL | void
  try {
    url = new URL(`https://${hostname}`)
  } catch (_) {
    // Ignore for now, show error message later
  }

  useEffect(() => {
    if (url) {
      dispatch(store.createPlayBlocks(url))
    }
    return () => {
      dispatch(store.createPauseBlocks())
    }
  }, [dispatch, url])

  if (!url) {
    return <ErrorPage message={'Invalid Hostname'} />
  }

  return (
    <Fade in={true}>
      <Container maxWidth='md'>
        <Grid container={true} justify='center' spacing={4}>
          <Grid item={true}>
            <Box pt={3}>
              <Breadcrumbs>
                <Link to={homeRoute()}>Home</Link>
                <Link to={chainRoute(url.host)}>{chainName}</Link>
                <Typography>Live</Typography>
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
          <Grid item={true} xs={12}>
            <Box pb={2}>
              <Typography align='center'>
                <AutoplayButton url={url} />
              </Typography>
            </Box>
            <Table url={url} />
          </Grid>
        </Grid>
      </Container>
    </Fade>
  )
}

export default Component
