<template>
  <div
    :class="`  tw-w-full tw-drop-shadow-tertiary tw-rounded-3 ${containerClassName} `"
  >
    <textarea
      v-model.number="value"
      :class="`tw-outline-none tw-bg-text-area-fill tw-p-1 tw-text-qb-black  tw-text-xs tw-w-full  tw-font-avenir-medium    ${inputClassName} `"
      name="custom-input-number"
      @input="updateValue"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
interface Props {
  inputClassName?: string;
  containerClassName?: string;
}
const props = defineProps<Props>();
const value = ref();
const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

function updateValue(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}
</script>

<style scoped>
input[type="teaxtarea"] {
  word-wrap: break-word;
  width: 95%;
}
</style>
