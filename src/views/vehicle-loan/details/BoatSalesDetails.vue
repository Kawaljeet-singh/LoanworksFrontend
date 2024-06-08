<template>
  <div>
    <form @submit.prevent="handleNextClick()" class="md:tw-gap-4 lg:tw-mb-20">
      <div class="tw-grid md:tw-grid-cols-2 md:tw-gap-8 md:tw-gap-y-0">
        <CustomInput
          v-model="v$.invoiceNo.$model"
          :v="v$.invoiceNo"
          className="!tw-text-left"
          class="tw-mb-1"
          name="Invoice Number"
          placeholder="Enter Invoice Number"
        />
        <CustomInput
          v-model="v$.purchaseAmount.$model"
          :v="v$.purchaseAmount"
          className="!tw-text-left"
          type="number"
          class="tw-mb-1"
          name="Total Purchase Amount Inc GST "
          placeholder="50,000"
          icon="fa-dollar-sign"
        />
        <CustomInput
          v-model="v$.gstAmount.$model"
          :v="v$.gstAmount"
          className="!tw-text-left"
          class="tw-mb-1"
          name="GST Amount "
          type="number"
          placeholder="0.0"
          icon="fa-dollar-sign"
        />
        <CustomInput
          v-model="v$.stamDuty.$model"
          :v="v$.stamDuty"
          className="!tw-text-left"
          class="tw-mb-1"
          name="Stamp Duty "
          placeholder="50,000"
          type="number"
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
            ${{ total || 0 }}
          </div>
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
import useGetWatercraftSaleDetails from "@/utils/composables/API/vehicle-loan/sale-details/useGetWatercraftSaleDetails";
import useUpdateSalesDetails from "@/utils/composables/API/vehicle-loan/sale-details/useUpdateSalesDetails";
import useVuelidate from "@vuelidate/core";
import { numeric, required } from "@vuelidate/validators";
import { computed, reactive, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";

const formValue = reactive({
  invoiceNo: "",
  gstAmount: "",
  purchaseAmount: null,
  stamDuty: "",
});

const total = computed(
  () =>
    Number(formValue.gstAmount) +
    Number(formValue.purchaseAmount) +
    Number(formValue.stamDuty)
);
const router = useRouter();

const route = useRoute();

const validations = computed(() => ({
  invoiceNo: { required },
  gstAmount: { required, numeric },
  purchaseAmount: { required, numeric },
  stamDuty: { required, numeric },
}));

const v$ = useVuelidate(validations, formValue);

const nextNavigation = computed(() => {
  return {
    name: route.meta.nextNavigation as RouteRecordName,
  };
});

const { data, isSuccess } = useGetWatercraftSaleDetails();

watch(
  data,
  () => {
    if (isSuccess && data?.value) {
      const { invoiceNumber, gstAmount, stampDuty, totalPurchaseAmount } =
        data.value;

      formValue.invoiceNo = invoiceNumber;
      formValue.gstAmount = gstAmount;
      formValue.stamDuty = stampDuty;
      formValue.purchaseAmount = Number(
        totalPurchaseAmount - stampDuty - gstAmount
      );
    }
  },
  { immediate: true }
);

const { mutate } = useUpdateSalesDetails();

const handleNextClick = () => {
  mutate(
    {
      invoiceNumber: Number(formValue.invoiceNo),
      gstAmount: Number(formValue.gstAmount),
      stampDuty: Number(formValue.stamDuty),
      totalPurchaseAmount: total.value,
    },
    {
      onSuccess() {
        router.push(nextNavigation.value);
      },
    }
  );
};
</script>

<style scoped></style>
