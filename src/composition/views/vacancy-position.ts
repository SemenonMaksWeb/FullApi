import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export function ViewsVacancyPosition() {
  const store = useStore();
  const VacancyPosition = computed(() => store.getters['GetVacancyPosition']);
  const AxiosVacancyPosition = async () => {
    await store.dispatch('VacancyPositionActionGet');
  };
  onMounted(AxiosVacancyPosition);
  return { VacancyPosition };
}
