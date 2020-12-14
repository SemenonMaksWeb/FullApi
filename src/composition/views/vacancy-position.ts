import { computed, onMounted } from 'vue';
import { useStore } from '@/store/index';
import {
  MutationsTypesFunction,
  ActionTypesName,
} from '@/store/module/vacancy_position/type';

export function ViewsVacancyPosition() {
  const store = useStore();
  const VacancyPosition = computed(() => store.getters.VacancyPosition);
  const AxiosVacancyPosition = async () => {
    await store.dispatch(ActionTypesName.AxiosVacancyPosition);
  };
  const ConsoleLog = () => {
    console.log(store);
  };
  onMounted(ConsoleLog);
  onMounted(AxiosVacancyPosition);
  return { VacancyPosition, ConsoleLog };
}
