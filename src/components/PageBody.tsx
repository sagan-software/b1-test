import { Grid } from '@material-ui/core'
import React from 'react'

const Component: React.FC = ({ children }) => {
  return (
    <Grid container={true} spacing={2}>
      {children}
    </Grid>
  )
}

export default Component
