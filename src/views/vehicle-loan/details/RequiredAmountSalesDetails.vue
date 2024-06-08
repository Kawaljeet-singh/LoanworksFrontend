<template>
  <div>
    <form @submit.prevent="handleNextClick" class="md:tw-gap-4 lg:tw-mb-20">
      <div class="tw-grid md:tw-grid-cols-2 md:tw-gap-8 md:tw-gap-y-0">
        <CustomInput
          v-model="v$.depositPaidAmount.$model"
          :v="v$.depositPaidAmount"
          className="!tw-text-left"
          class="tw-mb-1"
          name="Deposit Paid "
          placeholder="0.0"
          icon="fa-dollar-sign"
        />
        <CustomInput
          v-model="v$.tradeInAmount.$model"
          :v="v$.tradeInAmount"
          className="!tw-text-left"
          class="tw-mb-1"
          name="Trade In Amount "
          placeholder="50,000"
          icon="fa-dollar-sign"
        />

        <div
          class="tw-py-4 tw-px-5 tw-mt-3 tw-flex tw-items-center tw-justify-between tw-bg-primary-500"
        >
          <div
            class="tw-text-white tw-text-sm tw-font-medium tw-font-avenir-medium"
          >
            Loan Amount Required
          </div>
          <div
            class="tw-text-white tw-font-bold tw-text-xl tw-font-avenir-medium"
          >
            ${{ totalAmount || 0 }}
          </div>
        </div>

        <div
          v-if="
            formValue.depositPaidAmount &&
            totalAmount != dataVehicle?.requestedAmount
          "
          class="tw-text-red-500 tw-mt-7 md:tw-mt-0"
        >
          {{ dataPersonal?.[0]?.firstName || "Hey" }}, the required loan amount
          doesn’t match the amount you said you needed. We will base our
          assessment on the required loan amount.
        </div>
      </div>

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
  </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import CustomInput from "@/components/form/CustomInput.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import useVehicleStore from "@/stores/useVehicleStore";
import useGetPersonalDetails from "@/utils/composables/API/personal-details/useGetPersonalDetails";
import useGetWatercraftSaleDetails from "@/utils/composables/API/vehicle-loan/sale-details/useGetWatercraftSaleDetails";
import useUpdateSalesDetails from "@/utils/composables/API/vehicle-loan/sale-details/useUpdateSalesDetails";
import useGetVehicleLoan from "@/utils/composables/API/vehicle-loan/useGetVehicleLoan";
import vehicleLoan from "@/utils/route-names/routeNameVehicleLoan";
import useVuelidate from "@vuelidate/core";
import { required, numeric } from "@vuelidate/validators";
import { computed, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const { vehicleDetails } = useVehicleStore();
const { data: dataVehicle } = useGetVehicleLoan();
const { data: dataPersonal } = useGetPersonalDetails(
  reactive({
    isFirstPerson: 1,
  })
);
const formValue = reactive({
  depositPaidAmount: "",
  tradeInAmount: "",
});

const router = useRouter();

const route = useRoute();

const validations = computed(() => ({
  depositPaidAmount: { required, numeric },
  tradeInAmount: { required, numeric },
}));

const v$ = useVuelidate(validations, formValue);

const totalAmount = computed(() => {
  return Number(formValue.depositPaidAmount) + Number(formValue.tradeInAmount);
});

const { data, isSuccess } = useGetWatercraftSaleDetails();

watch(
  data,
  () => {
    if (isSuccess && data?.value) {
      const { depositPaidAmount, tradeInAmount } = data.value;

      formValue.depositPaidAmount = depositPaidAmount;
      formValue.tradeInAmount = tradeInAmount;
    }
  },
  { immediate: true }
);

const { mutate } = useUpdateSalesDetails();
const handleNextClick = () => {
  mutate(
    {
      depositPaidAmount: Number(formValue.depositPaidAmount),
      tradeInAmount: Number(formValue.tradeInAmount),
    },
    {
      onSuccess() {
        if (vehicleDetails.categoryOfVehicle === "Motor Vehicle") {
          router.push({
            name: vehicleLoan.vehicleDetails.motorVehicleConfirmation,
          });
        } else {
          router.push({
            name: vehicleLoan.vehicleDetails.waterCraftConfirmation,
          });
        }
      },
    }
  );
};
</script>

<style scoped></style>
