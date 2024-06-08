<template>
  <div>
    <label :for="name" v-if="name" class="tw-text-sm tw-font-avenir-medium">{{
      name
    }}</label>
    <div
      :class="`tw-relative tw-text-gray-600 qb-shadow-secondary   tw-focus-within:text-gray-400 ${
        name ? 'tw-mt-1.5 ' : ''
      } tw-mb-5 ${inputContainerClassName}`"
    >
      <select
        :name="name"
        id="pet-select"
        :class="` tw-p-2 
      tw-text-sm  tw-rounded-3  tw-focus:outline-none tw-outline-none
      tw-focus:text-gray-900 tw-h-12.5 focus:tw-border-none  md:tw-h-15 tw-w-full tw-text-left   ${className}`"
        :value="modelValue"
        @input="updateValue"
      >
        <option :class="`tw-appearance-none`" value="">
          {{ placeholder }}
        </option>
        <template v-for="(option, index) in options" :key="index">
          <option
            v-if="typeof option == 'string'"
            :class="`tw-p-10 
      tw-text-sm  tw-rounded-3  tw-focus:outline-none tw-outline-none
      tw-focus:bg-white tw-focus:text-gray-900 tw-h-12.5 md:tw-h-15 tw-w-full   ${className}`"
            :value="option"
          >
            {{ option }}
          </option>
          <option
            v-else
            :class="`tw-p-10 
      tw-text-sm  tw-rounded-3  tw-focus:outline-none tw-outline-none
      tw-focus:bg-white tw-focus:text-gray-900 tw-h-12.5 md:tw-h-15 tw-w-full  ${className}`"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </template>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OPTION } from "@/types/global";
interface Props {
  modelValue: unknown;
  name?: string;
  placeholder?: string;

  className?: string;
  inputContainerClassName?: string;
  options: OPTION[] | string[];
}

defineProps<Props>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

function updateValue(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
