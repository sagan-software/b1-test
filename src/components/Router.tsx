import React from 'react'
import { Link as LinkInner } from 'react-router-dom'
import * as api from '../api'

export { HashRouter as Router, Route, Switch } from 'react-router-dom'

export type RouteParams =
  | HomeRouteParams
  | ChainRouteParams
  | BlockRouteParams
  | AccountRouteParams
  | TransactionRouteParams

export enum RouteType {
  Home = 'HOME',
  Chain = 'CHAIN',
  Block = 'BLOCK',
  Account = 'ACCOUNT',
  Transaction = 'TRANSACTION',
}

export interface HomeRouteParams {
  readonly type: RouteType.Home
}

export const homeRoute = (): HomeRouteParams => ({ type: RouteType.Home })

export interface ChainRouteParams {
  readonly type: RouteType.Chain
  readonly host: string
  readonly tab: ChainTab | void
}

export enum ChainTab {
  Blocks = 0,
  Actions = 1,
  Transactions = 2,
}

export const chainRoute = (host: string, tab?: ChainTab): ChainRouteParams => ({
  type: RouteType.Chain,
  host,
  tab,
})

export interface BlockRouteParams {
  readonly type: RouteType.Block
  readonly host: string
  readonly num: api.BlockNum
  readonly tab: BlockTab | void
}

export enum BlockTab {
  Actions = 0,
  Transactions = 1,
  Raw = 2,
}

export const blockRoute = (
  host: string,
  num: api.BlockNum,
  tab?: BlockTab,
): BlockRouteParams => ({
  type: RouteType.Block,
  host,
  num,
  tab,
})

export interface AccountRouteParams {
  readonly type: RouteType.Account
  readonly host: string
  readonly account: string
  readonly action?: string | void
}

export const accountRoute = (
  host: string,
  account: api.AccountName,
  action?: api.ActionName | void,
): AccountRouteParams => ({
  type: RouteType.Account,
  host,
  account,
  action,
})

export interface TransactionRouteParams {
  readonly type: RouteType.Transaction
  readonly host: string
  readonly id: api.TransactionId
}

export const transactionRoute = (
  host: string,
  id: api.TransactionId,
): TransactionRouteParams => ({
  type: RouteType.Transaction,
  host,
  id,
})

export function getRouteTemplate(routeType: RouteType): string {
  switch (routeType) {
  case RouteType.Home:
    return '/'
  case RouteType.Chain:
    return '/:host'
  case RouteType.Block:
    return '/:host/block/:num'
  case RouteType.Account:
    return '/:host/account/:account'
  case RouteType.Transaction:
    return '/:host/transaction/:id'
  }
}

export function getRouteString(route: RouteParams): string {
  switch (route.type) {
  case RouteType.Home:
    return '/'
  case RouteType.Chain:
    return `/${route.host}`
  case RouteType.Block:
    return `/${route.host}/block/${route.num}`
  case RouteType.Account:
    const hash = route.action ? `#${route.action}` : ''
    return `/${route.host}/account/${route.account}${hash}`
  case RouteType.Transaction:
    return `/${route.host}/transaction/${route.id}`
  }
}

export function toHashId(str: string): string {
  return str.toLowerCase().replace(/[\W\s]+/g, '-')
}

export const Link: React.FC<{
  readonly to: Readonly<RouteParams>;
  readonly className?: string;
}> = ({ to, children, ...props }) => (
  <LinkInner to={getRouteString(to)} {...props}>
    {children}
  </LinkInner>
)
