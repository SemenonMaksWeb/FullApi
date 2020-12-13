<template>
  <the-header />
  <router-view />
</template>

<script>
import TheHeader from '@/components/the-header/the-header';
export default {
  components: { TheHeader },
};
</script>
<style lang="sass">
@import "assets/sass/reset"
@import "assets/sass/fonts/index"
</style>
