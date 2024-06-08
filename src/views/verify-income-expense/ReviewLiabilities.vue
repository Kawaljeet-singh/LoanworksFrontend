<template>
  <div class="tw-grid tw-gap-6 md:tw-grid-cols-2">
    <div>
      <ReviewLiabilityHomeLoan />
    </div>

    <!-- <div
      class="tw-order-last md:tw-order-none tw-border-t tw-pt-4 tw-border-secondary-50 md:tw-border-none md:tw-pt-0"
    >
      <p>Do you have any other loans or credit cards?</p>
      <div class="qb-shadow-secondary tw-py-4 tw-my-4 tw-border-y tw-bg-white">
        <div class="tw-flex tw-w-max tw-cursor-pointer">
          <img src="/assets/plus.svg" class="tw-w-5 tw-mx-2" /> Add another
          liability
        </div>
      </div>
    </div> -->
    <div>
      <ReviewLiabilityCarLoan />
    </div>
    <AddLiability />

    <teleport to="#the-footer">
      <TheFooter
        :is-disabled="false"
        :navigate-to="true"
        @handle-next-click="handleNextClick"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import ReviewLiabilityCarLoan from "@/components/verify-income-expense/ReviewLiabilityCarLoan.vue";
import ReviewLiabilityHomeLoan from "@/components/verify-income-expense/ReviewLiabilityHomeLoan.vue";
import { computed, ref } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import TheFooter from "../../components/global/TheFooter.vue";
import AddLiability from "@/components/verify-income-expense/AddLiability.vue";
const route = useRoute();
const router = useRouter();
const reviewIncome = [
  {
    name: "John Doe Expenses",

    details: [
      {
        "Level-1 Category": "30,000",
        "Level-2 sub-category": "10,000",
      },
    ],
  },
  {
    name: "Joe Schmoe Expenses",
    details: [
      {
        "Level-1 Category": "30,000",
        "Level-2 sub-category": "10,000",
      },
    ],
  },
];

const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));
const handleNextClick = () => router.push(nextNavigation.value);
</script>

<style scoped></style>
