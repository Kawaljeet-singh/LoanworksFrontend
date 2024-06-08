<template>
  <div class="tw-mb-5">
    <label :for="name" v-if="name" class="tw-text-sm tw-font-avenir-medium">{{
      name
    }}</label>
    <div
      :class="[
        `tw-relative tw-text-gray-600 qb-shadow-secondary   tw-focus-within:text-gray-400 ${
          name ? 'tw-mt-1.5 ' : ''
        }  ${inputContainerClassName}`,
        { hasError: v?.$error },
      ]"
    >
      <span
        v-if="icon"
        class="tw-absolute tw-pointer-events-none tw-inset-y-0 tw-left-0 tw-flex tw-items-center tw-p-2 disabled:tw-cursor-not-allowed tw-h-full tw-bg-[#eae6e6] tw-text-center"
      >
        <span
          class="tw-p-1 tw-pointer-events-none tw-focus:outline-none tw-focus:shadow-outline"
        >
          <font-awesome-icon :icon="`fa-solid ${icon}`" />
        </span>
      </span>
      <input
        :id="name"
        :type="type"
        :min="min"
        :max="max"
        :disabled="disabled"
        name="q"
        :class="`tw-p-2 ${icon ? 'tw-pl-10' : ''} tw-text-sm tw-rounded-3
      tw-focus:outline-none tw-outline-none tw-focus:bg-white 
      tw-focus:text-gray-900 tw-h-12.5 md:tw-h-15 tw-w-full tw-text-center  ${className}`"
        :placeholder="placeholder"
        :autocomplete="'off'"
        :value="modelValue"
        @input="updateValue"
        @keypress="`${type === 'number' && isNumber($event)}`"
      />
    </div>
    <template v-if="v?.$error">
      <span
        class="tw-text-red-500"
        v-for="error of v.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ErrorObject } from "@vuelidate/core";

interface Props {
  modelValue: unknown;
  name?: string;
  disabled?: boolean;
  type?: "number" | "text" | "email" | "date" | string;
  icon?: string;
  placeholder?: string;
  autocomplete?: "on" | "off";
  className?: string;
  inputContainerClassName?: string;
  min?: number;
  max?: number;
  keypress?: unknown;
  v?: { $error: boolean; $errors: ErrorObject[] };
}

defineProps<Props>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

function updateValue(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}

function isNumber(evt: KeyboardEvent): void {
  const keysAllowed: string[] = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
  ];
  const keyPressed: string = evt.key;

  if (!keysAllowed.includes(keyPressed)) {
    evt.preventDefault();
  }
}
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.hasError {
  @apply tw-border-red-400 tw-border-2 tw-text-red-500 tw-mb-1;
}
input:disabled {
  opacity: 100 !important;
  @apply tw-bg-white;
}
</style>
