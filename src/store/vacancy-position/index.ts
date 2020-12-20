import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import {
  VacancyPositionAxiosGet,
  VacancyPositionAxiosDelete,
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
  DeleteVacancyPosition(index: number) {
    this.VacancyPosition.splice(index, 1);
  }
  @Mutation
  TrueCheck() {
    this.CheckVacancyPosition = true;
  }

  @Action({ commit: 'SetVacancyPosition' })
  async VacancyPositionActionGet() {
    if (!this.CheckVacancyPosition) {
      return await VacancyPositionAxiosGet();
    }
  }
  @Action({})
  async VacancyPositionActionDelete(id: string) {
    const index = this.context.getters['GetVacancyPositionIndex'](id);
    if (index !== -1) {
      // Запись найдена
      const data = await VacancyPositionAxiosDelete(id);
      if (data) {
        // Ошибок с сервера нету
        this.context.commit('DeleteVacancyPosition', index);
      }
    }
  }
  get GetVacancyPosition(): InterfaceVacancyPositionAxios[] {
    return this.VacancyPosition;
  }
  get GetVacancyPositionIndex(): (id: number) => void {
    return (id: number) => {
      return this.VacancyPosition.findIndex(data => data.id === id);
    };
  }
  get GetVacancyPositionFind(): (id: number) => void {
    return (id: number) => {
      return this.VacancyPosition.find(data => data.id == Number(id));
    };
  }
}
