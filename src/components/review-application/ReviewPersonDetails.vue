<template>
  <div class="tw-bg-white tw-p-4.5 tw-drop-shadow-tertiary tw-rounded-3">
    <h2 class="tw-mb-4.5">{{ customerName }}</h2>

    <div
      class="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-3.5 md:tw-gap-10 md:tw-mb-2"
    >
      <div class="tw-col-span-2 md:tw-col-span-1">
        <p class="tw-mb-0 tw-text-10px">Current Address</p>
        <span class="tw-text-primary tw-font-avenir-medium">
          {{ currentAddress }}</span
        >
      </div>
      <div>
        <p class="tw-mb-0 tw-text-10px">Mobile</p>
        <span class="tw-text-primary tw-font-avenir-medium">{{
          customerDetail.mobileNumber
        }}</span>
      </div>
      <div>
        <p class="tw-mb-0 tw-text-10px">Email</p>
        <span class="tw-text-primary tw-break-all tw-font-avenir-medium">{{
          customerDetail.email
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useGetCitizenship from "@/utils/composables/API/citizenship-details/useGetCitizenship";
import { computed } from "vue";

interface Props {
  customerDetail: {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    isFirstPerson: 0 | 1;
  };
}

const props = defineProps<Props>();

const { data } = useGetCitizenship({
  isFirstPerson: props.customerDetail.isFirstPerson,
});
const customerName = computed(
  () => props.customerDetail.firstName + " " + props.customerDetail.lastName
);
const currentAddress = computed(() =>
  data?.value?.length
    ? data?.value[0].currentAddress
    : "24 Address Road, Suburb, State, 2111"
);
</script>

<style scoped></style>
