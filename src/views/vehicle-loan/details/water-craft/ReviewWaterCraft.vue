<template>
  <form @submit.prevent="handleNextClick" class="md:tw-gap-4 lg:tw-mb-20">
    <div class="tw-grid md:tw-grid-cols-2 tw-gap-4 lg:tw-gap-8">
      <div class="tw-bg-white tw-drop-shadow-sub-shadow tw-rounded-3 tw-p-4">
        <div class="tw-grid tw-grid-cols-2 tw-mb-5">
          <h1 class="tw-font-medium tw-leading-none tw-flex tw-items-center">
            {{ isBoat ? "Boat" : "Watercraft" }}
          </h1>
          <div class="tw-flex tw-justify-center">
            <img :src="boatImg" alt="" class="tw-h-11" />
          </div>
        </div>
        <div class="tw-grid tw-grid-cols-2 tw-gap-x-1 tw-gap-y-6">
          <h2 class="tw-flex tw-items-center tw-col-span-2">
            {{ waterCraftDetails?.boat || (isBoat ? "{boatname}" : "{name}") }}
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
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h1 class="tw-font-medium tw-leading-none tw-flex tw-items-center">
            Trailer
          </h1>
          <h1 class="tw-font-medium tw-leading-none tw-flex tw-items-center">
            {{ trailerDetails?.trailer }}
          </h1>
        </div>

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

      <div class="tw-flex tw-items-end tw-order-1 md:tw-order-none">
        <div
          class="tw-py-4 tw-w-full tw-h-fit tw-px-5 tw-mt-3 tw-flex tw-items-center tw-justify-between tw-bg-primary-500"
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

      <div class="card">
        <div class="card-header">
          <h1 class="tw-font-medium tw-leading-none tw-flex tw-items-center">
            {{ engineDetailsFormated.header.label }}
          </h1>
          <h1 class="tw-font-medium tw-leading-none tw-flex tw-items-center">
            {{ engineDetailsFormated.header.value }}
          </h1>
        </div>

        <div class="tw-grid tw-grid-cols-2 tw-gap-y-6">
          <div v-for="(d, index) in engineDetailsFormated.details" :key="index">
            <span class="tw-text-10px tw-font-avenir-medium">
              {{ d.label }}
            </span>
            <span
              class="tw-text-sm tw-block tw-text-primary-500 tw-font-avenir-medium"
            >
              {{ d.value }}
            </span>
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
import useGetVehicleLoanPopulated from "@/utils/composables/API/vehicle-loan/useGetVehicleLoanPopulated";
import vehicleLoan from "@/utils/route-names/routeNameVehicleLoan";
import { computed } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import boatImg from "/assets/vehicle-loan/boat.png";
import type { OPTION } from "@/types/global";

const { data } = useGetVehicleLoanPopulated();

const waterCraftDetails = computed(() => data?.value?.waterCraftDetails);

const trailerDetails = computed(() => data?.value?.trailerDetails);
const engineDetails = computed(() => data?.value?.engineDetails);
const vehicleDetails = computed(() => data?.value?.vehicleLoanDetails);
const vehicleSubType = computed(() => vehicleDetails?.value?.vehicleSubType);

const router = useRouter();

const route = useRoute();

const registrationDetails = computed(() => [
  {
    key: "Registration Number",
    value: trailerDetails?.value?.hullNumber,
  },
  {
    key: "State",
    value: trailerDetails?.value?.registeredState,
  },
]);

const engineDetailsFormated = computed(() => {
  let data = {
    header: {
      label: "Engine",
      value:
        engineDetails.value?.engineType === "Inboard"
          ? "Inboard Engine"
          : engineDetails.value?.engine,
    },
    details: [] as OPTION[],
  };

  if (engineDetails.value?.engineNumber) {
    data.details.push({
      label: "Engine Number",
      value: engineDetails.value?.engineNumber,
    });
  }

  return data;
});

const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));
const isBoat = computed(() => route.meta.isBoat);

const handleNextClick = () => {
  if (vehicleDetails.value.loanPurpose === "Refinance") {
    router.push({ name: vehicleLoan.vehicleDetails.refinancingLoan });
  } else {
    router.push({ name: vehicleLoan.vehicleDetails.wayOfPerchase });
  }
};
</script>

<style>
.card {
  @apply tw-bg-white tw-drop-shadow-sub-shadow tw-rounded-3 tw-p-4;
}

.card-header {
  @apply tw-mb-6 tw-flex tw-justify-between tw-gap-10 tw-items-baseline tw-mt-2;
}
</style>
