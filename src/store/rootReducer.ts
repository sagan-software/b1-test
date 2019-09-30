import { combineReducers, Reducer } from 'redux'
import { RootAction } from './rootAction'
import { RootState } from './rootState'
import { chainReducer } from './chain/reducer'
import { inputReducer } from './input/reducer'
import { themeReducer } from './theme/reducer'

export const rootReducer: Reducer<RootState, RootAction> = combineReducers({
  chain: chainReducer,
  input: inputReducer,
  theme: themeReducer,
})
