import { Theme } from './state'

export const lightTheme: Readonly<Theme> = {
  bgColor: '#ffffff',
  textColor: '#333333',
  linkColor: 'red',
}

export const darkTheme: Readonly<Theme> = {
  bgColor: '#333',
  textColor: '#fff',
  linkColor: 'blue',
}

export const defaultTheme: Readonly<Theme> = darkTheme
