import { getInfo, getBlock, ChainActionType } from './action'

describe('chain action creators', () => {
  it('can create a GetInfo action', () => {
    expect(getInfo()).toEqual({
      type: ChainActionType.GetInfo,
    })
  })

  it('can create a GotInfo action', () => {
    // TODO
  })

  it('can create a GetBlock action', () => {
    expect(getBlock(1)).toEqual({
      type: ChainActionType.GetBlock,
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
