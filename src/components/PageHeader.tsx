import { Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import * as chainPresets from '../chainPresets'
import ChainHeader from './ChainHeader'
import Link from './Link'
import { chainRoute, homeRoute } from './Router'

const Component: React.FC<{
  url: URL;
  crumb: React.ReactNode;
}> = ({ url, crumb, children }) => {
  const preset = chainPresets.getByHostname(url.host)
  const chainName = preset ? preset.name : 'Unknown Chain'
  return (
    <Grid container={true} spacing={2}>
      <Grid item={true}>
        <Box pt={2}>
          <Breadcrumbs>
            <Link to={homeRoute()}>Home</Link>
            <Link to={chainRoute(url.host)}>{chainName}</Link>
            <Typography>{crumb}</Typography>
          </Breadcrumbs>
        </Box>
      </Grid>
      <Grid
        item={true}
        xs={12}
        container={true}
        justify='space-between'
        alignItems='center'
      >
        <Grid item={true}>
          <ChainHeader url={url} preset={preset} />
        </Grid>
        <Grid item={true}>{children}</Grid>
      </Grid>
    </Grid>
  )
}

export default Component
