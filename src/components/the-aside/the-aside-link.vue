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
    <div class="aside-link" @click="toggleClick">{{ link.text }}</div>
    <div class="wrapper-aside-link" v-if="toggle">
      <the-aside-link v-for="data in link.array" :link="data" :key="data.id" />
    </div>
  </template>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { InterfaceLink } from '@/composition/aside/aside-link-list.ts';
import { ToggleClick } from '@/composition/toggle/toggle-click.ts';
export default {
  name: 'the-aside-link',
  props: {
    link: {
      type: Object as () => PropType<InterfaceLink>,
      request: true,
    },
  },
  setup() {
    return { ...ToggleClick() };
  },
};
</script>

<!--<style lang="sass"></style>-->
