<template>
  <div>
    <div
      @click="() => (isOpen = !isOpen)"
      class="tw-bg-white tw-cursor-pointer tw-drop-shadow-tertiary tw-py-4 tw-p-2.5 tw-flex tw-justify-between tw-text-sm"
    >
      <span> {{ person.name }}</span>
      <span class="tw-text-primary tw-font-extrabold tw-font-avenir-medium"
        >${{ total }}
        <font-awesome-icon icon="fa-solid fa-chevron-right" />
      </span>
    </div>
  </div>
  <div v-show="isOpen">
    <div class="tw-bg-white tw-drop-shadow-tertiary tw-mb-5">
      <div
        class="tw-bg-white tw-drop-shadow-sub-shadow tw-px-2.5 tw-py-4 tw-flex tw-justify-between tw-text-sm"
      >
        <span> {{ person.name }}</span>
        <span class="tw-text-primary tw-font-extrabold tw-font-avenir-medium"
          >${{ total }}
          <font-awesome-icon icon="fa-solid fa-chevron-down" />
        </span>
      </div>

      <div v-if="type == 'income'" class="tw-bg-white tw-drop-shadow-tertiary">
        <ul class="tw-text-xs tw-p-3">
          <li class="tw-grid tw-py-4 tw-grid-cols-10 tw-items-center">
            <img
              :src="listArrow"
              alt=""
              class="tw-rotate-90 tw-inline"
              height="12px"
              srcset=""
            />
            <span class="tw-col-span-6 tw-text-primary">
              Employment Income after Tax
            </span>
            <span
              class="tw-col-span-3 tw-text-sm tw-font-medium tw-font-avenir-medium tw-text-primary tw-justify-self-end"
              >$50,000</span
            >
          </li>
          <li class="tw-ml-5 tw-py-4 tw-grid tw-grid-cols-10 tw-items-center">
            <img
              :src="listArrow"
              alt=""
              class="tw-rotate-90 tw-inline tw-mr-2.5"
              height="12px"
              srcset=""
            />
            <span class="tw-col-span-6"> Base Income </span>
            <span
              class="tw-col-span-3 tw-font-medium tw-font-avenir-medium tw-justify-self-end"
              >$10,000</span
            >
          </li>
          <li class="tw-ml-5 tw-py-4 tw-grid tw-grid-cols-10 tw-items-center">
            <img
              :src="listArrow"
              alt=""
              class="tw-rotate-90 tw-inline tw-mr-2.5"
              height="12px"
              srcset=""
            />
            <span class="tw-col-span-6"> Monthly salary </span>
            <span
              class="tw-col-span-3 tw-font-medium tw-font-avenir-medium tw-justify-self-end"
              >$6,000</span
            >
          </li>
        </ul>
        <ThisIsNotRight />
      </div>
    </div>
    <div
      v-for="(detail, key) in details"
      :key="key"
      class="tw-bg-white tw-drop-shadow-tertiary tw-mb-5"
    >
      <ul class="tw-text-xs tw-p-3">
        <li class="tw-grid tw-py-4 tw-grid-cols-10 tw-items-center">
          <img
            :src="listArrow"
            alt=""
            class="tw-rotate-90 tw-inline"
            height="12px"
            srcset=""
          />
          <span :class="`tw-col-span-6  tw-text-primary`">
            {{ detail.categoryNameExternal }}
          </span>
          <span
            :class="`tw-col-span-3 tw-text-sm tw-font-medium tw-font-avenir-medium tw-text-primary tw-justify-self-end`"
            >${{ detail.value }}</span
          >
        </li>
      </ul>
      <ThisIsNotRight />
    </div>
    <!-- <div
      v-for="(detail, key) in person.details"
      :key="key"
      class="tw-bg-white tw-drop-shadow-tertiary tw-mb-5"
    >
      <ul class="tw-text-xs tw-p-3">
        <li
          v-for="(value, name, index) in detail"
          :key="name"
          class="tw-grid tw-py-4 tw-grid-cols-10 tw-items-center"
          :class="index ? 'tw-ml-5 ' : ''"
        >
          <img
            :src="listArrow"
            alt=""
            class="tw-rotate-90 tw-inline"
            height="12px"
            srcset=""
          />
          <span :class="`tw-col-span-6 ${!index ? 'tw-text-primary' : ''}`">
            {{ name }}
          </span>
          <span
            :class="`tw-col-span-3 tw-text-sm tw-font-medium tw-font-avenir-medium ${
              !index ? 'tw-text-primary' : ''
            } tw-justify-self-end`"
            >${{ value }}</span
          >
        </li>
      </ul>
      <ThisIsNotRight />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import type { IllioDataType } from "@/utils/composables/illion/useGetIllionData";
import useGetIllionData from "@/utils/composables/illion/useGetIllionData";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import ThisIsNotRight from "../../components/verify-income-expense/ThisIsNotRight.vue";
import listArrow from "/assets/verify-income-expense/listArrow.svg";

const route = useRoute();
type Props = {
  person: {
    name: string;
    totalIncome?: string;
    details?: unknown[];
  };
  type: "income" | "expenses";
  // income: IllioDataType["borrowerCategorisedFinancials"][0]["income"];
  isOpen?: boolean;
};
const data = useGetIllionData();
const props = withDefaults(defineProps<Props>(), { isOpen: false });

const isOpen = ref<boolean>(props.isOpen);

const details = computed(
  () => data.borrowerCategorisedFinancials[0][props.type]
);
const total = computed(() => {
  // details.value?.reduce((a, i) => a + Number(i.value), 0);
  let sum = 0;
  details.value.forEach((a, i) => (sum += Number(a.value)));
  return sum.toFixed(2);
});
</script>

<style scoped></style>
