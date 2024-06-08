<template>
  <div>
    <div class="tw-mb-6 md:tw-mb-13">
      <h3 class="tw-text-left tw-mb-5">
        Good News {{ customerName || "PersonX Firstname" }}!
      </h3>
      <p>
        We now have enough information about your
        {{ vehicleLoanDetails?.vehicleCondition || "condition" }}
        {{ carDetials?.car || "vehicle" }} and the loan you require for you to
        proceed to the next step.
      </p>
    </div>

    <div class="tw-grid md:tw-grid-cols-2 tw-gap-8">
      <div class="tw-grid tw-gap-5">
        <div class="tw-bg-white tw-drop-shadow-sub-shadow tw-rounded-3 tw-p-4">
          <div class="tw-grid tw-grid-cols-2 tw-mb-5">
            <h1 class="tw-font-medium tw-leading-none tw-flex tw-items-center">
              {{
                vehicleDetails.typeOfVehicle ||
                vehicleSubType ||
                "{vehicletype}"
              }}
            </h1>
            <div class="tw-flex tw-justify-center">
              <img :src="carImg" alt="" class="tw-h-11" />
            </div>
          </div>
          <div class="tw-grid tw-grid-cols-2 tw-gap-y-6">
            <div v-for="(el, index) in firstCard" :key="index">
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

        <div class="tw-bg-white tw-drop-shadow-sub-shadow tw-rounded-3 tw-p-4">
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
        <div class="tw-bg-white tw-mt-7 tw-mb-2">
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
import useModelStore from "@/stores/useModalStore";
import useVehicleStore from "@/stores/useVehicleStore";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import useGetVehicleLoanPopulated from "@/utils/composables/API/vehicle-loan/useGetVehicleLoanPopulated";
import { computed } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import TheFooter from "../../components/global/TheFooter.vue";
import carImg from "/assets/vehicle-loan/car.png";
import carLogo from "/assets/verify-income-expense/carLoan.svg";
const { vehicleDetails } = useVehicleStore();
const { OpenModal } = useModelStore();

const route = useRoute();
const router = useRouter();

const { data } = useGetVehicleLoanPopulated();
const { data: dataCustomer } = useGetPersonalDetails({ isFirstPerson: 1 });

const customerName = computed(() => {
  return dataCustomer?.value?.length && dataCustomer?.value[0]?.firstName;
});

const carDetials = computed(() => data?.value?.carDetails);
const vehicleLoanDetails = computed(() => data?.value?.vehicleLoanDetails);
const vehicleSubType = computed(
  () => vehicleLoanDetails?.value?.vehicleSubType
);

const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));
const rates = computed(() => ({
  "Comparison Rate": "3.90% p.a.",
  "Loan Amount": "$" + vehicleLoanDetails?.value?.requestedAmount || "50,000",
  "Loan Term": "5 Years",
  "Total Amount to Repay": "$257.00",
  Fees: "",
}));

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

const yearOfManufacture = computed(
  () =>
    carDetials?.value?.yearOfManufacture &&
    new Date(carDetials?.value?.yearOfManufacture).getFullYear()
);

const firstCard = computed(() => {
  let data = [
    {
      key: "Model",
      value: carDetials?.value?.model || "Volvo",
    },
    {
      key: "Make",
      value: carDetials?.value?.make || "s60",
    },
    {
      key: "Variant",
      value: carDetials?.value?.varient || "R",
    },
    {
      key: "Vehicle",
      value: carDetials?.value?.car || "C",
    },
    {
      key: "Year",
      value: yearOfManufacture.value || "2005",
    },
  ];
  if (carDetials?.value?.travelledDistance) {
    data.push({
      key: "Odometer",
      value: (carDetials?.value?.travelledDistance || "120,000") + "kms",
    });
  }
  return data;
});

const amounts = computed(() => [
  {
    key: "Total Purchase Amount",
    value: "$" + (carDetials?.value?.totalPurchaseAmount || "50,000"),
  },
  {
    key: "Trade In Amount",
    value: "$10,000",
  },
  {
    key: "Deposit Paid",
    value: "$50,000",
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

<style scoped></style>
