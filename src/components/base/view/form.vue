<template>
  <h1>{{ titleForm }}</h1>
  <form v-if="array !== undefined">
    <div
      class="base-form-wrapper-element"
      v-for="data in typeForm"
      :key="data.id"
    >
      <!--      Текст поле которое нельзя изменять  -->
      <template v-if="data.type === 'text'">
        <label> {{ data.text }} : {{ array.id }} </label>
      </template>
      <!--      input string  -->
      <template v-if="data.type === 'inputString'">
        <label :for="data.id"> {{ data.text }} </label>
        <input :id="data.id" :value="array[data.name]" >
      </template>
      <!--      input checkbox  -->
      <template v-if="data.type === 'checkbox'">
        <label :for="data.id"> {{ data.text }} </label>
        <input type="checkbox" :id="data.id" :checked="array[data.name]" >
      </template>
    </div>
  </form>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { InterfaceMapView } from '@/composition/view-map/type.ts';

export default {
  name: 'base-form',
  props: {
    typeForm: { type: Array as () => PropType<InterfaceMapView> },
    titleForm: { type: String },
    array: { type: Object },
  },
};
</script>

<style lang="sass"></style>
