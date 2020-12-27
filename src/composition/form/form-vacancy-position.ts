import { FormData } from '@/composition/_plagins/validate/validate-type.ts';
import { InterfaceVacancyPositionAxios } from '@/store/vacancy-position/state-type';
import { ref } from 'vue';
import { store } from '@/store/index.ts';
import router from '@/router/index.ts';

export const ServerApi = async (Form: any) => {
  const name = Form.value.name.value;
  const active = Form.value.active.value;
  const data: InterfaceVacancyPositionAxios = { name, active };
  const id = router.currentRoute.value.params.id;
  if (id === undefined) {
    return await store.dispatch('VacancyPositionActionPost', { data });
  } else {
    return await store.dispatch('VacancyPositionActionPut', { id, data });
  }
  console.log(router.currentRoute.value.params);
};

const Form: FormData = {
  name: {
    value: '',
    regulations: ['Undefined'],
    regulationsServer: { ServerApi: ServerApi },
    error: {
      Undefined: {
        text: 'Вы не указали название должности вакансии',
        active: false,
      },
      ServerApi: {
        text: 'Ошибка сервера',
        active: false,
        type: 'server',
      },
    },
  },
  active: {
    value: '',
    regulations: [],
  },
};

export function setValue(props: any) {
  if (props.vacancyPosition !== undefined) {
    Form.active.value = props.vacancyPosition.active;
    Form.name.value = props.vacancyPosition.name;
  }
}
export const formVacancyPosition = ref(Form);
