<template>
  <form @submit.prevent="handleNextClick" class="md:tw-gap-4 lg:tw-mb-20">
    <RadioButtons
      v-model="type"
      :options="options"
      containerClasses="  md:tw-gap-4 "
      className=" tw-h-19.5 md:tw-h-32 "
    />

    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :isDisabled="false"
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
import RadioButtons from "@/components/form/RadioButtons.vue";

import TheFooter from "@/components/global/TheFooter.vue";
import useVehicleStore from "@/stores/useVehicleStore";
import useMutateApplication from "@/utils/composables/API/useMutateApplication";
import useUpdateVehicleLoan from "@/utils/composables/API/vehicle-loan/useUpdateVehicleLoan";
import LOAN_TYPE from "@/utils/LoanTypes";
import routeNames from "@/utils/route-names/routeName";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { storeToRefs } from "pinia";
import { computed, ref, type Ref } from "vue";
import { useRouter, type RouteRecordName } from "vue-router";
import CustomButton from "../../components/CustomButton.vue";
const { vehicleDetails } = storeToRefs(useVehicleStore());

const options = ["Motor Vehicle", "Water Craft"];
type Options = "Motor Vehicle" | "Water Craft" | "";
const type: Ref<Options> = ref(vehicleDetails.value.categoryOfVehicle);

const router = useRouter();
const { setByName } = useVehicleStore();

const validations = computed(() => ({
  type: { required },
}));

const v$ = useVuelidate(validations, { type });

const navigateTo = ref({ name: "" as RouteRecordName });

const { mutate: mutateApplication } = useMutateApplication();

const handleNextClick = () => {
  setByName("categoryOfVehicle", type.value);
  switch (type.value) {
    case options[0]:
      navigateTo.value.name = routeNames.vehicleLoan.type.typeMotorVehicle;

      break;
    case options[1]:
      navigateTo.value.name = routeNames.vehicleLoan.type.typeWaterCraft;

      break;

    default:
      navigateTo.value.name = "";
      break;
  }

  router.push(navigateTo.value);
};

const { mutate } = useUpdateVehicleLoan();

const handleMutate = () => {
  mutateApplication({ applicationType: LOAN_TYPE.VEHICLE_LOAN });
  mutate(
    {
      vehicleType: type.value,
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
