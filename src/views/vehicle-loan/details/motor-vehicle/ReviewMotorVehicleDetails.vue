<template>
  <form @submit.prevent="handleNextClick()" class="md:tw-gap-4 lg:tw-mb-20">
    <div class="tw-grid md:tw-grid-cols-2 tw-gap-4 lg:tw-gap-8">
      <div class="tw-flex tw-gap-2 tw-flex-col">
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

        <div
          v-if="registrationDetails.length"
          class="tw-bg-white tw-drop-shadow-sub-shadow tw-rounded-3 tw-p-4"
        >
          <h1
            class="tw-font-medium tw-leading-none tw-mb-6 tw-flex tw-items-center"
          >
            Registration Details
          </h1>

          <div class="tw-grid tw-grid-cols-2 tw-gap-y-6">
            <div v-for="(el, index) in registrationDetails" :key="index">
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

      <div class="tw-flex tw-flex-col tw-justify-between">
        <div class="tw-bg-white tw-drop-shadow-sub-shadow tw-rounded-3 tw-p-4">
          <div class="tw-mb-5">
            <h1
              class="tw-font-medium tw-h-11 tw-leading-none tw-flex tw-items-center"
            >
              Vehicle Options
            </h1>
          </div>
          <div class="tw-grid tw-divide-y tw-divide-[#c0c0c0]">
            <div
              class="tw-p-2.5 tw-flex tw-justify-between tw-border-b tw-items-center"
              v-for="(el, index) in left"
              :key="index"
            >
              <div
                class="tw-block tw-text-primary-500 tw-text-sm tw-gap-3 tw-items-center"
              >
                {{ el.title }}
              </div>
              <div class="tw-text-primary-500">$4,000</div>
            </div>
          </div>
        </div>

        <div
          class="tw-py-4 tw-px-5 tw-mt-3 tw-flex tw-items-center tw-justify-between tw-bg-primary-500"
        >
          <div
            class="tw-text-white tw-text-sm tw-font-medium tw-font-avenir-medium"
          >
            Estimate Value
          </div>
          <div
            class="tw-text-white tw-font-bold tw-text-xl tw-font-avenir-medium"
          >
            $90,000
          </div>
        </div>
      </div>
    </div>
    <teleport to="#the-footer">
      <TheFooter
        :is-disabled="false"
        :navigate-to="true"
        @handle-next-click="handleNextClick"
      />
    </teleport>
  </form>
</template>

<script setup lang="ts">
import TheFooter from "@/components/global/TheFooter.vue";
import useVehicleStore from "@/stores/useVehicleStore";
import useGetVehicleLoanPopulated from "@/utils/composables/API/vehicle-loan/useGetVehicleLoanPopulated";
import vehicleLoan from "@/utils/route-names/routeNameVehicleLoan";
import { computed } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import carImg from "/assets/vehicle-loan/car.png";
const { vehicleDetails } = useVehicleStore();
const router = useRouter();

const route = useRoute();

const { data } = useGetVehicleLoanPopulated();

const carDetials = computed(() => data?.value?.carDetails);
const vehicleLoanDetails = computed(() => data?.value?.vehicleLoanDetails);
const vehicleSubType = computed(
  () => vehicleLoanDetails?.value?.vehicleSubType
);

const yearOfManufacture = computed(
  () =>
    carDetials?.value?.yearOfManufacture &&
    new Date(carDetials?.value?.yearOfManufacture).getFullYear()
);

const registrationDetails = computed(() => {
  let data = [];
  if (carDetials?.value?.registrationNumber) {
    data.push({
      key: "Registration Number",
      value: carDetials?.value?.registrationNumber,
    });
  }
  if (carDetials?.value?.registeredState) {
    data.push({
      key: "State",
      value: carDetials?.value?.registeredState || "NSW",
    });
  }
  if (carDetials?.value?.vin) {
    data.push({
      key: "VIN Number",
      value: carDetials?.value?.vin || "JT152EEA100302159",
    });
  }
  return data;
});

const left = [
  {
    title: "Airbag Passenger",
  },

  {
    title: "Central Locking Remote Control",
  },

  {
    title: "Heavy Duty Tow Pack",
  },

  {
    title: "Metallic Paint",
  },
  {
    title: "Power Sunroof",
  },
];

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

const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const handleNextClick = () => {
  if (vehicleLoanDetails?.value?.loanPurpose === "Refinance") {
    router.push({ name: vehicleLoan.vehicleDetails.refinancingLoan });
  } else {
    router.push(nextNavigation.value);
  }
};
</script>

<style></style>
