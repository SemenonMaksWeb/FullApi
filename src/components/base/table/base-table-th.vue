<template>
  <template v-if="dataTh.type !== 'object'">
    <th class="base-table-th">{{ dataTh.text }}</th>
  </template>
  <template v-else>
    <base-table-th
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
  name: 'base-table-th',
  props: {
    dataTh: {
      typeTable: Object as () => PropType<InterfaceMapTable>,
    },
  },
};
</script>

<style lang="sass"></style>
