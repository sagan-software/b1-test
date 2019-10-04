import { Typography } from '@material-ui/core'
import MarkdownIt from 'markdown-it'
import Mustache from 'mustache'
import React from 'react'

const md = new MarkdownIt()

const Component: React.FC<{ text: string; data?: any }> = ({ text, data }) => {
  const rendered = Mustache.render(md.render(text), data)
  return (
    <Typography
      component='div'
      dangerouslySetInnerHTML={{ __html: rendered }}
    />
  )
}

export default Component
