<template>
  <form @submit.prevent="handleMutate" class="">
    <div class="tw-flex tw-justify-center tw-items-center">
      <div class="tw-max-w-sm tw-w-full tw-flex">
        <CustomInputVue
          placeholder="70,000"
          v-model.number="v$.kilometers.$model"
          type="number"
          className=" "
          class="tw-w-full"
          :v="v$.kilometers"
        />
        <div class="tw-ml-5 tw-flex tw-items-center tw-pb-5">Kms</div>
      </div>
    </div>

    <div class="tw-mt-5 md:tw-mt-18 tw-flex tw-item tw-justify-center">
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :isDisabled="v$.$invalid"
        @onClick="handleMutate()"
        :showArrow="true"
      />
    </div>
    <teleport to="#the-footer">
      <TheFooter
        :is-disabled="v$.$invalid"
        :navigate-to="true"
        @handle-next-click="handleMutate"
      />
    </teleport>
  </form>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import CustomInputVue from "@/components/form/CustomInput.vue";
import router from "@/router";
import useVehicleStore from "@/stores/useVehicleStore";
import useGetCarDetails from "@/utils/composables/API/vehicle-loan/car-details/useGetCarDetails";
import useUpdateCarDetails from "@/utils/composables/API/vehicle-loan/car-details/useUpdateCarDetails";
import useGetVehicleLoan from "@/utils/composables/API/vehicle-loan/useGetVehicleLoan";
import vehicleLoan from "@/utils/route-names/routeNameVehicleLoan";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { computed, ref, watch } from "vue";
import { useRoute, type RouteRecordName } from "vue-router";
import TheFooter from "../../../components/global/TheFooter.vue";
const { vehicleDetails } = useVehicleStore();
const route = useRoute();

const kilometers = ref<number>();

const validations = {
  kilometers: {
    required: helpers.withMessage("Value is required", required),
  },
};

const v$ = useVuelidate(validations, { kilometers });

const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const { data: oldData } = useGetCarDetails();
const { data: dataVehicleApp } = useGetVehicleLoan();

watch(
  [oldData],
  ([d]) => {
    if (!d) return;
    const newData = d;
    if (newData) {
      kilometers.value = newData.travelledDistance;
    }
  },
  { immediate: true }
);

const handleNextClick = async () => {
  switch (dataVehicleApp?.value?.vehicleType) {
    case "Passenger Vehicle":
    case "Light Commercial":
      router.push({
        name: vehicleLoan.vehicleDetails.motorVehicle.vehicleOptions,
      });
      break;
    case "Heavy Commercial":
    case "Motor Cycle":
      router.push({
        name: vehicleLoan.vehicleDetails.motorVehicle.reviewVehicleDetails,
      });
      break;

    default:
      router.push(nextNavigation.value);
      break;
  }
};

const { mutate } = useUpdateCarDetails();

const handleMutate = () => {
  mutate(
    {
      travelledDistance: kilometers.value,
    },
    {
      onSuccess() {
        handleNextClick();
      },
    }
  );
};
</script>

<style scoped></style>
