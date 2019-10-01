import 'normalize.css'
import { createGlobalStyle, ThemeProps } from 'styled-components'
import { Theme } from '../../store'

export const GlobalStyles = createGlobalStyle<ThemeProps<Theme>>`
body {
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  font-family: "Share Tech Mono", monospace;
}

a {
  color: blue;
  text-decoration: none;
}
`
