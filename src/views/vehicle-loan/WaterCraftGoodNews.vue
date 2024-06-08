<template>
  <div>
    <div class="tw-mb-6 md:tw-mb-13">
      <h3 class="tw-text-left tw-mb-5">
        Good News {{ customerName || "PersonX Firstname" }}!
      </h3>
      <p>
        We now have enough information about your
        {{ vehicleLoanDetails?.vehicleCondition || "condition" }}
        {{ waterCraftDetails?.boat || "vehicle" }} and the loan you require for
        you to proceed to the next step.
      </p>
    </div>

    <div class="tw-grid md:tw-grid-cols-2 tw-gap-8">
      <div class="tw-grid tw-gap-5">
        <div class="card">
          <div class="tw-grid tw-grid-cols-2 tw-mb-5">
            <h1 class="tw-font-medium tw-leading-none tw-flex tw-items-center">
              Boat
            </h1>
            <div class="tw-flex tw-justify-center">
              <img :src="boatImg" alt="" class="tw-h-11" />
            </div>
          </div>
          <div class="tw-grid tw-grid-cols-2 tw-gap-1 tw-gap-y-4">
            <h2 class="tw-flex tw-items-center tw-col-span-2">
              {{ waterCraftDetails?.boat }}
            </h2>
            <div>
              <span class="tw-text-10px tw-font-avenir-medium">
                Hull Identification Number
              </span>
              <span
                class="tw-text-sm tw-block tw-text-primary-500 tw-font-avenir-medium"
              >
                {{ waterCraftDetails?.hullNumber || "AU-TWA 051192 H899" }}
              </span>
            </div>
            <div v-if="waterCraftDetails?.officialNumber">
              <span class="tw-text-10px tw-font-avenir-medium">
                Watercraft Official Number
              </span>
              <span
                class="tw-text-sm tw-block tw-text-primary-500 tw-font-avenir-medium"
              >
                {{ waterCraftDetails?.officialNumber || "AU-TWA 051192 H899" }}
              </span>
            </div>

            <div v-for="(el, index) in waterCraft" :key="index">
              <span class="tw-text-10px tw-font-avenir-medium">
                {{ el.key }}
              </span>
              <span
                class="tw-text-sm tw-block tw-text-primary-500 tw-font-avenir-medium"
              >
                {{ el.value }}
              </span>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h1 class="tw-font-medium tw-leading-none tw-flex tw-items-center">
              Trailer
            </h1>
            <h1 class="tw-font-medium tw-leading-none tw-flex tw-items-center">
              {{ trailerDetails.trailerName }}
            </h1>
          </div>

          <div class="tw-grid tw-grid-cols-2 tw-gap-y-4">
            <div v-for="(el, index) in trailerDetails.details" :key="index">
              <span class="tw-text-10px tw-font-avenir-medium">
                {{ el.key }}
              </span>
              <span
                class="tw-text-sm tw-block tw-text-primary-500 tw-font-avenir-medium"
              >
                {{ el.value }}
              </span>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h1 class="tw-font-medium tw-leading-none tw-flex tw-items-center">
              Engine
            </h1>
            <h1 class="tw-font-medium tw-leading-none tw-flex tw-items-center">
              {{ engineDetails?.engine || "enginename" }}
            </h1>
          </div>

          <div class="tw-grid tw-grid-cols-2 tw-gap-y-4">
            <div>
              <span class="tw-text-10px tw-font-avenir-medium">
                Engine Number
              </span>
              <span
                class="tw-text-sm tw-block tw-text-primary-500 tw-font-avenir-medium"
              >
                {{ engineDetails?.engineNumber || "52WVC10338" }}
              </span>
            </div>
            <div></div>
            <div v-for="(el, index) in engine" :key="index">
              <span class="tw-text-10px tw-font-avenir-medium">
                {{ el.key }}
              </span>
              <span
                class="tw-text-sm tw-block tw-text-primary-500 tw-font-avenir-medium"
              >
                {{ el.value }}
              </span>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="tw-grid tw-grid-cols-2 tw-gap-y-6">
            <div v-for="(el, index) in amounts" :key="index">
              <span class="tw-text-10px tw-font-avenir-medium">
                {{ el.key }}
              </span>
              <span
                class="tw-text-sm tw-block tw-text-primary-500 tw-font-avenir-medium"
              >
                {{ el.value }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="left right">
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
          <div class="tw-grid tw-grid-cols-2">
            <div v-for="(el, index) in leftBoxRates" :key="index">
              <div class="tw-text-qb-black-600 tw-font-medium tw-text-xs">
                {{ el.label_one }}
              </div>
              <div
                class="tw-font-extrabold tw-text-primary-500 tw-text-22px tw-font-avenir-medium"
              >
                {{ el.heading }}
              </div>
              <div class="tw-text-qb-black-600 tw-text-10px tw-font-medium">
                {{ el.label_two }}
              </div>
            </div>
          </div>
          <div class="tw-bg-white tw-mt-7 tw-mb-7">
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
    </div>

    <teleport to="#the-footer">
      <TheFooter
        :navigate-to="true"
        @handle-next-click="handleNextClick"
        button-label="Apply Now"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import useGetVehicleLoanPopulated from "@/utils/composables/API/vehicle-loan/useGetVehicleLoanPopulated";
import { computed } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import TheFooter from "../../components/global/TheFooter.vue";
import boatImg from "/assets/vehicle-loan/boat.png";
import carLogo from "/assets/verify-income-expense/carLoan.svg";

const route = useRoute();
const router = useRouter();

const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const { data } = useGetVehicleLoanPopulated();

const vehicleLoanDetails = computed(() => data?.value?.vehicleLoanDetails);

const { data: dataCustomer } = useGetPersonalDetails({ isFirstPerson: 1 });

const customerName = computed(
  () => dataCustomer?.value?.length && dataCustomer?.value[0]?.firstName
);

const rates = {
  "Comparison Rate": "3.90% p.a.",
  "Loan Amount": "$50,000",
  "Loan Term": "5 Years",
  "Total Amount to Repay": "$257.00",
  Fees: "",
};

const fees = {
  "Establishment Fee": "$100",
  "Monthly Fee": "$100",
  "Early Pay Out Fee": "$100",
};

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
const getFullYear = (date: string | null) => {
  return date ? new Date(date).getFullYear() : "";
};
const engineDetails = computed(() => data?.value?.engineDetails);
const waterCraftDetails = computed(() => data?.value?.waterCraftDetails);
const yearOfManufacture = computed(
  () =>
    waterCraftDetails?.value?.yearOfManufacture &&
    new Date(waterCraftDetails?.value?.yearOfManufacture).getFullYear()
);

const waterCraft = computed(() => {
  return [
    {
      key: "Year of Manufacture",
      value: yearOfManufacture.value || "2005",
    },
    {
      key: "Make",
      value: waterCraftDetails?.value?.make || "s60",
    },
    {
      key: "Model",
      value: waterCraftDetails?.value?.model || "Volvo",
    },
    {
      key: "Variant",
      value: waterCraftDetails?.value?.varient || "R",
    },
  ];
});
const engine = computed(() => {
  return [
    {
      key: "Year of Manufacture",
      value: yearOfManufacture.value || "2005",
    },
    {
      key: "Make",
      value: engineDetails?.value?.make || "s60",
    },
    {
      key: "Model",
      value: engineDetails?.value?.model || "Volvo",
    },
    {
      key: "Variant",
      value: engineDetails?.value?.varient || "R",
    },
  ];
});
const trailerDetails = computed(() => {
  return {
    trailerName: data?.value?.trailerDetails?.trailer || "trailername",
    details: [
      {
        key: "Registration Number",
        value: "FB23CA",
      },
      {
        key: "State",
        value: data?.value?.trailerDetails?.registeredState || "NSW",
      },
      {
        key: "Year of Manufacture",
        value:
          getFullYear(data?.value?.trailerDetails?.yearOfManufacture) || "2005",
      },
      {
        key: "Make",
        value: data?.value?.trailerDetails?.make || "s60",
      },
      {
        key: "Model",
        value: data?.value?.trailerDetails?.model || "Volvo",
      },
      {
        key: "Variant",
        value: data?.value?.trailerDetails?.varient || "R",
      },
    ],
  };
});

const amounts = computed(() => [
  {
    key: "Total Purchase Amount",
    value: "$" + (data?.value?.saleDetails?.totalPurchaseAmount || "50,000"),
  },
  {
    key: "Trade In Amount",
    value: "$" + (data?.value?.saleDetails?.tradeInAmount || "50,000"),
  },
  {
    key: "Deposit Paid",
    value: "$" + (data?.value?.saleDetails?.depositPaidAmount || "50,000"),
  },
  {
    key: "Required Loan Amount",
    value: "$" + (vehicleLoanDetails?.value?.requestedAmount || "10,000"),
  },
]);

const handleNextClick = () => {
  router.push(nextNavigation.value);
};
</script>

<style>
.card {
  @apply tw-bg-white tw-drop-shadow-sub-shadow tw-rounded-3 tw-p-4;
}
.card-header {
  @apply tw-mb-6 tw-flex tw-justify-between tw-gap-10 tw-items-baseline tw-mt-2;
}
.right {
  @apply tw-bg-qb-purple-100 tw-px-4 tw-py-4.5 tw-drop-shadow-primary;
}
</style>
