import { Avatar, Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import * as chainPresets from '../chainPresets'

const Component: React.FC<{
  url: URL;
  preset: chainPresets.ChainPreset | void;
}> = ({ url, preset }) => {
  const chainName = preset ? preset.name : 'Unknown Chain'
  const avatar = preset ? (
    <Avatar src={preset.logo} style={{ width: 60, height: 60 }} />
  ) : (
    <></>
  )

  return (
    <Grid container={true} justify='center' alignItems='center'>
      <Grid item={true}>
        <Box pr={2}>{avatar}</Box>
      </Grid>
      <Grid item={true}>
        <Typography variant='h5'>{chainName}</Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          {url.host}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Component
