import { Box, CircularProgress, Fade, Grid } from '@material-ui/core'
import React from 'react'

const Component: React.FC = () => {
  return (
    <Fade in={true} timeout={300}>
      <Grid container={true} justify='center' alignItems='center'>
        <Box py={15}>
          <CircularProgress
            style={{ width: 200, height: 200 }}
            color='secondary'
          />
        </Box>
      </Grid>
    </Fade>
  )
}

export default Component
