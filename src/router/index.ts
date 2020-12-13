import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import homeViews from '@/router/module/home';

const routes: Array<RouteRecordRaw> = [...homeViews];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
