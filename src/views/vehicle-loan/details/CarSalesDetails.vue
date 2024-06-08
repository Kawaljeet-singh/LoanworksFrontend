<template>
  <div>
    <form @submit.prevent="handleMutate()" class="md:tw-gap-4 lg:tw-mb-20">
      <div class="tw-grid md:tw-grid-cols-2 md:tw-gap-8 md:tw-gap-y-0">
        <CustomInput
          v-model.number="v$.invoiceNo.$model"
          :v="v$.invoiceNo"
          className="!tw-text-left"
          class="tw-mb-1"
          type="number"
          name="Invoice Number"
          placeholder="Enter Invoice Number"
        />
        <CustomInput
          v-model.number="v$.tradeInAmount.$model"
          :v="v$.tradeInAmount"
          className="!tw-text-left"
          class="tw-mb-1"
          type="number"
          name="Vehicle + Accessories Price Inc GST "
          placeholder="50,000"
          icon="fa-dollar-sign"
        />
        <CustomInput
          v-model.number="v$.gstAmount.$model"
          :v="v$.gstAmount"
          className="!tw-text-left"
          class="tw-mb-1"
          name="GST Amount "
          type="number"
          placeholder="0.0"
          icon="fa-dollar-sign"
        />
        <CustomInput
          v-model.number="v$.onRoadCost.$model"
          :v="v$.onRoadCost"
          className="!tw-text-left"
          class="tw-mb-1"
          name="On Road Costs "
          type="number"
          placeholder="50,000"
          icon="fa-dollar-sign"
        />
        <CustomInput
          v-model.number="v$.luxuryCarTax.$model"
          :v="v$.luxuryCarTax"
          className="!tw-text-left"
          class="tw-mb-1"
          name="Luxury Car Tax "
          type="number"
          placeholder="50,000"
          icon="fa-dollar-sign"
        />
        <CustomInput
          v-model.number="v$.stampDuty.$model"
          :v="v$.stampDuty"
          className="!tw-text-left"
          class="tw-mb-1"
          name="Stamp Duty "
          type="number"
          placeholder="50,000"
          icon="fa-dollar-sign"
        />
        <CustomInput
          v-model.number="v$.tradeInAmount.$model"
          :v="v$.tradeInAmount"
          className="!tw-text-left"
          class="tw-mb-1"
          name="Trade in Amount"
          type="number"
          placeholder="50,000"
          icon="fa-dollar-sign"
        />
        <CustomInput
          v-model.number="v$.depositPaid.$model"
          :v="v$.depositPaid"
          className="!tw-text-left"
          class="tw-mb-1"
          name="Deposit Paid"
          type="number"
          placeholder="50,000"
          icon="fa-dollar-sign"
        />
        <CustomInput
          v-model.number="v$.loanAmountRequired.$model"
          :v="v$.loanAmountRequired"
          className="!tw-text-left"
          class="tw-mb-1"
          name="Loan Amount Required"
          type="number"
          placeholder="50,000"
          icon="fa-dollar-sign"
        />
        <div
          class="tw-py-4 tw-px-5 tw-mt-3 tw-flex tw-items-center tw-justify-between tw-bg-primary-500"
        >
          <div
            class="tw-text-white tw-text-sm tw-font-medium tw-font-avenir-medium"
          >
            Total Purchase Amount
          </div>
          <div
            class="tw-text-white tw-font-bold tw-text-xl tw-font-avenir-medium"
          >
            ${{ totalPurchaseAmount || 0 }}
          </div>
        </div>
      </div>

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
  </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import CustomInput from "@/components/form/CustomInput.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import useUpdateCarDetails from "@/utils/composables/API/vehicle-loan/car-details/useUpdateCarDetails";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, reactive } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";

const formValue = reactive({
  invoiceNo: "",
  gstAmount: "",
  stampDuty: "",
  luxuryCarTax: "",
  onRoadCost: "",
  tradeInAmount: "",
  depositPaid: "",
  loanAmountRequired: "",
});

const router = useRouter();

const route = useRoute();

const validations = computed(() => ({
  invoiceNo: { required },
  gstAmount: { required },
  stampDuty: { required },
  luxuryCarTax: { required },
  onRoadCost: { required },
  tradeInAmount: { required },
  depositPaid: { required },
  loanAmountRequired: { required },
}));

const v$ = useVuelidate(validations, formValue);

const nextNavigation = computed(() => {
  return {
    name: route.meta.nextNavigation as RouteRecordName,
  };
});

const totalPurchaseAmount = computed(() =>
  Number(
    Number(formValue.stampDuty) +
      Number(formValue.luxuryCarTax) +
      Number(formValue.onRoadCost) +
      Number(formValue.tradeInAmount) +
      Number(formValue.depositPaid) +
      Number(formValue.loanAmountRequired)
  )
);

const handleNextClick = () => {
  router.push(nextNavigation.value);
};

const { mutate } = useUpdateCarDetails();

const handleMutate = () => {
  mutate(
    {
      invoiceNumber: Number(formValue.invoiceNo),
      gstAmount: Number(formValue.gstAmount),
      luxuryCarTax: Number(formValue.luxuryCarTax),
      onRoadCost: Number(formValue.onRoadCost),
      stampDuty: Number(formValue.stampDuty),
      tradeInAmount: Number(formValue.tradeInAmount),
      depositPaidAmount: Number(formValue.depositPaid),
      totalPurchaseAmount: totalPurchaseAmount.value,
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
