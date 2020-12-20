<template>
  <container>

  </container>
</template>

<script lang="ts">
import Container from '@/components/base/container.vue';
import { ViewsVacancyPositionId } from '@/composition/views/vacancy-position-id.ts';

import BaseForm from '@/components/base/view/form.vue';
export default {
  name: 'vacancy-position',
  components: { BaseForm, Container },
  setup() {
    return { ...ViewsVacancyPositionId() };
  },
};
</script>

<!--<style lang="sass">-->
<!--</style>-->
