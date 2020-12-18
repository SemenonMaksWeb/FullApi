import Vuex from 'vuex';
import VacancyPosition from '@/store/vacancy-position/index.ts';
export const store = new Vuex.Store({
  modules: {
    VacancyPosition,
  },
});
