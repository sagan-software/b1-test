import React from 'react'
import {
  Route as RouteInner,
  RouteComponentProps as RouteInnerComponentProps,
  Link as LinkInner,
} from 'react-router-dom'
import { BlockNum } from '../api'

export type RouteParams =
  | HomeRouteParams
  | ChainRouteParams
  | BlockRouteParams
  | SettingsRouteParams

export enum RouteType {
  Home = 'HOME',
  Chain = 'CHAIN',
  Block = 'BLOCK',
  Settings = 'SETTINGS',
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

export interface SettingsRouteParams {
  readonly type: RouteType.Settings
}

export const settingsRoute = (): SettingsRouteParams => ({
  type: RouteType.Settings,
})

export function getRouteTemplate(routeType: RouteType): string {
  switch (routeType) {
  case RouteType.Home:
    return '/'
  case RouteType.Chain:
    return '/:hostname'
  case RouteType.Block:
    return '/:hostname/:blockNum'
  case RouteType.Settings:
    return '/settings'
  }
}

export function getRouteString(route: RouteParams): string {
  switch (route.type) {
  case RouteType.Home:
    return '/'
  case RouteType.Chain:
    return `/${route.hostname}`
  case RouteType.Block:
    return `/${route.hostname}/${route.blockNum}`
  case RouteType.Settings:
    return '/settings'
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
