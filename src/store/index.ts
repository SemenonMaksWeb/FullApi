import { createStore, useStore } from 'vuex';
import { VacancyPositionStoreModuleTypes } from '@/store/module/vacancy_position/type';

export default createStore({});

type StoreModules = {
  VacancyPosition: VacancyPositionStoreModuleTypes;
};

export type Store = VacancyPositionStoreModuleTypes<
  Pick<StoreModules, 'VacancyPosition'>
>;

export function VuexStore(): Store {
  return useStore() as Store;
}
