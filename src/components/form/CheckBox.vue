<template>
  <div
    :class="` tw-w-full tw-flex tw-items-center tw-justify-between ${inputContainerClassName}`"
  >
    <label
      :for="label"
      v-if="label"
      :class="`tw-text-sm tw-font-avenir-medium ${labelClassName}`"
      >{{ label }}</label
    >

    <input
      :id="label"
      type="checkbox"
      :class="`
      tw-rounded-5  tw-focus:outline-none
      tw-h-6 tw-w-6 tw-text-center tw-bg-white  tw-border tw-border-black-checkbox  checked:tw-bg-primary-500 checked:tw-border-primary tw-appearance-none ${className}`"
      :value="modelValue"
      @input="updateValue"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: unknown;
  label?: string;
  className?: string;
  labelClassName?: string;
  inputContainerClassName?: string;
}

defineProps<Props>();
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

function updateValue(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).checked);
}
</script>

<style></style>
