<template>
  <div class="">
    <div>
      <div
        v-for="(person, index) in reviewExpenses"
        :key="index"
        class="tw-grid tw-gap-2.5 md:tw-grid-cols-2 md:tw-gap-4.5 tw-mb-8"
      >
        <ReviewIncomeExpenseAccordion
          type="expenses"
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
import ReviewIncomeExpenseAccordion from "@/components/verify-income-expense/ReviewIncomeExpenseAccordion.vue";
import router from "@/router";
import { computed, ref } from "vue";
import { useRoute, type RouteRecordName } from "vue-router";
import TheFooter from "../../components/global/TheFooter.vue";
import ThisIsNotRight from "../../components/verify-income-expense/ThisIsNotRight.vue";
import listArrow from "/assets/verify-income-expense/listArrow.svg";
import type { CustomerDetail } from "@/stores/useApplicationStore";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import CheckBox from "@/components/form/CheckBox.vue";

const route = useRoute();
const { data } = useGetPersonalDetails();
const customerConsent = ref(false);

const reviewExpenses = computed(() => {
  let expense: {
    name: string;
    totalIncome?: string;
    details?: unknown[];
  }[] = [];
  data?.value?.forEach((d: CustomerDetail) => {
    expense.push({
      name: `${d.firstName} ${d.middleName || ""} ${d.lastName}`,
      totalIncome: "50,000",
      details: [
        {
          "Level-1 Category": "30,000",
          "Level-2 sub-category": "10,000",
        },
      ],
    });
  });
  return expense;
});

const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const handleNextClick = () => router.push(nextNavigation.value);
</script>

<style scoped></style>
