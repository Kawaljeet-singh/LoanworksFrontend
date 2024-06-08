<template>
  <div>
    <form @submit.prevent="handleMutate" class="md:tw-gap-4 lg:tw-mb-20">
      <div
        class="tw-grid md:tw-grid-cols-2 md:tw-gap-8 lg:tw-gap-x-13 md:tw-gap-y-1"
      >
        <CustomInput
          v-model="v$.currentLender.$model"
          :v="v$.currentLender"
          className="!tw-text-left"
          class="tw-mb-1"
          name="Current Lender "
          placeholder="Enter Lender"
        />
        <CustomInput
          v-model="v$.currentRate.$model"
          :v="v$.currentRate"
          className="!tw-text-left"
          class="tw-mb-1 tw-w-30"
          name="Current Rate "
          placeholder="3.9%"
        />
        <CustomInput
          v-model="v$.totalLoanLimit.$model"
          :v="v$.totalLoanLimit"
          className="!tw-text-left"
          class="tw-mb-1"
          name="Total Loan Limit "
          placeholder="50,000"
          icon="fa-dollar-sign"
        />
        <CustomInput
          placeholder=""
          :model-value="currentLoanAmount"
          type="number"
          className="!tw-text-left"
          icon="fa-dollar-sign"
          name="Current Loan Balance"
        />
        <!-- <div
          class="tw-py-4 tw-px-5 tw-flex tw-items-center tw-justify-between tw-bg-primary-500 tw-mb-1 tw-mt-7"
        >
          <div
            class="tw-text-white tw-text-sm tw-font-medium tw-font-avenir-medium"
          >
            Current Loan Amount
          </div>
          <div
            class="tw-text-white tw-font-bold tw-text-xl tw-font-avenir-medium"
          >
            ${{ currentLoanAmount || 0 }}
          </div>
        </div> -->
      </div>

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
  </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import CustomInput from "@/components/form/CustomInput.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import useVehicleStore from "@/stores/useVehicleStore";
import useGetVehicleLoan from "@/utils/composables/API/vehicle-loan/useGetVehicleLoan";
import useUpdateVehicleLoan from "@/utils/composables/API/vehicle-loan/useUpdateVehicleLoan";
import vehicleLoan from "@/utils/route-names/routeNameVehicleLoan";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const { vehicleDetails } = useVehicleStore();

const formValue = reactive({
  currentLender: "",
  currentRate: "",
  totalLoanLimit: "",
});

const router = useRouter();

const route = useRoute();

const validations = computed(() => ({
  currentLender: { required },
  currentRate: { required },
  totalLoanLimit: { required },
}));

const v$ = useVuelidate(validations, formValue);

const { data } = useGetVehicleLoan();
const currentLoanAmount = computed(() => 90000);

watch(
  [data],
  ([d]) => {
    if (!d) return;
    const newData = d;
    if (newData) {
      formValue.currentLender = newData.currentLender;
      formValue.currentRate = newData.currentRate;
      formValue.totalLoanLimit = newData.totalLoanLimit;
    }
  },
  { immediate: true }
);

const vehicleType = computed(() => {
  return data?.value?.vehicleType;
});

const handleNextClick = () => {
  if (
    vehicleDetails.categoryOfVehicle === "Motor Vehicle" ||
    vehicleType.value === "Motor Vehicle"
  ) {
    router.push({ name: vehicleLoan.vehicleDetails.motorVehicleConfirmation });
  } else {
    router.push({ name: vehicleLoan.vehicleDetails.waterCraftConfirmation });
  }
};

const { mutate } = useUpdateVehicleLoan();

const handleMutate = () => {
  mutate(
    {
      currentLender: formValue.currentLender,
      currentRate: Number(formValue.currentRate),
      totalLoanLimit: Number(formValue.totalLoanLimit),
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
