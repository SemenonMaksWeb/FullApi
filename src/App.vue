<template>
  <the-header />
  <the-aside />
  <router-view />
</template>

<script>
import TheHeader from '@/components/the-header/the-header';
import TheAside from '@/components/the-aside/the-aside';
export default {
  components: { TheAside, TheHeader },
};
</script>
<style lang="sass">
@import "assets/sass/reset"
@import "assets/sass/fonts/index"
</style>
