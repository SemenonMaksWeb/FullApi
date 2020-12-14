<template>
  <aside class="aside-main">
    <the-aside-link v-for="data in links" :key="data.id" :link="data" />
  </aside>
</template>

<script lang="ts">
import { links } from '@/composition/aside/aside-link-list.ts';
import TheAsideLink from '@/components/the-aside/the-aside-link.vue';
export default {
  name: 'the-aside',
  components: { TheAsideLink },
  setup() {
    return { links };
  },
};
</script>

<style lang="sass">
@import "src/assets/sass/the/the-aside"
</style>
