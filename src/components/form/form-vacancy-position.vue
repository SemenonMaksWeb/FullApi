<template>
  <form>
    <input-validate
      :text-label="'Название'"
      :vuex-form="formVacancyPosition"
      vuex-input="name"
      @valueInput="formVacancyPosition.name.value = $event"
    />
    <input-validate
      type-input="checkbox"
      text-label="Видимость"
      :vuex-form="formVacancyPosition"
      vuex-input="active"
      @valueInput="formVacancyPosition.active.value = $event"
    />
    <button @click.prevent="ValidateFull()">Отправить</button><br>
  </form>
</template>

<script lang="ts">
import InputValidate from '@/components/base/_input-validate.vue';
import { PropType } from 'vue';
import { InterfaceVacancyPositionAxios } from '@/store/vacancy-position/state-type.ts';
import {
  formVacancyPosition,
  ValidateFull,
  setValue,
} from '@/composition/form/form-vacancy-position';

export default {
  name: 'form-vacancy-position',
  components: { InputValidate },
  props: {
    vacancyPosition: {
      type: Object as () => PropType<InterfaceVacancyPositionAxios>,
      default: undefined,
    },
  },
  setup(props: any) {
    setValue(props);
    return { formVacancyPosition, ValidateFull };
  },
};
</script>

<style lang="sass"></style>
