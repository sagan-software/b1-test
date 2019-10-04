import * as api from '../api'
import {
  blockRoute,
  chainRoute,
  getRouteString,
  getRouteTemplate,
  homeRoute,
  RouteType,
} from './Router'

describe('Router', () => {
  it('generates the expected home route template', () => {
    expect(getRouteTemplate(RouteType.Home)).toEqual('/')
  })

  it('generates the expected chain route template', () => {
    expect(getRouteTemplate(RouteType.Chain)).toEqual('/:host')
  })

  it('generates the expected block route template', () => {
    expect(getRouteTemplate(RouteType.Block)).toEqual('/:host/block/:num')
  })

  it('generates home route params', () => {
    expect(homeRoute()).toEqual({
      type: RouteType.Home,
    })
  })

  it('generates chain route params', () => {
    expect(chainRoute('api.eosnewyork.io')).toEqual({
      type: RouteType.Chain,
      host: 'api.eosnewyork.io',
    })
  })

  it('generates block route params', () => {
    expect(blockRoute('api.eosnewyork.io', 1 as api.BlockNum)).toEqual({
      type: RouteType.Block,
      host: 'api.eosnewyork.io',
      num: 1,
    })
  })

  it('generates the expected home route string', () => {
    expect(getRouteString(homeRoute())).toEqual('/')
  })

  it('generates the expected chain route string', () => {
    expect(getRouteString(chainRoute('api.eosnewyork.io'))).toEqual(
      '/api.eosnewyork.io',
    )
  })

  it('generates the expected block route string', () => {
    expect(
      getRouteString(blockRoute('api.eosnewyork.io', 1 as api.BlockNum)),
    ).toEqual('/api.eosnewyork.io/block/1')
  })
})
