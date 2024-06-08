<template>
  <div class="tw-bg-white tw-drop-shadow-tertiary">
    <div>
      <div class="tw-grid">
        <div>
          <div
            class="tw-bg-white tw-drop-shadow-sub-shadow tw-py-1 tw-p-2.5 tw-flex tw-justify-between tw-text-sm"
          >
            <div>
              <img :src="carLogo" alt="" class="tw-inline tw-w-11" />
              <span> Personal / Car Loan</span>
            </div>
            <span class="tw-flex tw-items-center">
              <font-awesome-icon icon="fa-solid fa-chevron-down" />
            </span>
          </div>
        </div>
        <div class="tw-m-5">
          <div class="">
            <p class="tw-mb-1">Lender Name</p>
            <span class="tw-text-primary tw-font-avenir-medium"
              >Company Name</span
            >
          </div>
          <div
            class="tw-border-y tw-border-secondary-50 tw-py-3 tw-grid tw-grid-cols-2 tw-gap-4"
          >
            <div>
              <p class="tw-mb-1 tw-text-10px">Current Loan Balance</p>
              <span class="tw-text-primary tw-font-avenir-medium">$50,000</span>
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
          </div>
          <!-- <div class="tw-mt-4">
            <p class="tw-mb-1 tw-text-10px">
              Who is responsible for this loan?
            </p>
            <span class="tw-text-primary tw-font-avenir-medium"
              >{Person 2 Firstname}</span
            >
          </div> -->
        </div>
        <ThisIsNotRight />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ThisIsNotRight from "../../components/verify-income-expense/ThisIsNotRight.vue";
import carLogo from "/assets/verify-income-expense/carLoan.svg";
</script>

<style scoped></style>
