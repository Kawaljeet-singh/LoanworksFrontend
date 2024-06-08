<template>
  <div
    :class="`custom-number-input tw-h-12.5 tw-my-6 tw-w-full tw-drop-shadow-tertiary tw-rounded-3  ${containerClassName} `"
  >
    <div
      :class="[
        `tw-flex tw-flex-row tw-w-full tw-h-12.5 tw-drop-shadow-tertiary  tw-bg-white ${inputContainerClassName}`,
        { hasError: v?.length },
      ]"
    >
      <button
        @click="decrement"
        type="button"
        data-action="decrement"
        :class="`tw-text-qb-black-secondary-2 tw-h-full tw-w-20 tw-cursor-pointer tw-outline-none ${buttonsClassName}`"
      >
        <span class="tw-m-auto tw-text-sm tw-font-thin tw-text-inherit">−</span>
      </button>
      <input
        type="number"
        v-model="value"
        :placeholder="placeholder"
        :class="`tw-outline-none tw-text-qb-black focus:tw-outline-none tw-text-center tw-w-full tw-font-medium tw-font-avenir-medium tw-text-base md:tw-text-basecursor-default tw-flex tw-items-center ${inputClassName} `"
        name="custom-input-number"
      />
      <button
        @click="increment"
        type="button"
        data-action="increment"
        :class="`tw-text-qb-black-secondary-2 tw-h-full tw-w-20 tw-cursor-pointer ${buttonsClassName} `"
      >
        <span class="tw-m-auto tw-text-sm tw-font-light">+</span>
      </button>
    </div>

    <!-- <template v-if="v?.length">
      <span class="tw-text-red-500" v-for="error of v" :key="error.$uid">
        {{ error?.$message }}
      </span>
    </template> -->
  </div>
</template>

<script setup lang="ts">
import type { ErrorObject } from "@vuelidate/core";
import { onMounted, ref, watch } from "vue";
interface Props {
  inputClassName?: string;
  inputContainerClassName?: string;
  containerClassName?: string;
  buttonsClassName?: string;
  isDisabled?: boolean;
  placeholder?: string;
  modelValue: unknown;
  v?: ErrorObject[];
}
const props = defineProps<Props>();
const value = ref<number>();
function decrement() {
  if (value.value > 0) value.value--;
}
watch(
  () => props.modelValue,
  (newVal) => {
    value.value = Number(newVal);
  }
);
onMounted(() => (value.value = Number(props.modelValue)));

function increment() {
  if (isNaN(value.value)) value.value = 0;
  value.value++;
}

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

watch(value, (newVal) => emit("update:modelValue", newVal));
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
</style>
