import { Box, Container, Fade, Grid, Typography } from '@material-ui/core'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import React from 'react'
import RouterLink from './Link'
import { homeRoute } from './Router'

const NotFoundPage: React.FC = () => {
  return (
    <Fade in={true}>
      <Container maxWidth='md'>
        <Grid container={true} justify='center' spacing={4} direction='column'>
          <Grid item={true}>
            <Box pt={6}>
              <Typography variant='h4' align='center'>
                Page Not Found
              </Typography>
            </Box>
          </Grid>
          <Grid item={true}>
            <Typography align='center'>
              <HelpOutlineIcon style={{ fontSize: 250 }} color='disabled' />
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

export default NotFoundPage
