export interface Theme {
  readonly bgColor: string
  readonly textColor: string
  readonly linkColor: string
}

export const lightTheme: Theme = {
  bgColor: '#ffffff',
  textColor: '#333333',
  linkColor: 'red',
}

export const darkTheme: Theme = {
  bgColor: '#333',
  textColor: '#fff',
  linkColor: 'blue',
}
