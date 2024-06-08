<template>
  <form @submit.prevent="handleMutate()" class="md:tw-gap-4 lg:tw-mb-20">
    <RadioButtons
      v-model="typeOfVehicle"
      :options="options"
      containerClasses="  md:tw-gap-4 "
      className=" tw-h-19.5 md:tw-h-32 "
    />

    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :isDisabled="false"
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
import RadioButtons from "@/components/form/RadioButtons.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, ref, type Ref } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import CustomButton from "../../components/CustomButton.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import useVehicleStore from "@/stores/useVehicleStore";
import type { TypeOfWaterVehicle } from "@/stores/useVehicleStore";
import useUpdateWaterCraftDetails from "@/utils/composables/API/vehicle-loan/watercraft-details/useUpdateWaterCraftDetails";
import useUpdateVehicleLoan from "@/utils/composables/API/vehicle-loan/useUpdateVehicleLoan";
const { vehicleDetails, setByName } = useVehicleStore();
const options = [
  "Boat",
  "Marine Motor",
  "Personal Water Craft",
  "Marine Trailer",
];

const typeOfVehicle: Ref = ref(vehicleDetails.typeOfVehicle);

const router = useRouter();

const route = useRoute();

const validations = computed(() => ({
  typeOfVehicle: { required },
}));

const v$ = useVuelidate(validations, { typeOfVehicle });

const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const handleNextClick = () => {
  setByName("typeOfVehicle", typeOfVehicle.value as TypeOfWaterVehicle);
  router.push(nextNavigation.value);
};

const { mutate } = useUpdateVehicleLoan();

const handleMutate = () => {
  mutate(
    {
      vehicleSubType: typeOfVehicle.value,
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
