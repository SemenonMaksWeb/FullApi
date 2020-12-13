<template>
  <router-link
    v-if="link.array === undefined"
    active-class="aside-link-active"
    :to="link.to"
    class="aside-link"
  >
    {{ link.text }}
  </router-link>
  <template v-else>
    <div class="aside-link" @click="get = !get">{{ link.text }}</div>
    <div class="wrapper-aside-link" v-if="get">
      <the-aside-link v-for="data in link.array" :link="data" :key="data.id" />
    </div>
  </template>
</template>

<script>
export default {
  name: 'the-aside-link',
  data() {
    return {
      get: false,
    };
  },
  props: {
    link: {
      type: Object,
      request: true,
    },
  },
};
</script>

<style lang="sass"></style>
