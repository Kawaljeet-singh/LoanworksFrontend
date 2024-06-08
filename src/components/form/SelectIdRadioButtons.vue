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
            
            ${
              !option.disabled && modelValue === option.value
                ? 'tw-bg-primary-500'
                : 'tw-bg-white'
            }
            ${
              option.disabled
                ? 'tw-pointer-events-none tw-bg-[#9ffde1] tw-text-[rgba(65, 64, 64, 0.23)]'
                : ''
            }
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
          <CheckedCircle v-if="option.disabled" class="tw-mr-2" />
          <input
            :disabled="!!option.disabled"
            name="q"
            type="radio"
            :class="`tw-hidden`"
            :value="option.value"
            @input="updateValue"
          />
          <span
            :class="`${modelValue === option.value ? 'tw-text-white' : ''}  ${
              option.disabled ? 'tw-text-opacity-25' : ''
            }`"
            >{{ option.value }}</span
          >
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckedCircle from "@/assets/Icons/CheckedCircle.vue";
const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

interface Props {
  modelValue: unknown;
  options: { value: string; disabled?: boolean | number }[];

  className?: string;
  containerClasses?: string;
}
defineProps<Props>();
function updateValue(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}
</script>

<style scoped></style>
