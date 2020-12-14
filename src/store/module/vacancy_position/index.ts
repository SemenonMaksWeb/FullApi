import { MutationTree, GetterTree, ActionTree } from 'vuex';
import {
  StateAll,
  MutationsTypesFunction,
  MutationTypesName,
  StateVacancyPosition,
  ActionTypesName,
  ActionTypesFunction,
  VacancyPositionGettersTypes,
} from '@/store/module/vacancy_position/type';
export const state: StateAll = {
  VacancyPosition: [{
    id:1,
    name:"das",
    active: true
  }],
};
export const mutations: MutationTree<StateAll> & MutationsTypesFunction = {
  [MutationTypesName.SetVacancyPosition](
    state: StateAll,
    data: StateVacancyPosition[]
  ) {
    state.VacancyPosition = data;
  },
};

export const actions: ActionTree<StateAll, {}> & ActionTypesFunction = {
  [ActionTypesName.AxiosVacancyPosition]({ commit }) {
    console.log('Заппрс на сервер');
    let data = [{ id: 1, name: 'dasd', active: true }];
    commit(MutationTypesName.SetVacancyPosition, data);
  },
};

export const getters: GetterTree<StateAll, {}> & VacancyPositionGettersTypes = {
  VacancyPosition: (state: StateAll) => {
    return state.VacancyPosition;
  },
};
