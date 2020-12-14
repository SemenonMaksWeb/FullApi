import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import homeViews from '@/router/module/home';
import vacancyPositionViews from '@/router/module/vacancy-position';
const routes: Array<RouteRecordRaw> = [...homeViews, ...vacancyPositionViews];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
