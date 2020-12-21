import { FormData } from "@/composition/_plagins/validate/validate-type.ts";
import {InterfaceVacancyPositionAxios} from '@/store/vacancy-position/state-type';
import { ref } from "vue";
const Form: FormData = {
  name: {
    value: "",
    regulations: ["Undefined"],
    error: {
      Undefined: { text: "Вы не указали название должности вакансии", active: false },
    },
  },
  active: {
    value: "",
  },
};

export function setValue(props:any){
  console.log(props);
   if(props.vacancyPosition !== undefined){

     Form.active.value = props.vacancyPosition.active;
     Form.name.value = props.vacancyPosition.name;
   }
}
export const formVacancyPosition = ref(Form);