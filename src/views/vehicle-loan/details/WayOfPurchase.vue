<template>
  <form @submit.prevent="handleNextClick()" class="md:tw-gap-4 lg:tw-mb-20">
    <RadioButtons
      v-model="wayOfPurchase"
      :options="options"
      containerClasses="  md:tw-gap-4 "
      className=" tw-h-19.5 md:tw-h-32 "
    />

    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :isDisabled="false"
        @onClick="handleNextClick()"
        :showArrow="true"
      />
    </div>
    <teleport to="#the-footer">
      <TheFooter
        :is-disabled="v$.$invalid"
        :navigate-to="true"
        @handle-next-click="handleNextClick"
      />
    </teleport>
  </form>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import RadioButtons from "@/components/form/RadioButtons.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import useVehicleStore from "@/stores/useVehicleStore";
import useGetVehicleLoan from "@/utils/composables/API/vehicle-loan/useGetVehicleLoan";
import vehicleLoan from "@/utils/route-names/routeNameVehicleLoan";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, ref, watch, type Ref } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
const { vehicleDetails } = useVehicleStore();

const wayOfPurchase: Ref<typeof options[number]> = ref();

const options = ["Licensed Dealer", "Private Sale"];

const router = useRouter();

const route = useRoute();

const validations = computed(() => ({
  wayOfPurchase: { required },
}));

const v$ = useVuelidate(validations, { wayOfPurchase });

const nextNavigation = computed(() => {
  return {
    name: route.meta.nextNavigation as RouteRecordName,
  };
});

const { data } = useGetVehicleLoan();

const vehicleType = computed(() => {
  return data?.value?.vehicleType;
});

const handleNextClick = () => {
  if (
    vehicleDetails.categoryOfVehicle === "Motor Vehicle" ||
    vehicleType.value === "Motor Vehicle"
  ) {
    if (wayOfPurchase.value === options[0]) {
      router.push({ name: vehicleLoan.vehicleDetails.supplierDetails });
    } else {
      router.push({ name: vehicleLoan.vehicleDetails.salesDetailsCar });
    }
  } else {
    if (wayOfPurchase.value === options[0]) {
      router.push({ name: vehicleLoan.vehicleDetails.supplierDetails });
    } else {
      router.push({ name: vehicleLoan.vehicleDetails.salesDetailsBoat });
    }
  }
};
</script>

<style scoped></style>
