<template>
  <container>
    <base-table
      :array="VacancyPosition"
      :type-table="VacancyPositionMapTable"
      :title-table="'Должности вакансии'"
      :delete-dispatch="'VacancyPositionActionDelete'"
      :router-link-get-id="'vacancy/position'"
    />
    <router-link class="base-router-create" to="/vacancy/position/create">
      Создать новый
    </router-link>
  </container>
</template>

<script lang="ts">
import { ViewsVacancyPosition,  } from '@/composition/views/vacancy-position';
import { VacancyPositionMapTable } from '@/composition/table-map/vacancy-position.ts';
import Container from '@/components/base/container.vue';
import BaseTable from '@/components/base/table/base-table.vue';

export default {
  name: 'vacancy-position',
  components: { Container, BaseTable },
  setup() {
    return { ...ViewsVacancyPosition(), VacancyPositionMapTable };
  },
};
</script>

<style lang="sass">
.base-router-create
  text-decoration: none
  color: #555
  +fz(18px)
  +mt(20px)
  +d-display(block)
  &:hover
    color: #333
</style>
