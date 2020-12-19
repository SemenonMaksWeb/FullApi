import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export function BaseTableTd() {
  const store = useStore();
  const deleteTd =  async (name:string , id:number) => {
    await store.dispatch(name, id);
  }
  return { deleteTd };
}
