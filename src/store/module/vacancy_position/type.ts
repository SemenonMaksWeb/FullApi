export type InterfaceVacancyPosition = {
  id: number;
  name: string;
  active: boolean;
};
export type InterfaceState = {
  VacancyPosition: InterfaceVacancyPosition[];
};

export enum MutationTypesName {
  SetVacancyPosition = 'SetVacancyPosition',
}
export type MutationsTypesFunction<S = InterfaceState> = {
  [MutationTypesName.SetVacancyPosition](
    state: S,
    data: InterfaceVacancyPosition[]
  ): void;
};

export enum ActionTypesName {
  AxiosVacancyPosition = 'AxiosVacancyPosition',
}
export type ActionTypesFunction<S = InterfaceState> = {
  [ActionTypesName.AxiosVacancyPosition]({
    commit,
  }: AugmentedActionContext): void;
};
export type AugmentedActionContext = {
  commit<K extends keyof MutationsTypesFunction>(
    key: K,
    data: Parameters<MutationsTypesFunction[K]>[1]
  ): ReturnType<MutationsTypesFunction[K]>;
};
