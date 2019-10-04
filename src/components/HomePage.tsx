import {
  Avatar,
  Box,
  Container,
  Fade,
  Grid,
  Hidden,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
} from '@material-ui/core'
import React from 'react'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'
import * as chainPresets from '../chainPresets'
import { chainRoute, getRouteString, RouteParams } from './Router'

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
  <ListItemLink to={chainRoute(preset.url.host)}>
    <ListItemAvatar>
      <Avatar src={preset.logo} />
    </ListItemAvatar>
    <ListItemText primary={preset.name} secondary={preset.url.host} />
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
              <Link href='https://github.com/sagan-software/b1-test'>
                Github
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Fade>
  )
}

export default HomePage
