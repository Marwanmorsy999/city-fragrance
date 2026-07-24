import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { App } from './App';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

const rootRoute = createRootRoute({
  component: App,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound,
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute, notFoundRoute]),
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}