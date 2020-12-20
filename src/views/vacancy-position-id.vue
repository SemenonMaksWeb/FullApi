<template>
  <container>
    <base-form
      :type-form="VacancyPositionMapTable"
      :array="VacancyPosition"
      :title-form="'Должность Вакансии'"
    />
  </container>
</template>

<script lang="ts">
import Container from '@/components/base/container.vue';
import { ViewsVacancyPositionId } from '@/composition/views/vacancy-position-id.ts';
import { VacancyPositionMapTable } from '@/composition/view-map/vacancy-position';
import BaseForm from '@/components/base/view/form.vue';
export default {
  name: 'vacancy-position',
  components: { BaseForm, Container },
  setup() {
    return { ...ViewsVacancyPositionId(), VacancyPositionMapTable };
  },
};
</script>

<!--<style lang="sass">-->
<!--</style>-->
