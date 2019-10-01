import { ActionType } from './action'
import { getInfoAction, getBlockAction } from './actionCreators'

describe('chain action creators', () => {
  const url = new URL('https://api.eosnewyork.io')
  it('can create a GetInfo action', () => {
    expect(getInfoAction(url)).toEqual({
      type: ActionType.GetInfo,
    })
  })

  it('can create a GotInfo action', () => {
    // TODO
  })

  it('can create a GetBlock action', () => {
    expect(getBlockAction(url, 1)).toEqual({
      type: ActionType.GetBlock,
      blockNum: 1,
    })
  })

  it('can create a GotBlock action', () => {
    // TODO
  })

  it('can create a GetAbi action', () => {
    // TODO
  })

  it('can create a GotAbi action', () => {
    // TODO
  })

  it('can create a GetTransaction action', () => {
    // TODO
  })

  it('can create a GotTransaction action', () => {
    // TODO
  })
})
