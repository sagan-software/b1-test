import 'normalize.css'
import { createGlobalStyle, ThemeProps, keyframes } from 'styled-components'
import { Theme } from '../store'

export const GlobalStyles = createGlobalStyle<ThemeProps<Theme>>`
body {
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  font-family: "Share Tech Mono", monospace;
}

a {
  color: ${({ theme }) => theme.linkColor};
  text-decoration: none;
}

button {
  border-radius: 3px;
  border: 0;
  background-color: ${({ theme }) => theme.linkColor};
  padding: 10px;
}
`

// Breakpoint
export enum Bp {
  Xs = 'XS',
  Sm = 'SM',
  Md = 'MD',
  Lg = 'LG',
  Xl = 'XL',
}

export function getMinWidth(bp: Bp): number {
  switch (bp) {
  case Bp.Xs:
    return 0
  case Bp.Sm:
    return 576
  case Bp.Md:
    return 768
  case Bp.Lg:
    return 992
  case Bp.Xl:
    return 1200
  }
}

export function minWidth(bp: Bp): string {
  const width = getMinWidth(bp)
  return `(min-width: ${width})`
}
