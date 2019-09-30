import React from 'react'
import { state } from '../../store'

export const ChainErr: React.FC<{
  error: state.ChainError;
}> = () => {
  return <>ChainErr</>
}
