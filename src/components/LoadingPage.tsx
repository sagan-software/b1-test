import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2),
    },
  }),
)

const Component: React.FC = ({ children, ...props }) => {
  const classes = useStyles()
  return (
    <div {...props}>
      <CircularProgress className={classes.progress} />
      <div>{children}</div>
    </div>
  )
}

export default Component
