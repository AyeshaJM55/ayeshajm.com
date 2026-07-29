function matchRoute(pathname, routes) {
  for (const route of routes) {
    if (route.path === pathname) return { params: {}, route }
    if (!route.pattern) continue
    const match = pathname.match(route.pattern)
    if (match) return { params: match.groups ?? {}, route }
  }

  return { params: {}, route: routes.find((route) => route.path === '*') }
}

export default matchRoute
