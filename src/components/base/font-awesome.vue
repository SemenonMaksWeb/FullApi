<template>
  <div class="fontawesome">{{ unicode }}</div>
</template>

<script>
export default {
  name: 'font-awesome',
  props: {
    unicode: {
      type: String,
      request: true,
    },
  },
};
</script>

<style lang="sass">
@import "src/assets/sass/base/fontawesome.sass"
</style>
