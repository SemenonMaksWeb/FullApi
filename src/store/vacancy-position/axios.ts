import axios from 'axios';
import {
  InterfaceVacancyPositionAxios,
  InterfaceVacancyPositionApi,
} from '@/store/vacancy-position/state-type.ts';

const VacancyPositionMap = (
  data: InterfaceVacancyPositionApi[]
): InterfaceVacancyPositionAxios[] => {
  const dataset: InterfaceVacancyPositionAxios[] = [];
  for (const datasetKey in data) {
    dataset.push({
      id: data[datasetKey].id,
      name: data[datasetKey].name,
      active: data[datasetKey].active,
    });
  }
  return dataset;
};

export async function VacancyPositionAxiosGet() {
  const dataset = await axios.get('http://localhost:3000/vacancy_position');
  if (dataset.data.meta.status === 200) {
    return VacancyPositionMap(dataset.data.data);
  } else {
    return null;
  }
}
export async function VacancyPositionAxiosDelete(id:string) {
  const dataset = await axios.delete(`http://localhost:3000/vacancy_position/${id}`);
  if (dataset.data.meta.status === 200) {
    return true;
  } else {
    return false;
  }
}