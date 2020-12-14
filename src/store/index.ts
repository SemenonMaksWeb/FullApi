import { createStore, useStore as VuexStore, ModuleTree } from 'vuex';
import { VacancyPositionStoreModuleTypes } from '@/store/module/vacancy_position/type';
import VacancyPosition from '@/store/module/vacancy_position/index';

const modules: ModuleTree<{}> = {
  VacancyPosition,
};

export const store = createStore<{}>({ modules });

type StoreModules = {
  VacancyPosition: VacancyPositionStoreModuleTypes;
};

export type Store = VacancyPositionStoreModuleTypes<
  Pick<StoreModules, 'VacancyPosition'>
>;

export function useStore(): Store {
  return VuexStore() as Store;
}
