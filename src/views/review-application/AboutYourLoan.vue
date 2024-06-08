<template>
  <div>
    <ReviewVehicleLoanVehicleDetails
      v-if="loanType === LOAN_TYPE.VEHICLE_LOAN"
    />

    <div>
      <h3 class="tw-mb-6">About your {{ prettyLoanType }} loan.</h3>
    </div>

    <AboutPersonalLoan v-if="loanType === LOAN_TYPE.PERSONAL_LOAN" />

    <AboutVehicleLoan v-else-if="loanType === LOAN_TYPE.VEHICLE_LOAN" />
    <AboutCreditCardLoan v-else />

    <div class="tw-grid tw-gap-2 tw-mt-4">
      <ReviewPersonDetails
        v-for="(customer, index) in dataCustomers"
        :key="index"
        :customer-detail="customer"
      />
    </div>

    <div>
      <h3 class="tw-mb-6 tw-mt-12.5 md:tw-mt-7">Financial Details</h3>
      <div
        class="tw-bg-white tw-drop-shadow-tertiary tw-rounded-3 tw-p-4.5 tw-grid md:tw-grid-cols-3 tw-gap-5 md:tw-gap-10 md:tw-mb-2"
      >
        <div class="">
          <p class="tw-mb-0 tw-text-10px">Total Primary Income Per Month</p>
          <span class="tw-text-primary-500 tw-text-22px tw-font-avenir-medium"
            >$85,000</span
          >
        </div>
        <div>
          <p class="tw-mb-0 tw-text-10px">Total Other Income Per Month</p>
          <span class="tw-text-primary-500 tw-text-22px tw-font-avenir-medium"
            >$20,000</span
          >
        </div>
        <div>
          <p class="tw-mb-0 tw-text-10px">Total Expenses Per Month</p>
          <span class="tw-text-primary-500 tw-text-22px tw-font-avenir-medium"
            >$32,000</span
          >
        </div>
      </div>
    </div>
    <div>
      <h3 class="tw-mb-6 tw-mt-12.5 md:tw-mt-7 tw-w-max">
        By submitting this application:
      </h3>
      <div>
        <div class="tw-flex tw-mx-4.5 tw-mb-3 md:tw-mb-5">
          <CheckBox
            name=""
            class-name="tw-h-4 tw-w-4"
            class="tw-inline"
            input-container-class-name=" tw-h-min tw-w-max "
            v-model="submitCheckbox.first"
          />
          <p class="tw-mb-0 tw-text-sm tw-ml-1.5 md:tw-ml-2">
            I declare the information I provided is correct and complete, and I
            acknowledge it will be relied upon to assess me application
          </p>
        </div>
        <div class="tw-flex tw-mx-4.5 tw-mb-3 md:tw-mb-5">
          <CheckBox
            name=""
            class-name="tw-h-4 tw-w-4"
            class="tw-inline"
            input-container-class-name=" tw-h-min tw-w-max "
            v-model="submitCheckbox.second"
          />
          <p class="tw-mb-0 tw-text-sm tw-ml-1.5 md:tw-ml-2">
            I agree a credit history can be check with a credit bureau service.
          </p>
        </div>
      </div>
      <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
        <CustomButton
          title="Submit Application"
          class="tw-w-full md:tw-max-w-xs"
          className="tw-h-12.5 md:tw-h-15"
          :is-disabled="!submitCheckbox.first || !submitCheckbox.second"
          @click="handleNextClick"
          :showArrow="true"
        />
      </div>
    </div>
    <teleport to="#the-footer">
      <TheFooter
        :is-disabled="!submitCheckbox.first || !submitCheckbox.second"
        :navigate-to="true"
        buttonLabel="Submit Application"
        @handle-next-click="handleNextClick"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import ReviewPersonDetails from "@/components/review-application/ReviewPersonDetails.vue";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import useGetApplicationDetails from "@/utils/composables/API/useGetApplicationDetails";
import LOAN_TYPE from "@/utils/LoanTypes";
import { computed, ref } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import CheckBox from "../../components/form/CheckBox.vue";
import TheFooter from "../../components/global/TheFooter.vue";
import AboutPersonalLoan from "./AboutPersonalLoan.vue";
import AboutVehicleLoan from "./AboutVehicleLoan.vue";
import ReviewVehicleLoanVehicleDetails from "./ReviewVehicleLoanVehicleDetails.vue";
import AboutCreditCardLoan from "./AboutCreditCardLoan.vue";

const submitCheckbox = ref({
  first: false,
  second: false,
});

const route = useRoute();
const router = useRouter();
const { data: dataApp } = useGetApplicationDetails();
const loanType = computed(() => dataApp?.value?.applicationType);
const prettyLoanType = computed(() => {
  switch (loanType.value) {
    case LOAN_TYPE.CREDIT_CARD_LOAN:
      return "Credit Card";
    case LOAN_TYPE.PERSONAL_LOAN:
      return "Personal";
    case LOAN_TYPE.VEHICLE_LOAN:
      return "Vehicle";

    default:
      return "";
  }
});

const { data: dataCustomers } = useGetPersonalDetails();

const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));
const handleNextClick = () => router.push(nextNavigation.value);
</script>

<style scoped></style>
