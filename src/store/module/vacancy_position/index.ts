import { MutationTree } from 'vuex';
import { ActionTree } from 'vuex';
import {
  InterfaceState,
  MutationsTypesFunction,
  MutationTypesName,
  InterfaceVacancyPosition,
  ActionTypesName,
  ActionTypesFunction,
} from '@/store/module/vacancy_position/type';
export const state: InterfaceState = {
  VacancyPosition: [],
};
export const mutations: MutationTree<InterfaceState> &
  MutationsTypesFunction = {
  [MutationTypesName.SetVacancyPosition](
    state: InterfaceState,
    data: InterfaceVacancyPosition[]
  ) {
    state.VacancyPosition = data;
  },
};
export const actions: ActionTree<InterfaceState, {}> & ActionTypesFunction = {
  [ActionTypesName.AxiosVacancyPosition]({ commit }) {
    console.log('Заппрс на сервер');
    let data = [{ id: 1, name: 'dasd', active: true }];
    commit(MutationTypesName.SetVacancyPosition, data);
  },
};
