<template>
  <template v-if="dataTh.type !== 'object'">
    <th>{{ dataTh.text }}</th>
  </template>
  <template v-else>
    <base-table-tg
      v-for="data in dataTh.object"
      :data-th="data"
      :key="data.id"
    />
  </template>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { InterfaceMapTable } from '@/composition/table-map/type.ts';
export default {
  name: 'base-table-tg',
  props: {
    dataTh: {
      typeTable: Object as () => PropType<InterfaceMapTable>,
    },
  },
};
</script>

<style lang="sass"></style>
