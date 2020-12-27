<template>
  <container>
    <h1 class="base-form-title">Создания вакансия должности</h1>
    <form-vacancy-position />
  </container>
</template>

<script lang="ts">
import Container from '@/components/base/container.vue';
import FormVacancyPosition from '@/components/form/form-vacancy-position.vue';
export default {
  name: 'vacancy-position-create',
  components: { FormVacancyPosition, Container },
};
</script>

<style lang="sass">
@import "src/assets/sass/base/base-form"
</style>
