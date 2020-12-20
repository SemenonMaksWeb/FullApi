import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export function ViewsVacancyPositionId() {
  const store = useStore();
  const  router = useRouter();
  const id = router.currentRoute.value.params.id;
  const VacancyPosition = computed(() => store.getters['GetVacancyPositionFind'](id));
  const AxiosVacancyPosition = async () => {
    if(VacancyPosition.value === undefined){
      await store.dispatch('VacancyPositionActionGet');
    }
  };
  onMounted(AxiosVacancyPosition);
  return { VacancyPosition };
}
