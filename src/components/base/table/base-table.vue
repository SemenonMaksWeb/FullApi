<template>
  <table>
    <thead>
      <tr>
        <BaseTableTh :data-th="data" :key="data.id" v-for="data in typeTable" />
      </tr>
    </thead>
    <tbody>
      <tr v-for="dataset in array">
        <base-table-td
          :dataset="dataset"
          :type-table="typeTable"
          :key="dataset.id"
        />
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { InterfaceMapTable } from '@/composition/table-map/type.ts';
import BaseTableTh from '@/components/base/table/base-table-th.vue';
import BaseTableTd from '@/components/base/table/base-table-td.vue';
export default {
  name: 'base-table',
  components: { BaseTableTd, BaseTableTh },
  props: {
    typeTable: Array as () => PropType<InterfaceMapTable>,
    array: Array,
  },
};
</script>

<style lang="sass"></style>
