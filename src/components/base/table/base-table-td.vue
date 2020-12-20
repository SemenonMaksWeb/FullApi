<template>
  <template v-for="data in typeTable">
    <!--  Это не объект  -->
    <td class="base-table-td" v-if="data.type !== 'object'" :key="data.id">
      <!--  Это строка  -->
      <template v-if="data.type === 'string'">
        {{ dataset[data.name] }}
      </template>
      <!--  Это булево-значение  -->
      <template v-else-if="data.type === 'bool'">
        <span v-if="dataset[data.name] === false" class="base-table-checkBox" />
        <font-awesome v-if="dataset[data.name] === true" unicode="&#xf14a;" />
      </template>
    </td>
    <!--  Это объект  -->
    <base-table-td
      v-else-if="data.type === 'object'"
      :type-table="data"
      :key="data.id"
    />
  </template>
  <!-- Это знак Посмотреть -->
  <td class="base-table-td">
    <router-link :to="'/' + routerLinkGetId + '/' + dataset.id">
      <font-awesome class="base-table-link" unicode="&#xf06e;" />
    </router-link>
  </td>
  <!-- Это знак Удалить -->
  <td class="base-table-td">
    <font-awesome
      @click="deleteTd(deleteDispatch, dataset.id)"
      class="base-table-link"
      unicode="&#xf057;"
    />
  </td>
  <!-- Это знак Изменить -->
  <td class="base-table-td">
    <font-awesome class="base-table-link" unicode="&#xf044;" />
  </td>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { InterfaceMapTable } from '@/composition/table-map/type.ts';
import { BaseTableTd } from '@/composition/_plagins/base-table/base-table-td';
import FontAwesome from '@/components/base/font-awesome.vue';
export default {
  name: 'base-table-td',
  components: { FontAwesome },
  props: {
    typeTable: {
      type: Array as () => PropType<InterfaceMapTable>,
      request: true,
    },
    dataset: {
      type: Object,
    },
    deleteDispatch: {
      type: String,
    },
    routerLinkGetId: {
      type: String,
    },
  },
  setup() {
    return { ...BaseTableTd() };
  },
};
</script>
