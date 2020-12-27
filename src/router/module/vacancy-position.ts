export default [
  {
    path: '/vacancy/position',
    name: 'vacancy-position',
    component: () => import('@/views/vacancy-position.vue'),
  },
  {
    path: '/vacancy/position/:id',
    name: 'vacancy-position-id',
    component: () => import('@/views/vacancy-position-id.vue'),
  },
  {
    path: '/vacancy/position/create',
    name: 'vacancy-position-create',
    component: () => import('@/views/vacancy-position-create.vue'),
  },
];
