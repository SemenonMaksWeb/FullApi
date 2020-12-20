<template>
  <container>{{ VacancyPosition }}</container>
</template>

<script lang="ts">
import Container from '@/components/base/container.vue';
import { ViewsVacancyPositionId } from '@/composition/views/vacancy-position-id.ts';
export default {
  name: 'vacancy-position',
  components: { Container },
  setup() {
    return { ...ViewsVacancyPositionId() };
  },
};
</script>

<!--<style lang="sass">-->
<!--</style>-->
