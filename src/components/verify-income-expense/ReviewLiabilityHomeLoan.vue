<template>
  <div class="tw-bg-white tw-drop-shadow-tertiary">
    <div>
      <div class="tw-grid">
        <div>
          <div
            class="tw-bg-white tw-drop-shadow-sub-shadow tw-py-1 tw-p-2.5 tw-flex tw-justify-between tw-text-sm"
          >
            <div>
              <img :src="homeLogo" alt="" class="tw-inline tw-w-11" />
              <span> Home Loan</span>
            </div>
            <span class="tw-flex tw-items-center">
              <font-awesome-icon icon="fa-solid fa-chevron-down" />
            </span>
          </div>
        </div>
        <div class="tw-m-5">
          <div class="">
            <p>Lender Name</p>
            <CustomInput
              name=""
              className="tw-text-start !tw-h-10 "
              placeholder="Select your lender"
              v-model="formValue.name"
            />
          </div>
          <div
            class="tw-border-y tw-border-secondary-50 tw-py-3 tw-grid tw-grid-cols-2 tw-gap-4"
          >
            <div>
              <p class="tw-mb-1 tw-text-10px">Current Loan Balance</p>
              <span class="tw-text-primary tw-font-avenir-medium"
                >${{ homeLoan.additionalCategoryInfo.currentBalance }}</span
              >
            </div>
            <div>
              <p class="tw-mb-1 tw-text-10px">Redraw Balance</p>
              <span class="tw-text-primary tw-font-avenir-medium"
                >${{ homeLoan.additionalCategoryInfo.availableBalance }}</span
              >
            </div>
            <div>
              <p class="tw-mb-1 tw-text-10px">Original Loan Amount</p>
              <span class="tw-text-primary tw-font-avenir-medium"
                >${{ homeLoan.value }}</span
              >
            </div>
            <div>
              <p class="tw-mb-1 tw-text-10px">Remaining Loan Terms</p>
              <span class="tw-text-primary tw-font-avenir-medium">5 Years</span>
            </div>
            <div>
              <p class="tw-mb-1 tw-text-10px">Repayments Type</p>
              <span class="tw-text-primary tw-font-avenir-medium"
                >Variable</span
              >
            </div>
            <div>
              <p class="tw-mb-1 tw-text-10px">Interest Rate</p>
              <span class="tw-text-primary tw-font-avenir-medium"
                >3.7 % p.a</span
              >
            </div>
            <div class="tw-col-span-2">
              <p class="tw-mb-1 tw-text-10px">What is this loan for?</p>
              <span class="tw-text-primary tw-font-avenir-medium"
                >Investment Property</span
              >
            </div>
          </div>
          <!-- <div class="tw-mt-3.5">
            <p class="tw-mb-1 tw-text-10px">
              Who is responsible for this loan?
            </p>
            <span class="tw-text-primary tw-font-avenir-medium">{{
              homeLoan.additionalCategoryInfo.accountHolder
            }}</span>
          </div> -->
        </div>
        <ThisIsNotRight />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useGetIllionData from "@/utils/composables/illion/useGetIllionData";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import ThisIsNotRight from "../../components/verify-income-expense/ThisIsNotRight.vue";
import CustomInput from "../form/CustomInput.vue";
import homeLogo from "/assets/verify-income-expense/homeLoan.svg";
const route = useRoute();
const data = useGetIllionData();

const homeLoan = computed(
  () => data.borrowerCategorisedFinancials[0].liabilities[1]
);
const formValue = ref({
  name: "",
});
const nextNavigation = computed(() => route.meta.nextNavigation);
const navigateTo = ref({ name: nextNavigation });
</script>

<style scoped></style>
