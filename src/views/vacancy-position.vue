<template>
  <container>
    <div>{{ VacancyPosition }}</div>
  </container>
</template>

<script lang="ts">
import { ViewsVacancyPosition } from '@/composition/views/vacancy-position';
import Container from '@/components/base/container.vue';

export default {
  name: 'vacancy-position',
  components: { Container },
  setup() {
    return { ...ViewsVacancyPosition() };
  },
};
</script>

<!--<style lang="sass">-->

<!--</style>-->
