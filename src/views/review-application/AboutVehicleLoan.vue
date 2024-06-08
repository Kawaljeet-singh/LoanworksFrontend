<template>
  <div class="tw-bg-primary-200 tw-w-full tw-p-4 qb-shadow">
    <div class="tw-grid tw-grid-cols-2 tw-gap-1">
      <h1 class="tw-leading-3 tw-mt-3.5">Product Name</h1>

      <div class="tw-flex tw-justify-end">
        <img class="" :src="carLogo" alt="carLogo" />
      </div>
    </div>
    <div class="flex tw-flex-col tw-gap-5 md:-tw-mt-8">
      <div class="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-5">
        <div v-for="(el, index) in row1" :key="index">
          <span>{{ el.label }}</span>
          <h5 class="tw-text-primary-500 tw-font-bold">{{ el.value }}</h5>
        </div>
      </div>
      <div class="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-5">
        <div v-for="(el, index) in details" :key="index">
          <span>{{ el.label }}</span>
          <h5 class="tw-text-primary-500 tw-font-bold">{{ el.value }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import carLogo from "/assets/verify-income-expense/carLoan.svg";
const row1 = [
  {
    label: "Loan Amount:",
    value: "$50,000",
  },
  {
    label: "Loan Term",
    value: "10 Years",
  },
];

const details = [
  {
    label: "Interest Rate",
    value: "3.9% p.a.",
  },
  {
    label: "Comparison Rate",
    value: "3.75% p.a.",
  },
  {
    label: "Estimated Monthly Repayment",
    value: "$1,200",
  },
];
</script>

<style scoped></style>
