import { ref, computed, onMounted } from 'vue';
import { VuexStore } from '@/store/index';
import {
  MutationsTypesFunction,
  ActionTypesName,
} from '@/store/module/vacancy_position/type';

export function ViewsVacancyPosition() {
  const store = VuexStore();
  const VacancyPosition = computed(() => store.getters.VacancyPosition);
  // const AxiosVacancyPosition = async () => {
  //   await store.dispatch(ActionTypesName.AxiosVacancyPosition);
  // };
  const ConsoleLog = () => {
    console.log(store);
  };
  onMounted(ConsoleLog);
  // onMounted(AxiosVacancyPosition);
  return { VacancyPosition , ConsoleLog};
}
