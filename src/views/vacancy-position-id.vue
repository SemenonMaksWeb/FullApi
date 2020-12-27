<template>
  <container>
    <h1 class="base-form-title">Вакансия должности</h1>
    <form-vacancy-position
      v-if="VacancyPositionCheck"
      :vacancy-position="VacancyPosition"
    />
  </container>
</template>

<script lang="ts">
import Container from '@/components/base/container.vue';
import { ViewsVacancyPositionId } from '@/composition/views/vacancy-position-id.ts';
import FormVacancyPosition from '@/components/form/form-vacancy-position.vue';
export default {
  name: 'vacancy-position-id',
  components: { FormVacancyPosition, Container },
  setup() {
    return { ...ViewsVacancyPositionId() };
  },
};
</script>

<style lang="sass">
@import "src/assets/sass/base/base-form"
</style>
