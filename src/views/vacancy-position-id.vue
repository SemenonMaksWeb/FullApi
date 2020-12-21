<template>
  <container>
    <form-vacancy-position :vacancy-position="VacancyPosition" />
  </container>
</template>

<script lang="ts">
import Container from '@/components/base/container.vue';
import { ViewsVacancyPositionId } from '@/composition/views/vacancy-position-id.ts';
import FormVacancyPosition from '@/components/form/form-vacancy-position.vue';
export default {
  name: 'vacancy-position',
  components: { FormVacancyPosition, Container },
  setup() {
    return { ...ViewsVacancyPositionId() };
  },
};
</script>

<!--<style lang="sass">-->
<!--</style>-->
