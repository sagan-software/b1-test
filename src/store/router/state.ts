import { RouterState } from 'connected-react-router'

export type Router = RouterState

export type Route = HomeRoute | ChainRoute | BlockRoute | SettingsRoute

export enum RouteType {
  Home = 'HOME',
  Chain = 'CHAIN',
  Block = 'BLOCK',
  Settings = 'SETTINGS',
}

export interface HomeRoute {
  readonly type: RouteType.Home
}

export const home = (): HomeRoute => ({ type: RouteType.Home })

export interface ChainRoute {
  readonly type: RouteType.Chain
  readonly chainIdPrefix: string
}

export const chain = (chainIdPrefix: string): ChainRoute => ({
  type: RouteType.Chain,
  chainIdPrefix,
})

export interface BlockRoute {
  readonly type: RouteType.Block
  readonly chainIdPrefix: string
  readonly blockNum: number
}

export const block = (chainIdPrefix: string, blockNum: number): BlockRoute => ({
  type: RouteType.Block,
  chainIdPrefix,
  blockNum,
})

export interface SettingsRoute {
  readonly type: RouteType.Settings
}

export const settings = (): SettingsRoute => ({ type: RouteType.Settings })

export function getRouteTemplate(routeType: RouteType): string {
  switch (routeType) {
  case RouteType.Home:
    return '/'
  case RouteType.Chain:
    return '/:chainIdPrefix/'
  case RouteType.Block:
    return '/:chainIdPrefix/:blockNum/'
  case RouteType.Settings:
    return '/settings'
  }
}

export function getRouteString(route: Route): string {
  switch (route.type) {
  case RouteType.Home:
    return '/'
  case RouteType.Chain:
    return `/${route.chainIdPrefix}/`
  case RouteType.Block:
    return `/${route.chainIdPrefix}/${route.blockNum}/`
  case RouteType.Settings:
    return '/settings'
  }
}
