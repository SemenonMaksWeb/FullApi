import { FormData } from '@/composition/_plagins/validate/validate-type.ts';
import { InterfaceVacancyPositionAxios } from '@/store/vacancy-position/state-type';
import { ref, onMounted } from 'vue';
import { store } from '@/store/index.ts';
import router from '@/router/index.ts';
import { ValidateForm } from '@/composition/_plagins/validate/validate-form.ts';
export const ServerApi = async (Form: any) => {
  const name = Form.name.value;
  const active = Form.active.value;
  const data: InterfaceVacancyPositionAxios = { name, active };
  const id = router.currentRoute.value.params.id;
  if (id === undefined) {
    return await store.dispatch('VacancyPositionActionPost', { data });
  } else {
    return await store.dispatch('VacancyPositionActionPut', { id, data });
  }
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
    value: true,
    regulations: [],
  },
};


export function setValue(props: any) {
  if (props.vacancyPosition !== undefined) {
    Form.active.value = props.vacancyPosition.active;
    Form.name.value = props.vacancyPosition.name;
  }else {
    Form.active.value = true;
    Form.name.value = "";
  }
  Form.name.error.Undefined.active = false;
  Form.name.error.ServerApi.active = false;
  // Form.name.error.Undefined.active = false;
}

export const formVacancyPosition = ref(Form);

export async function ValidateFull() {
  const check = await ValidateForm(formVacancyPosition).AllCheck();
}
