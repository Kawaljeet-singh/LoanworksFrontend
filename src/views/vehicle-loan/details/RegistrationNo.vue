<template>
  <div>
    <form @submit.prevent="handleNextClick">
      <RadioButtons
        v-model="v$.isYes.$model"
        :options="options"
        containerClasses=" tw-py-6 "
        className="tw-h-20 "
      />
      <div
        :class="`tw-border-t  ${
          formValue.isYes === options[1]
            ? 'tw-opacity-100'
            : 'tw-opacity-0 tw-h-0'
        } tw-border-white tw-py-8 tw-transition-all  tw-duration-300  `"
      >
        <div class="tw-grid md:tw-grid-cols-2 tw-gap-7">
          <CustomInputVue
            :disabled="!!formValue.vinNo"
            name="Registration Number"
            placeholder="Enter your Registration Number..."
            className="tw-text-start"
            v-model="v$.registrationNo.$model"
            :v="v$.registrationNo"
          />

          <div>
            <span class="tw-mt-2.5 tw-font-medium tw-font-avenir-medium"
              >Registered State</span
            >
            <QuasaraSelect
              :isDisabled="!!formValue.vinNo"
              :options="STATES"
              option-label="name"
              emit-value
              option-value="abbreviation"
              placeholder="Select State"
              v-model="formValue.registrationState"
              hide-icon
            />
          </div>
        </div>

        <div class="tw-flex tw-items-center tw-justify-center tw-my-6">
          <span class="tw-bg-white tw-h-px tw-w-32"></span>
          <span class="tw-mx-9 tw-text-primary-500"> OR </span>
          <span class="tw-bg-white tw-h-px tw-w-32"></span>
        </div>

        <div class="tw-grid md:tw-grid-cols-2 tw-gap-7">
          <CustomInputVue
            :disabled="
              !!(formValue.registrationState || formValue.registrationNo)
            "
            name="What is vehicle's VIN number?"
            placeholder="Enter your VIN Number..."
            className="tw-text-start"
            v-model="v$.vinNo.$model"
            :v="v$.vinNo"
          />
        </div>
        <div class="tw-mt-9 tw-flex tw-item tw-justify-center">
          <CustomButton
            title="Verify Vehicle Registration"
            class="tw-w-full tw-max-w-xs"
            :is-disabled="v$.$invalid"
            @onClick="handleNextClick()"
            :showArrow="true"
          />
        </div>
      </div>

      <div
        class="tw-mt-9 tw-flex tw-item tw-justify-center tw-transition-all tw-duration-300"
        :class="`${
          formValue.isYes === options[0]
            ? 'tw-opacity-100 tw-h-full'
            : 'tw-opacity-0 tw-h-0'
        }`"
      >
        <CustomButton
          title="Next"
          class="tw-w-full tw-max-w-xs"
          :is-disabled="v$.$invalid"
          :showArrow="true"
        />
      </div>
      <teleport to="#the-footer">
        <TheFooter
          :navigate-to="true"
          :is-disabled="v$.$invalid"
          @handle-next-click="handleNextClick"
        />
      </teleport>
    </form>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import CustomInputVue from "@/components/form/CustomInput.vue";
import RadioButtons from "@/components/form/RadioButtons.vue";
import { computed } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import { required, requiredIf } from "@vuelidate/validators";

import QuasaraSelect from "@/components/form/QuasaraSelect.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import useVehicleStore from "@/stores/useVehicleStore";
import { axiosThirdParty } from "@/utils/axiosInstance";
import useGetCarDetails from "@/utils/composables/API/vehicle-loan/car-details/useGetCarDetails";
import useUpdateCarDetails from "@/utils/composables/API/vehicle-loan/car-details/useUpdateCarDetails";
import useGetVehicleLoan from "@/utils/composables/API/vehicle-loan/useGetVehicleLoan";
import { STATES } from "@/utils/constants";
import vehicleLoan from "@/utils/route-names/routeNameVehicleLoan";
import { reactive, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import { useToast } from "vue-toastification";
const { vehicleDetails } = useVehicleStore();
const formValue = reactive({
  isYes: "",
  registrationState: "",
  registrationNo: "",
  vinNo: "",
});

const options = ["No", "Yes"];

const validations = computed(() => ({
  isYes: { required },
  registrationState: {
    requiredIf: requiredIf(() => formValue.isYes === "Yes" && !formValue.vinNo),
    // maxValue: maxValue(maxLimit),
  },
  registrationNo: {
    requiredIf: requiredIf(
      () => formValue.isYes === "Yes" && !!formValue.registrationNo
    ),
  },
  vinNo: {
    requiredIf: requiredIf(
      () => formValue.isYes === "Yes" && !formValue.registrationNo
    ),
  },
}));
watch(formValue, () => {
  if (formValue.vinNo) {
    formValue.registrationNo = "";
    formValue.registrationState = "";
  }
  if (formValue.registrationNo || formValue.registrationState) {
    formValue.vinNo = "";
  }
});

const v$ = useVuelidate(validations, formValue);
const router = useRouter();
const route = useRoute();
const navigateTo = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const toast = useToast();
const getNVIC = (params: { regoPlate: string; regoState: string }) =>
  axiosThirdParty.get(`/vehicles/cars/nvic`, {
    params,
  });

const handleNextClick = () => {
  if (formValue.isYes === "No") {
    router.push({
      name: vehicleLoan.vehicleDetails.motorVehicle.aboutYourVehicle,
    });
    return;
  } else {
    getNVIC({
      regoPlate: formValue.registrationNo,
      regoState: formValue.registrationState,
    })
      .then((result) => {
        handleMutate();
      })
      .catch((err) => {
        toast.error("Vehicle Not Found");
      });
  }
  // router.push(navigateTo.value);
};

const { mutate } = useUpdateCarDetails();
const { data: oldData } = useGetCarDetails();
const { data: dataVehicleApp } = useGetVehicleLoan();

watch(
  [oldData],
  ([d]) => {
    if (!d) return;
    const newData = d;
    if (newData) {
      formValue.registrationState = newData.registeredState;
      formValue.registrationNo = newData.registrationNumber;
      formValue.vinNo = newData.vin;
      if (formValue.vinNo || formValue.registrationNo) {
        formValue.isYes = "Yes";
      }
      // setTitle(newData.firstName + " details");
    }
  },
  { immediate: true }
);

const handleMutate = () => {
  mutate(
    {
      registrationNumber: formValue.registrationNo,
      registeredState: formValue.registrationState,
      vin: formValue.vinNo,
    },
    {
      onSuccess() {
        switch (dataVehicleApp?.value?.vehicleType) {
          case "Caravan":
            router.push({
              name: vehicleLoan.vehicleDetails.motorVehicle
                .reviewVehicleDetails,
            });
            break;

          default:
            router.push({
              name: vehicleLoan.vehicleDetails.kilometersTravelled,
            });
            break;
        }
      },
    }
  );
};
</script>

<style scoped></style>
