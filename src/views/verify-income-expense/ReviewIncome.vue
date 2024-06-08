<template>
  <div class="">
    <!-- <p  >
      Success! We have collected the transactions from your banking institution.
    </p> -->
    <div
      class="tw-grid tw-grid-cols-2 tw-drop-shadow-tertiary tw-h-30 md:tw-h-24 tw-bg-white tw-p-4"
    >
      <div class="tw-flex tw-flex-col tw-justify-between">
        <p class="tw-mb-2.5">Total Rental Income after Tax</p>
        <h3 class="tw-font-bold !tw-text-2xl tw-mb-1.5">$50,000</h3>
      </div>
      <div class="tw-flex tw-flex-col tw-justify-between">
        <p class="tw-mb-2.5">Total Investment Income</p>
        <h3 class="tw-font-bold !tw-text-2xl tw-mb-1.5">$50,000</h3>
      </div>
    </div>
    <p class="tw-mt-7.5">Explore each applicant's income</p>
    <div>
      <div
        v-for="(person, index) in reviewIncome"
        :key="index"
        class="tw-grid tw-gap-2.5 md:tw-grid-cols-2 md:tw-gap-4.5 tw-mb-8"
      >
        <ReviewIncomeExpenseAccordionVue
          type="income"
          :person="person"
          :is-open="index === 0"
        />
      </div>
      <div
        class="tw-flex tw-items-center tw-my-6 tw-pt-5 tw-border-t tw-border-white"
      >
        <CheckBox
          class-name="tw-w-6 !tw-h-6"
          input-container-class-name="tw-my-0  tw-w-max  tw-h-6"
          type="checkbox"
          v-model="customerConsent"
        />

        <span class="tw-ml-4">
          Verify that is information is true and correct.</span
        >
      </div>
    </div>
    <teleport to="#the-footer">
      <TheFooter
        :isDisabled="!customerConsent"
        :navigate-to="true"
        @handle-next-click="handleNextClick"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import ReviewIncomeExpenseAccordionVue from "@/components/verify-income-expense/ReviewIncomeExpenseAccordion.vue";
import router from "@/router";
import useGetIllionData from "@/utils/composables/illion/useGetIllionData";
import { computed, ref } from "vue";
import { useRoute, type RouteRecordName } from "vue-router";
import TheFooter from "../../components/global/TheFooter.vue";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import type { CustomerDetail } from "@/stores/useApplicationStore";
import CheckBox from "@/components/form/CheckBox.vue";

const route = useRoute();
const { data } = useGetPersonalDetails();
const customerConsent = ref(false);

const reviewIncome = computed(() => {
  let income: {
    name: string;
    totalIncome?: string;
    details?: unknown[];
  }[] = [];
  data?.value?.forEach((d: CustomerDetail) => {
    income.push({
      name: `${d.firstName} ${d.middleName || ""} ${d.lastName}`,
      totalIncome: "50,000",
      details: [
        {
          "Non-base income": "5,000",
          Bonus: "3,000",
          Commission: "2,000",
        },
        {
          "Non-included income": "5,000",
          "Government payments-family": "2,000",
          "Government payments-carers": "2,000",
        },
        {
          "Other non employment income": "10,000",
          Dividends: "5,000",
          Pension: "5,000",
        },
      ],
    });
  });
  return income;
});

const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const handleNextClick = () => router.push(nextNavigation.value);
</script>

<style scoped></style>
