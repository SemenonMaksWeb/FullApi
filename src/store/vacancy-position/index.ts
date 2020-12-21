import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import {
  VacancyPositionAxiosGet,
  VacancyPositionAxiosDelete,
  VacancyPositionAxiosPut,
} from '@/store/vacancy-position/axios.ts';
import { InterfaceVacancyPositionAxios } from '@/store/vacancy-position/state-type.ts';
@Module
export default class VacancyPosition extends VuexModule {
  VacancyPosition: InterfaceVacancyPositionAxios[] = [];
  CheckVacancyPosition = false;

  @Mutation
  SetVacancyPosition(data: any) {
    this.VacancyPosition = data;
  }
  @Mutation
  SetIndexVacancyPosition(data: any) {
    data.data.id = this.VacancyPosition[data.index].id;
    this.VacancyPosition[data.index] = data.data;
  }
  @Mutation
  DeleteVacancyPosition(index: number) {
    this.VacancyPosition.splice(index, 1);
  }
  @Mutation
  TrueCheck() {
    this.CheckVacancyPosition = true;
  }

  @Action({})
  async VacancyPositionActionGet() {
    if (!this.CheckVacancyPosition) {
      const data = await VacancyPositionAxiosGet();
      await this.context.commit('SetVacancyPosition', data);
      this.context.commit('TrueCheck');
    }
  }
  @Action({})
  async VacancyPositionActionDelete(id: string) {
    const index = this.context.getters['GetVacancyPositionIndex'](id);
    // Запись найдена
    const data = await VacancyPositionAxiosDelete(id);
    if (data) {
      // Ошибок с сервера нету
      this.context.commit('DeleteVacancyPosition', index);
    }
  }
  // id: string, data:InterfaceVacancyPositionAxios
  @Action({})
  async VacancyPositionActionPut(data: any) {
    // Запись найдена
    const dataset = await VacancyPositionAxiosPut(data.id, data.data);
    if (dataset) {
      const index = this.context.getters['GetVacancyPositionIndex'](data.id);
      this.context.commit('SetIndexVacancyPosition', {
        index,
        data: data.data,
      });
      // Ошибок с сервера нету
    }
  }

  get GetVacancyPosition(): InterfaceVacancyPositionAxios[] {
    return this.VacancyPosition;
  }
  get GetVacancyPositionIndex(): (id: number) => void {
    return (id: number) => {
      return this.VacancyPosition.findIndex(data => {
        return data.id === Number(id);
      });
    };
  }
  get GetVacancyPositionFind(): (id: number) => void {
    return (id: number) => {
      return this.VacancyPosition.find(data => data.id == Number(id));
    };
  }
  get GetVacancyPositionCheck(): boolean {
    return this.CheckVacancyPosition;
  }
}
