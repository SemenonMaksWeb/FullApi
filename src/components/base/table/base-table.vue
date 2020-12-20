<template>
  <table class="base-table" v-if="array.length !== 0">
    <caption class="base-caption">
      {{
        titleTable
      }}
    </caption>
    <thead>
      <tr>
        <BaseTableTh :data-th="data" :key="data.id" v-for="data in typeTable" />
        <th class="base-table-th">Посмотреть</th>
        <th class="base-table-th">Удалить</th>
        <th class="base-table-th">Изменить</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="dataset in array">
        <base-table-td
          :dataset="dataset"
          :type-table="typeTable"
          :key="dataset.id"
          :delete-dispatch="deleteDispatch"
          :router-link-get-id="routerLinkGetId"
        />
      </tr>
    </tbody>
  </table>
  <div class="base-table-error-undefined-data" v-else>
    Таблица не содержит данные
  </div>
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
    typeTable: { type: Array as () => PropType<InterfaceMapTable> },
    array: { type: Array },
    titleTable: { type: String },
    deleteDispatch: {
      type: String,
    },
    routerLinkGetId: {
      type: String,
    },
  },
};
</script>

<style lang="sass">
@import "src/assets/sass/base/base-table"
</style>
