import { Store as VuexStore } from 'vuex';

export type StateVacancyPosition = {
  id: number;
  name: string;
  active: boolean;
};
export type StateAll = {
  VacancyPosition: StateVacancyPosition[];
};

export enum MutationTypesName {
  SetVacancyPosition = 'SetVacancyPosition',
}
export type MutationsTypesFunction<S = StateAll> = {
  [MutationTypesName.SetVacancyPosition](
    state: S,
    data: StateVacancyPosition[]
  ): void;
};

export enum ActionTypesName {
  AxiosVacancyPosition = 'AxiosVacancyPosition',
}
export type ActionTypesFunction<S = StateAll> = {
  [ActionTypesName.AxiosVacancyPosition]({
    commit,
  }: AugmentedActionContext): any;
};
export type AugmentedActionContext = {
  commit<K extends keyof MutationsTypesFunction>(
    key: K,
    data: Parameters<MutationsTypesFunction[K]>[1]
  ): ReturnType<MutationsTypesFunction[K]>;
};

export interface VacancyPositionGettersTypes {
  VacancyPosition(state: StateAll): StateVacancyPosition[];
}

export type VacancyPositionStoreModuleTypes<S = StateAll> = Omit<
  VuexStore<S>,
  'commit' | 'getters' | 'dispatch'
> & {
  commit<
    K extends keyof MutationsTypesFunction,
    P extends Parameters<MutationsTypesFunction[K]>[1]
  >(
    key: K,
    payload?: P
  ): ReturnType<MutationsTypesFunction[K]>;
} & {
  dispatch<K extends keyof ActionTypesFunction>(
    key: K,
    payload?: Parameters<ActionTypesFunction[K]>[1]
  ): ReturnType<ActionTypesFunction[K]>;
} & {
  getters: {
    [K in keyof VacancyPositionGettersTypes]: ReturnType<
      VacancyPositionGettersTypes[K]
    >;
  };
};
