<template>
  <div>{{ VacancyPosition }}</div>
</template>

<script lang="ts">
import { ViewsVacancyPosition } from '@/composition/views/vacancy-position';

export default {
  name: 'vacancy-position',
  setup() {
    return { ...ViewsVacancyPosition() };
  },
};
</script>

<!--<style lang="sass">-->

<!--</style>-->
