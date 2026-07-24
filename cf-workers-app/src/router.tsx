import { createRouter } from '@tanstack/react-router';
import { route } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router-devtools';
import { App } from './App';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

const rootRoute = route({
  id: '__root__',
  component: App,
});

const indexRoute = route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const notFoundRoute = route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound,
});

export const router = createRouter({
  routes: [rootRoute, indexRoute, notFoundRoute],
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
