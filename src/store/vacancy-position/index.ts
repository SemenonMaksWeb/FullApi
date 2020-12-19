import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { VacancyPositionAxiosGet, VacancyPositionAxiosDelete } from '@/store/vacancy-position/axios.ts';
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
  DeleteVacancyPosition(id: number) {
    // this.VacancyPosition = data;
  }
  @Mutation
  FilterId(id:number):number {
    return this.VacancyPosition.findIndex(data => data.id === id);
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
  async VacancyPositionActionDelete(id:string){
    const  data =  await VacancyPositionAxiosDelete(id);
    if(data){
      const index = this.context.commit("FilterId", id);
      console.log(index);
      this.context.commit("DeleteVacancyPosition", index)
    }
  }
  get GetVacancyPosition(): InterfaceVacancyPositionAxios[] {
    return this.VacancyPosition;
  }
}
