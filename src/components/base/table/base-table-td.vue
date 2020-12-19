<template>
  <template v-for="data in typeTable">
    <td v-if="data.type !== 'object'" :key="data.id">
      {{ dataset[data.name] }}
    </td>
    <base-table-td v-else :type-table="data" dataset="" :key="data.id" />
  </template>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { InterfaceMapTable } from '@/composition/table-map/type.ts';
export default {
  name: 'base-table-td',
  props: {
    typeTable: {
      type: Array as () => PropType<InterfaceMapTable>,
      request: true,
    },
    dataset: {
      type: Object,
    },
  },
};
</script>

<style lang="sass"></style>
