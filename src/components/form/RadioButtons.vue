<template>
  <div>
    <div
      class="tw-relative tw-text-gray-600 tw-my-4 tw-focus-within:text-gray-400"
    >
      <div :class="`tw-grid tw-grid-cols-2  tw-gap-2  ${containerClasses}`">
        <label
          v-for="(option, index) in options"
          :key="index"
          :class="`
            tw-block
            tw-p-5
            tw-relative
          ${modelValue === option ? 'tw-bg-primary-500' : 'tw-bg-white'}
       
            tw-text-center
            tw-rounded-3
            tw-font-medium
            tw-flex
            tw-justify-center
            tw-items-center
            tw-drop-shadow-tertiary
            ${className}
          `"
        >
          <input
            name="q"
            type="radio"
            :class="`tw-hidden`"
            :value="option"
            @input="updateValue"
          />
          <span :class="`${modelValue === option ? 'tw-text-white' : ''}`">{{
            option
          }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

interface Props {
  modelValue: unknown;
  options: unknown[];

  className?: string;
  containerClasses?: string;
}
defineProps<Props>();

function updateValue(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}
</script>

<style scoped></style>
