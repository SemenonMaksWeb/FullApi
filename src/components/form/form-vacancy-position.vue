<template>
  <form>
    {{ formVacancyPosition }}
      {{vacancyPosition}}
    <!--    <input-validate text-label="Название" />-->
  </form>
</template>

<script lang="ts">
import InputValidate from '@/components/base/_input-validate.vue';
import { PropType } from 'vue';
import { InterfaceVacancyPositionAxios } from '@/store/vacancy-position/state-type.ts';
import {
  formVacancyPosition,
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
  setup(props) {
    console.log(props);
    return { ...setValue(props), formVacancyPosition };
  },
};
</script>

<style lang="sass"></style>
