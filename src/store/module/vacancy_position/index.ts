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
const state: StateAll = {
  VacancyPosition: [],
};
const mutations: MutationTree<StateAll> & MutationsTypesFunction = {
  [MutationTypesName.SetVacancyPosition](
    state: StateAll,
    data: StateVacancyPosition[]
  ) {
    state.VacancyPosition = data;
  },
};

const actions: ActionTree<StateAll, {}> & ActionTypesFunction = {
  [ActionTypesName.AxiosVacancyPosition]({ commit }) {
    console.log('Запрос на сервер');
    const data = [{ id: 1, name: 'dasd', active: true }];
    commit(MutationTypesName.SetVacancyPosition, data);
  },
};

const getters: GetterTree<StateAll, {}> & VacancyPositionGettersTypes = {
  VacancyPosition: (state: StateAll) => {
    return state.VacancyPosition;
  },
};
export default { mutations, getters, actions, state };
