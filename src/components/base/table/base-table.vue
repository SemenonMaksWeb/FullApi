<template>
  <table>
    <thead>
      <tr>
        <BaseTableTg :data-th="data" :key="data.id" v-for="data in typeTable" />
      </tr>
    </thead>
    <tbody>
      <!--    <tr></tr>-->
    </tbody>
  </table>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { InterfaceMapTable } from '@/composition/table-map/type.ts';
import BaseTableTg from '@/components/base/table/base-table-th.vue';
export default {
  name: 'base-table',
  components: { BaseTableTg },
  props: {
    typeTable: Array as () => PropType<InterfaceMapTable>,
    array: Array,
  },
};
</script>

<style lang="sass"></style>
