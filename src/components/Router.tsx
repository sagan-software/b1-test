import React from 'react'
import { Link as LinkInner } from 'react-router-dom'
import { BlockNum, AccountName, ActionName } from '../api'

export type RouteParams =
  | HomeRouteParams
  | ChainRouteParams
  | BlockRouteParams
  | RicardianRouteParams

export enum RouteType {
  Home = 'HOME',
  Chain = 'CHAIN',
  Block = 'BLOCK',
  Ricardian = 'RICARDIAN',
}

export interface HomeRouteParams {
  readonly type: RouteType.Home
}

export const homeRoute = (): HomeRouteParams => ({ type: RouteType.Home })

export interface ChainRouteParams {
  readonly type: RouteType.Chain
  readonly hostname: string
}

export const chainRoute = (hostname: string): ChainRouteParams => ({
  type: RouteType.Chain,
  hostname,
})

export interface BlockRouteParams {
  readonly type: RouteType.Block
  readonly hostname: string
  readonly blockNum: Readonly<BlockNum>
}

export const blockRoute = (
  hostname: string,
  blockNum: Readonly<BlockNum>,
): BlockRouteParams => ({
  type: RouteType.Block,
  hostname,
  blockNum,
})

export interface RicardianRouteParams {
  readonly type: RouteType.Ricardian
  readonly hostname: string
  readonly account: string
  readonly action?: string | void
}

export const ricardianRoute = (
  hostname: string,
  account: AccountName,
  action?: ActionName | void,
): RicardianRouteParams => ({
  type: RouteType.Ricardian,
  hostname,
  account,
  action,
})

export function getRouteTemplate(routeType: RouteType): string {
  switch (routeType) {
  case RouteType.Home:
    return '/'
  case RouteType.Chain:
    return '/:hostname'
  case RouteType.Block:
    return '/:hostname/block/:blockNum'
  case RouteType.Ricardian:
    return '/:hostname/account/:account'
  }
}

export function getRouteString(route: RouteParams): string {
  switch (route.type) {
  case RouteType.Home:
    return '/'
  case RouteType.Chain:
    return `/${route.hostname}`
  case RouteType.Block:
    return `/${route.hostname}/block/${route.blockNum}`
  case RouteType.Ricardian:
    const hash = route.action ? `#${route.action}` : ''
    return `/${route.hostname}/account/${route.account}${hash}`
  }
}

export { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export const Link: React.FC<{
  readonly to: Readonly<RouteParams>;
  readonly className?: string;
}> = ({ to, children, ...props }) => (
  <LinkInner to={getRouteString(to)} {...props}>
    {children}
  </LinkInner>
)
