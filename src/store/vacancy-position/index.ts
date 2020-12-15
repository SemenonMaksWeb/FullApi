import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import axios from 'axios';
import { VacancyPositionAxios } from '@/store/vacancy-position/axios.ts';
import {
  InterfaceVacancyPositionAxios,
} from '@/store/vacancy-position/state-type.ts';
@Module
export default class VacancyPosition extends VuexModule {
  VacancyPosition: InterfaceVacancyPositionAxios[] = [];
  CheckVacancyPosition = false;

  @Mutation
  SetVacancyPosition(data: any) {
    this.VacancyPosition = data;
  }
  @Mutation
  TrueCheck() {
    this.CheckVacancyPosition = true;
  }

  @Action({ commit: 'SetVacancyPosition' })
  async ActionVacancyPosition() {
    if (!this.CheckVacancyPosition) {
      return await VacancyPositionAxios();
    }
  }
  get GetVacancyPosition(): InterfaceVacancyPositionAxios[] {
    return this.VacancyPosition;
  }
}
