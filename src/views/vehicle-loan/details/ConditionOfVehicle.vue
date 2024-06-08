<template>
  <div>
    <h3 class="tw-text-left tw-mb-5">
      What condition is the
      {{ vehicleDetails.categoryOfVehicle || vehicleType || "{VehicleType}" }}
      in?
    </h3>
    <form @submit.prevent="handleMutate()" class="md:tw-gap-4 lg:tw-mb-20">
      <RadioButtons
        v-model="condition"
        :options="options"
        containerClasses="  md:tw-gap-4   "
        className=" tw-h-19.5 md:tw-h-32 "
      />

      <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
        <CustomButton
          title="Next"
          class="tw-w-full tw-max-w-xs"
          :is-disabled="v$.$invalid"
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
  </div>
</template>

<script setup lang="ts">
import RadioButtons from "@/components/form/RadioButtons.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, ref, watch, type Ref } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import CustomButton from "@/components/CustomButton.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import useVehicleStore from "@/stores/useVehicleStore";
import vehicleLoan from "@/utils/route-names/routeNameVehicleLoan";
import useGetVehicleLoan from "@/utils/composables/API/vehicle-loan/useGetVehicleLoan";
import useUpdateVehicleLoan from "@/utils/composables/API/vehicle-loan/useUpdateVehicleLoan";

const { data } = useGetVehicleLoan();

const vehicleType = computed(() => {
  return data?.value?.vehicleType;
});
const loanPurpose = computed(() => {
  return data?.value?.loanPurpose;
});
const { vehicleDetails } = useVehicleStore();

const condition: Ref<typeof options[number]> = ref();
const options = ["New", "Used", "Demo", "Renovated"];
const router = useRouter();

const route = useRoute();

const validations = computed(() => ({
  condition: { required },
}));

const v$ = useVuelidate(validations, { condition });

const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const handleNextClick = () => {
  if (
    vehicleDetails.categoryOfVehicle === "Motor Vehicle" ||
    vehicleType.value === "Motor Vehicle"
  ) {
    if (condition.value != "New") {
      router.push({ name: vehicleLoan.vehicleDetails.registrationNo });
      return;
    }
    router.push(nextNavigation.value);
  } else {
    if (vehicleDetails.typeOfVehicle === "Boat") {
      router.push({ name: vehicleLoan.vehicleDetails.boatDetails.aboutBoat });
    } else {
      router.push({
        name: vehicleLoan.vehicleDetails.boatDetails.aboutWaterCraft,
      });
    }
  }
};

const { mutate } = useUpdateVehicleLoan();

const handleMutate = () => {
  mutate(
    {
      vehicleCondition: condition.value,
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
