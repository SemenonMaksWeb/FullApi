import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export function ViewsVacancyPositionId() {
  const store = useStore();
  const router = useRouter();
  const id = router.currentRoute.value.params.id;
  const AxiosVacancyPosition = async () => {
    await store.dispatch('VacancyPositionActionGet');
  };
  onMounted(AxiosVacancyPosition);
  const VacancyPosition = computed(() =>
    store.getters['GetVacancyPositionFind'](id)
  );
  return { VacancyPosition };
}
