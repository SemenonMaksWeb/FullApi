<template>
  <container>
    <form>
      <input-validate/>
    </form>
  </container>
</template>

<script lang="ts">
import Container from '@/components/base/container.vue';
import { ViewsVacancyPositionId } from '@/composition/views/vacancy-position-id.ts';

import BaseForm from '@/components/base/view/form.vue';
import _inputValidate from '@/components/base/_input-validate.vue';
export default {
  name: 'vacancy-position',
  components: { BaseForm, Container, _inputValidate },
  setup() {
    return { ...ViewsVacancyPositionId() };
  },
};
</script>

<!--<style lang="sass">-->
<!--</style>-->
