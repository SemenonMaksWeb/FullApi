<template>
  <div>
    <label :class="classLabel">{{ TextLabel }}</label>
    <input
      @input="emitValueInput($event.target.value)"
      :value="vuexForm[vuexInput].value"
      :type="typeInput"
      :placeholder="placeholder"
    />
    <div class="block-error_full">
      <template v-for="data in vuexForm[vuexInput].error">
        <div
          class="block-error-text"
          :key="data.id"
          v-if="data.active === true"
        >
          {{ data.text }}
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { FormDataInput } from "@/composition/_plagins/validate/validate-type";
import { ValidateInput } from "@/composition/_plagins/validate/validate-input";
export default {
  name: "input-validate",
  props: {
    placeholder: {
      type: String,
    },
    typeInput: {
      type: String,
      default: "text",
    },
    vuexForm: {
      type: Object as () => PropType<FormData>,
      request: true,
    },
    vuexInput: {
      type: String,
      request: true,
    },
    classLabel: {
      type: String,
    },
    TextLabel: {
      type: String,
    },
  },
  methods: { // Перенести в файл TS
    async emitValueInput(event:any) {
      await this.$emit("valueInput", event);
      ValidateInput(this.vuexForm, this.vuexInput).OnSwitch();
    },
  },
};
</script>

<style lang="sass">
.block-error-text
  color: red
</style>