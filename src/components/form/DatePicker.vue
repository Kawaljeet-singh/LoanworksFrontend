<template>
  <div style="max-width: 300px">
    <label v-if="name" class="tw-text-sm tw-font-avenir-medium">{{
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
      <q-input
        outlined
        class="tw-h-12.5 md:tw-h-15"
        input-class="tw-p-5 tw-h-full tw-rounded-3"
        :model-value="date"
        :placeholder="placeholder"
        :rules="[
          (val) => isValidDateDDMMYYYY(val),
          () => (!v ? true : !v.$error),
        ]"
        @update:model-value="updateValue"
        mask="##/##/####"
        bg-color="white"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                mask="DD/MM/YYYY"
                :model-value="modelValue"
                @update:model-value="updateValue"
                default-view="Years"
                :navigation-max-year-month="maxDate"
                :navigation-min-year-month="minDate"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
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
//  @input:model-value="updateValue($event)"
import isValidDateDDMMYYYY from "@/utils/validations/isValidDateDDMMYYYY";
import { computed } from "@vue/reactivity";
import type { ErrorObject } from "@vuelidate/core";
import { ref, watch, watchEffect } from "vue";
interface Props {
  modelValue: string | number;
  name?: string;
  type?: "number" | "text" | "email" | "date" | string;
  placeholder?: string;
  inputContainerClassName?: string;
  v?: { $error: boolean; $errors: ErrorObject[] };
  allowFutureDate?: boolean;
  allowPastDate?: boolean;
}

const props = defineProps<Props>();

const date = ref(props.modelValue);
watchEffect(() => (date.value = props.modelValue));
const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const maxDate = computed(() => {
  if (props.allowFutureDate) return "";
  return new Date().getFullYear() + "/" + (new Date().getMonth() + 1);
});

const minDate = computed(() => {
  if (props.allowPastDate) return "";
  return new Date().getFullYear() + "/" + (new Date().getMonth() + 1);
});

function updateValue(
  value: string | number,
  reason?: string,
  details?: object
) {
  date.value = value;
  emit("update:modelValue", value);
}
// watch(date, (newValue) => {});
</script>

<style lang="scss" scoped></style>
