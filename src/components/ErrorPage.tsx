import { Box, Container, Fade, Grid, Typography } from '@material-ui/core'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import React from 'react'
import RouterLink from './Link'
import { homeRoute } from './Router'

const Component: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Fade in={true}>
      <Container maxWidth='md'>
        <Grid container={true} justify='center' spacing={4} direction='column'>
          <Grid item={true}>
            <Box pt={6}>
              <Typography variant='h4' align='center' color='error'>
                {message}
              </Typography>
            </Box>
          </Grid>
          <Grid item={true}>
            <Typography align='center'>
              <ErrorOutlineIcon style={{ fontSize: 250 }} color='error' />
            </Typography>
          </Grid>
          <Grid item={true}>
            <Typography align='center'>
              <RouterLink to={homeRoute()}>Back to the home page</RouterLink>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Fade>
  )
}

export default Component
