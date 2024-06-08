<template>
  <div>
    <label :for="name" v-if="name" class="tw-text-sm tw-font-avenir-medium">{{
      name
    }}</label>
    <div class="row">
      <q-select
        outlined
        class="tw-relative tw-w-full tw-text-gray-600 qb-shadow-secondary tw-focus-within:text-gray-400 tw-mt-1.5"
        bg-color="white"
        :model-value="modelValue"
        @update:model-value="updateValue"
        use-input
        emit-value
        :loading="isLoading"
        :placeholder="!modelValue ? placeholder : ''"
        input-class="tw-w-full"
        :options="options"
        option-value="suggestion"
        option-label="suggestion"
        dropdown-icon=""
        @filter="filterFn"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>

        <template v-slot:append>
          <q-icon name="search" class="cursor-pointer" />
        </template>
      </q-select>
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
import axiosInstance from "@/utils/axiosInstance";
import type { ErrorObject } from "@vuelidate/core";
import { ref } from "vue";

interface Props {
  modelValue: unknown;
  v?: { $error: boolean; $errors: ErrorObject[] };
  name?: string;
  placeholder?: string;
  className?: string;
  inputContainerClassName?: string;
}
const props = defineProps<Props>();
const isLoading = ref<boolean>(false);
const value = ref();
const options = ref();
const controller = ref(null);

const search = async (keyword: string) => {
  if (controller.value) {
    controller.value.abort();
    isLoading.value = false;
  }
  isLoading.value = true;
  controller.value = new AbortController();
  const res = await axiosInstance.get("/application/properties", {
    signal: controller.value.signal,
    params: {
      suggest: keyword,
    },
  });

  console.log(res.data);
  return res.data?.suggestions;
};

const filterFn = (val: string, update: (callback: () => void) => void) => {
  if (val.length < 3) {
    // update(() => {
    //   options.value = [];
    // });
    return;
  }

  update(async () => {
    options.value = await search(val);
    isLoading.value = false;
  });
};

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

function updateValue(e: string) {
  console.log("round", e);

  emit("update:modelValue", e);
}
</script>

<style scoped>
.hasError {
  @apply tw-border-red-400 tw-border-2 tw-text-red-500 tw-mb-1;
}
</style>
