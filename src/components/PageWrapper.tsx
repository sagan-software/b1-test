import { Container, Fade } from '@material-ui/core'
import React from 'react'

const Component: React.FC = ({ children }) => {
  return (
    <Fade in={true}>
      <Container maxWidth='md'>{children}</Container>
    </Fade>
  )
}

export default Component
