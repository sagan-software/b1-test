import React from 'react'
import { Link as LinkInner } from 'react-router-dom'
import { BlockNum, AccountName, ActionName } from '../api'

export type RouteParams =
  | HomeRouteParams
  | ChainRouteParams
  | BlockRouteParams
  | AccountRouteParams

export enum RouteType {
  Home = 'HOME',
  Chain = 'CHAIN',
  Block = 'BLOCK',
  Account = 'ACCOUNT',
}

export interface HomeRouteParams {
  readonly type: RouteType.Home
}

export const homeRoute = (): HomeRouteParams => ({ type: RouteType.Home })

export interface ChainRouteParams {
  readonly type: RouteType.Chain
  readonly hostname: string
  readonly tab: ChainTab | void
}

export enum ChainTab {
  Blocks = 'BLOCKS',
  Actions = 'ACTIONS',
  Transactions = 'TRANSACTIONS',
}

export const chainRoute = (
  hostname: string,
  tab?: ChainTab,
): ChainRouteParams => ({
  type: RouteType.Chain,
  hostname,
  tab,
})

export interface BlockRouteParams {
  readonly type: RouteType.Block
  readonly hostname: string
  readonly blockNum: BlockNum
  readonly tab: BlockTab | void
}

export enum BlockTab {
  Actions = 'ACTIONS',
  Transactions = 'TRANSACTIONS',
  Raw = 'RAW',
}

export const blockRoute = (
  hostname: string,
  blockNum: BlockNum,
  tab?: BlockTab,
): BlockRouteParams => ({
  type: RouteType.Block,
  hostname,
  blockNum,
  tab,
})

export interface AccountRouteParams {
  readonly type: RouteType.Account
  readonly hostname: string
  readonly account: string
  readonly action?: string | void
}

export const accountRoute = (
  hostname: string,
  account: AccountName,
  action?: ActionName | void,
): AccountRouteParams => ({
  type: RouteType.Account,
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
  case RouteType.Account:
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
  case RouteType.Account:
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
