<template>
  <div class="tw-mb-6">
    <div>
      <h3 class="tw-mb-6">About your {{ vehicleSubType }}.</h3>
    </div>
    <div
      class="tw-grid tw-gap-5 tw-bg-white tw-drop-shadow-sub-shadow tw-rounded-3 tw-p-4"
    >
      <div>
        <div class="tw-grid tw-grid-cols-2 tw-mb-5">
          <h1 class="tw-font-medium tw-leading-none tw-flex tw-items-center">
            {{ vehicleSubType }}
          </h1>
          <div class="tw-flex tw-justify-center">
            <img
              :src="vehicleType === VehicleType.waterCraft ? boatImg : carImg"
              alt=""
              class="tw-h-11"
            />
          </div>
        </div>
        <div class="tw-grid tw-grid-cols-3 tw-gap-1 tw-gap-y-4">
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

      <div
        class="tw-grid tw-grid-cols-3 tw-gap-y-6 tw-border-t tw-border-[#d7d7d7] tw-pt-4"
      >
        <div v-for="(el, index) in amounts" :key="index">
          <span class="tw-text-10px tw-font-avenir-medium">
            {{ el.key }}
          </span>
          <span
            class="tw-text-22px tw-block tw-text-primary-500 tw-font-avenir-medium"
          >
            {{ el.value }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VehicleType } from "@/types/vehicleLoan.type";
import useGetVehicleLoanPopulated from "@/utils/composables/API/vehicle-loan/useGetVehicleLoanPopulated";
import { computed } from "vue";
import boatImg from "/assets/vehicle-loan/boat.png";
import carImg from "/assets/vehicle-loan/car.png";

const { data } = useGetVehicleLoanPopulated();
const vehicleDetails = computed(() => data?.value?.vehicleLoanDetails);
const trailerDetails = computed(() => data?.value?.trailerDetails);

const vehicleLoanDetails = computed(() => data?.value?.vehicleLoanDetails);
const vehicleSubType = computed(
  () => vehicleLoanDetails?.value?.vehicleSubType
);
const vehicleType = computed(() => vehicleLoanDetails?.value?.vehicleType);

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
  let d = [
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
  if (vehicleType?.value === VehicleType.waterCraft) {
    d.push({
      key: "Trailer",
      value: trailerDetails?.value?.trailer || "XXX",
    });
    d.push({
      key: "Engine",
      value: engineDetails?.value?.engine || "XXX",
    });
  }

  return d;
});

const amounts = computed(() => [
  {
    key: "Total Cost",
    value:
      "$" +
      (vehicleLoanDetails?.value?.saleDetails?.totalPurchaseAmount || "50,000"),
  },
  {
    key: "Trade In Amount",
    value: "$10,000",
  },
  {
    key: "Deposit Paid",
    value: "$50,000",
  },
]);
</script>

<style></style>
