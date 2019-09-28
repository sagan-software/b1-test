import { getInfo } from './getInfo'
import { mockFetchJson } from './testUtils'
import { ResultType } from '../coreTypes'

const serverUrl = new URL('https://api.eosnewyork.io')

describe('getInfo', () => {
  it('fetches with the correct URL', async () => {
    const fetch = mockFetchJson({})
    await getInfo(serverUrl)
    expect(fetch).toHaveBeenCalledWith(
      'https://api.eosnewyork.io/v1/chain/get_info',
    )
    expect(fetch).toHaveBeenCalledTimes(1)
    fetch.mockClear()
  })

  it('successfully fetches chain info', async () => {
    const fetch = mockFetchJson({
      server_version: '7c0b0d38',
      chain_id:
        'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      head_block_num: 81781978,
      last_irreversible_block_num: 81781645,
      last_irreversible_block_id:
        '04dfe38d2a13ef06ce5b6d0d1d180b1de38943158591c2a70bbbb9009ba08b1a',
      head_block_id:
        '04dfe4da5fc75bde8daccc4d5ae2853786d6b819be8ea83c553a80d40c83cbca',
      head_block_time: '2019-09-28T18:30:22.000',
      head_block_producer: 'helloeoscnbp',
      virtual_block_cpu_limit: 200000000,
      virtual_block_net_limit: 1048576000,
      block_cpu_limit: 177444,
      block_net_limit: 1046368,
      server_version_string: 'v1.8.4',
      fork_db_head_block_num: 81781978,
      fork_db_head_block_id:
        '04dfe4da5fc75bde8daccc4d5ae2853786d6b819be8ea83c553a80d40c83cbca',
    })
    const result = await getInfo(serverUrl)

    if (result.type !== ResultType.Ok) {
      expect(result.type).toEqual(ResultType.Ok)
    } else {
      const data = result.data
      expect(data.chainId).toEqual(
        'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      )
      expect(data.headBlockNum).toEqual(81781978)
      expect(data.lastIrreversibleBlockNum).toEqual(81781645)
    }
    fetch.mockClear()
  })

  it('allows for requests to be aborted', async () => {
    // TODO
  })

  it('fails if CORS is not allowed', async () => {
    // TODO
  })

  it('fails if a bad status is returned', async () => {
    // TODO
  })

  it('fails if invalid JSON is returned', async () => {
    // TODO
  })

  it('fails if JSON is in an unexpected format', async () => {
    // TODO
  })
})
