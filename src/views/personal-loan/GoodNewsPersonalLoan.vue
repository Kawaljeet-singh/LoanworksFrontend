<template>
  <div class="tw-pb-7">
    <div>
      <h3 class="tw-text-left tw-mb-5">
        Good News {{ customerName || "first name" }}!
      </h3>

      <p>
        Here is your personalised rate and you are probably eligible for a ${{
          dataApp?.requestedAmount
        }}
        personal loan.
      </p>
      <p>We have already emailed you a rate quote.</p>
    </div>

    <div class="tw-grid md:tw-grid-cols-2 tw-gap-6 tw-items-start">
      <div
        class="left tw-bg-qb-purple-100 tw-px-4 tw-pt-4.5 tw-drop-shadow-primary"
      >
        <div
          class="tw-flex tw-justify-between md:tw-flex-col md:tw-items-center md:tw-gap-2 lg:tw-flex-row tw-grid-cols-2"
        >
          <p
            class="tw-text-xl tw-text-qb-black-600 md:tw-order-2 lg:tw-order-first"
          >
            Product Name
          </p>

          <img :src="carLogo" alt="" class="tw-inline tw-h-16 tw-w-16" />
        </div>
        <div class="tw-grid tw-grid-cols-2 md:tw-grid-cols-1 md:tw-gap-7">
          <div v-for="(el, index) in leftBoxRates" :key="index">
            <div
              class="tw-text-qb-black-600 tw-font-medium tw-text-xs md:tw-text-center lg:tw-text-start"
            >
              {{ el.label_one }}
            </div>
            <div
              class="tw-font-extrabold tw-text-primary-500 tw-text-22px tw-font-avenir-medium md:tw-text-center lg:tw-text-start md:tw-text-4xl md:tw-pt-5 lg:tw-pt-2"
            >
              {{ el.heading }}
            </div>
            <div
              class="tw-text-qb-black-600 tw-text-10px tw-font-medium md:tw-text-center lg:tw-text-start"
            >
              {{ el.label_two }}
            </div>
          </div>
        </div>
        <div class="tw-bg-white md:tw-hidden tw-mt-7 tw-mb-2">
          <div
            v-for="(value, key) in rates"
            :key="key"
            class="tw-flex tw-justify-between tw-p-3 tw-border-b tw-border-[#c0c0c0]"
          >
            <span>{{ key }}</span>
            <span>{{ value }}</span>
          </div>
          <div
            v-for="(value, key) in fees"
            :key="key"
            class="tw-flex tw-justify-between tw-p-3 tw-border-b tw-border-[#c0c0c0]"
          >
            <span class="tw-pl-4">{{ key }}</span>
            <span>{{ value }}</span>
          </div>
        </div>
        <div
          class="key-fact-sheet tw-mt-3 tw-text-center tw-cursor-pointer tw-flex tw-justify-center tw-items-center"
          @click="OpenModal('SendKeyFacts')"
        >
          <svg
            width="15"
            viewBox="0 0 37 30"
            fill="#008ba8"
            class="tw-fill-primary tw-inline"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 4.45936L18.069 14.0954L36.361 4.3406C35.9938 3.0906 35.2329 1.99372 34.1907 1.21092C33.1485 0.42968 31.8829 0.00468 30.5798 0H6.52656C5.1172 0.0031252 3.7422 0.42968 2.57812 1.225C1.41404 2.02032 0.51564 3.14688 0 4.45936Z"
              fill=""
            />
            <path
              d="M36.1934 8L18.867 17.5468C18.4467 17.7702 17.9405 17.7702 17.5202 17.5468L0.193446 8V22.114C-0.375109 23.9765 0.365526 25.764 1.68425 27.0812C3.00145 28.4 4.78893 29.1406 6.65145 29.1437H29.7358C31.5983 29.1406 33.3858 28.3999 34.703 27.0812C36.0218 25.764 36.7624 23.9765 36.1934 22.114V8Z"
              fill=""
            />
          </svg>
          <!-- <font-awesome-icon icon="fa-solid fa-envelope" /> -->
          <span class="tw-text-primary tw-p-4">Send Key Fact Sheet</span>
        </div>
      </div>
      <div
        class="right tw-hidden md:tw-block tw-px-9 tw-py-7 tw-bg-qb-purple-100 tw-drop-shadow-primary"
      >
        <div class="tw-bg-white">
          <div
            v-for="(value, key) in rates"
            :key="key"
            class="tw-flex tw-justify-between tw-p-3 tw-border-b tw-border-[#c0c0c0]"
          >
            <span>{{ key }}</span>
            <span>{{ value }}</span>
          </div>
          <div
            v-for="(value, key) in fees"
            :key="key"
            class="tw-flex tw-justify-between tw-p-3 tw-border-b tw-border-[#c0c0c0]"
          >
            <span class="tw-pl-4">{{ key }}</span>
            <span>{{ value }}</span>
          </div>
        </div>
      </div>
    </div>

    <teleport to="#the-footer">
      <TheFooter
        left-button-label="Apply Later"
        :navigate-to="true"
        @handle-next-click="handleNextClick"
        button-label="Apply Now"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import useModelStore from "@/stores/useModalStore";
import useVehicleStore from "@/stores/useVehicleStore";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import useGetVehicleLoan from "@/utils/composables/API/vehicle-loan/useGetVehicleLoan";
import LOAN_TYPE from "@/utils/LoanTypes";
import vehicleLoan from "@/utils/route-names/routeNameVehicleLoan";
import { computed } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import TheFooter from "../../components/global/TheFooter.vue";
import carLogo from "/assets/verify-income-expense/carLoan.svg";
import useGetApplicationDetails from "@/utils/composables/API/useGetApplicationDetails";

const { OpenModal } = useModelStore();
const route = useRoute();
const router = useRouter();
const { data } = useGetVehicleLoan();
const { data: dataCustomer } = useGetPersonalDetails({ isFirstPerson: 1 });
const { data: dataApp } = useGetVehicleLoan();
const customerName = computed(() => {
  return dataCustomer?.value?.length && dataCustomer?.value[0]?.firstName;
});
const vehicleType = computed(() => {
  return data?.value?.vehicleType;
});
const loanPurpose = computed(() => {
  return data?.value?.loanPurpose;
});

const leftBoxRates = [
  {
    label_one: "Borrower Rate",
    heading: "3.75% p.a",
    label_two: "Variable",
  },
  {
    label_one: "Repayment Amount",
    heading: "$257.00",
    label_two: "Fortnightly",
  },
];

const rates = computed(() => {
  return {
    "Comparison Rate": "3.90% p.a.",
    "Loan Amount": "$" + dataApp?.value?.requestedAmount || "50,000",
    "Loan Term": "5 Years",
    "Total Amount to Repay": "$257.00",
    Fees: "",
  };
});

const fees = {
  "Establishment Fee": "$100",
  "Monthly Fee": "$100",
  "Early Pay Out Fee": "$100",
};

const nextNavigation = computed(() => {
  return {
    name: route.meta.nextNavigation as RouteRecordName,
  };
});
const { vehicleDetails } = useVehicleStore();

const LoanType = computed(() => route.meta.LoanType);
const handleNextClick = () => {
  if (LoanType.value == LOAN_TYPE.VEHICLE_LOAN) {
    if (
      vehicleDetails.categoryOfVehicle === "Motor Vehicle" ||
      vehicleType.value === "Motor Vehicle"
    ) {
      if (
        vehicleDetails.purpose === "Purchase" ||
        loanPurpose.value === "Purchase"
      ) {
        router.push({ name: vehicleLoan.vehicleDetails.conditionOfVehicle });
      } else if (
        vehicleDetails.purpose === "Refinance" ||
        loanPurpose.value === "Refinance"
      )
        router.push({ name: vehicleLoan.vehicleDetails.registrationNo });
      return;
    } else {
      if (
        vehicleDetails.purpose === "Purchase" ||
        loanPurpose.value === "Purchase"
      ) {
        router.push({ name: vehicleLoan.vehicleDetails.conditionOfVehicle });
      } else if (
        vehicleDetails.purpose === "Refinance" ||
        loanPurpose.value === "Refinance"
      )
        router.push({ name: vehicleLoan.vehicleDetails.boatDetails.aboutBoat });
      return;
    }
  }
  router.push(nextNavigation.value);
};
</script>

<style scoped></style>
