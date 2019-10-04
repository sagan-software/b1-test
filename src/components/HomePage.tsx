import React from 'react'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListSubheader from '@material-ui/core/ListSubheader'
import Avatar from '@material-ui/core/Avatar'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import Hidden from '@material-ui/core/Hidden'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'
import * as chainPresets from '../chainPresets'
import { RouteParams, getRouteString, chainRoute } from './Router'

const ListItemLink: React.FC<{ to: RouteParams }> = ({
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
    <ListItem component={renderLink} button={true} {...props}>
      {children}
    </ListItem>
  )
}

const ChainPreset: React.FC<{ preset: chainPresets.ChainPreset }> = ({
  preset,
}) => (
  <ListItemLink to={chainRoute(preset.url.hostname)}>
    <ListItemAvatar>
      <Avatar src={`/${preset.logo}`} />
    </ListItemAvatar>
    <ListItemText primary={preset.name} secondary={preset.url.hostname} />
  </ListItemLink>
)

const ChainPresets: React.FC<{
  header: string;
  presets: chainPresets.ChainPreset[];
}> = ({ header, presets }) => {
  const children = presets.map((preset: chainPresets.ChainPreset) => (
    <ChainPreset key={preset.id} preset={preset} />
  ))
  return (
    <Paper>
      <List subheader={<ListSubheader component='div'>{header}</ListSubheader>}>
        {children}
      </List>
    </Paper>
  )
}

const HomePage: React.FC = () => {
  return (
    <Fade in={true}>
      <Container maxWidth='md'>
        <Grid container={true} justify='center' spacing={4}>
          <Grid item={true} xs={12}>
            <Box pt={6}>
              <Typography variant='h4' align='center'>
                Select a<Hidden xsDown={true}>n EOSIO</Hidden>{' '}
                <Hidden smDown={true}>block</Hidden>chain
              </Typography>
            </Box>
          </Grid>
          <Grid item={true} xs={12} sm={6}>
            <ChainPresets header='Mainnets' presets={chainPresets.mainnets} />
          </Grid>
          <Grid item={true} xs={12} sm={6}>
            <ChainPresets header='Testnets' presets={chainPresets.testnets} />
          </Grid>
          <Grid item={true} xs={12}>
            <Typography color='textSecondary' align='center'>
              View the source code on{' '}
              <Link href='https://github.com/liamcurry/b1-test'>Github</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Fade>
  )
}

export default HomePage
