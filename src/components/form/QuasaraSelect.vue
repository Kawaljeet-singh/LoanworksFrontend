<template>
  <div>
    <label :for="name" v-if="name" class="tw-text-sm tw-font-avenir-medium">{{
      name
    }}</label>
    <div class="">
      <q-select
        outlined
        class="tw-relative tw-w-full tw-text-gray-600 qb-shadow-secondary tw-focus-within:text-gray-400 tw-mt-1.5"
        bg-color="white"
        :model-value="modelValue"
        @update:model-value="updateValue"
        :use-input="disableSearch ? false : true"
        :emit-value="emitValue"
        :disable="isDisabled"
        :placeholder="!modelValue ? placeholder : ''"
        input-class="tw-w-full"
        :options="options"
        :option-value="optionValue"
        :option-label="optionLabel"
        :dropdown-icon="dropDownIcon"
        @filter="filterFn"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>

        <template v-if="!hideIcon" v-slot:append>
          <q-icon name="search" class="cursor-pointer" />
        </template>
      </q-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
interface Props {
  modelValue?: unknown;
  name?: string;
  placeholder?: string;
  hideIcon?: boolean;
  className?: string;
  dropDownIcon?: string;
  inputContainerClassName?: string;
  optionValue?: string;
  optionLabel?: string;
  options: string[] | unknown[];
  isDisabled?: boolean;
  emitValue?: boolean;
  disableSearch?: boolean;
}
const props = defineProps<Props>();

const value = ref();
const options = ref(props.options);
const filterFn = (val: string, update: (callback: () => void) => void) => {
  if (val === "") {
    update(() => {
      options.value = props.options;

      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();

    options.value = props.options.filter(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};

const emit = defineEmits<{
  (e: "update:modelValue", value: string | unknown): void;
}>();

function updateValue(e: string) {
  emit("update:modelValue", e);
}
</script>

<style scoped></style>
