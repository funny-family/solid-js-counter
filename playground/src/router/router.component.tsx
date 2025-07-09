import {
  Router as BaseRouter,
  useNavigate,
  type RouteDefinition,
} from '@solidjs/router';
import { lazy } from 'solid-js';

const routes: RouteDefinition[] = [
  {
    path: '/',
    component: () => {
      const navigate = useNavigate();

      navigate('/base');

      return null;
    },
  },
  {
    path: '/base',
    component: lazy(() => import('../routes/base/base.component')),
  },
  {
    path: '/with-limits',
    component: lazy(
      () => import('../routes/with-limits/with-limits.component')
    ),
  },
  {
    path: '/with-base-events',
    component: lazy(
      () => import('../routes/with-base-events/with-base-events.component')
    ),
  },
  {
    path: '/mix',
    component: lazy(() => import('../routes/mix/mix.component')),
  },
  {
    path: '*404',
    component: () => {
      const navigate = useNavigate();

      navigate('/');

      return null;
    },
  },
];

export var Router = () => {
  return (
    <BaseRouter root={lazy(() => import('../routes/root/root.component'))}>
      {routes as any}
    </BaseRouter>
  );
};
