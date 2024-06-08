<template>
  <div>
    <p>Business details must match what is on the invoice.</p>
    <form @submit.prevent="handleMutate()" class="md:tw-gap-4 lg:tw-mb-20">
      <div class="tw-grid md:tw-grid-cols-2 md:tw-gap-8 md:tw-gap-y-0">
        <CustomInput
          v-model="v$.name.$model"
          :v="v$.name"
          className="!tw-text-left"
          class="tw-mb-1"
          name="Buisness name"
          placeholder="Enter Business’ Name..."
        />
        <CustomInput
          v-model="v$.abn.$model"
          :v="v$.abn"
          className="!tw-text-left"
          class="tw-mb-1"
          name="Business ABN"
          placeholder="Enter Business’ Name..."
        />
        <AddressSelect
          v-model="v$.address.$model"
          name="Address"
          placeholder="Enter your address"
        />
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
import AddressSelect from "@/components/form/AddressSelect.vue";
import CustomInput from "@/components/form/CustomInput.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import useVehicleStore from "@/stores/useVehicleStore";
import { axiosThirdParty } from "@/utils/axiosInstance";
import useUpdateSupplierDetails from "@/utils/composables/API/vehicle-loan/supplier-details/useUpdateSupplierDetails";
import useGetVehicleLoan from "@/utils/composables/API/vehicle-loan/useGetVehicleLoan";
import vehicleLoan from "@/utils/route-names/routeNameVehicleLoan";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, reactive } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";

const { data } = useGetVehicleLoan();

const vehicleType = computed(() => {
  return data?.value?.vehicleType;
});

const { vehicleDetails } = useVehicleStore();
const formValue = reactive({
  name: "",
  abn: "",
  address: "",
});

const router = useRouter();

const route = useRoute();

const validations = computed(() => ({
  name: { required },
  abn: { required },
  address: { required },
}));

const v$ = useVuelidate(validations, formValue);

const handleNextClick = () => {
  if (
    vehicleDetails.categoryOfVehicle === "Motor Vehicle" ||
    vehicleType.value === "Motor Vehicle"
  ) {
    router.push({ name: vehicleLoan.vehicleDetails.salesDetailsCar });
  } else {
    router.push({ name: vehicleLoan.vehicleDetails.salesDetailsBoat });
  }
};

const { mutate } = useUpdateSupplierDetails();
const bussinessABN = (payload: {
  abn: string;
  businessName: string;
  state: string;
  postCode: number;
}) => axiosThirdParty.post(`/business/abn/validate`, payload);

const handleMutate = () => {
  bussinessABN({
    abn: formValue.abn,
    businessName: formValue.name,
    state: "string",
    postCode: 0,
  });
  mutate(
    {
      bussinessABN: formValue.abn,
      bussinessName: formValue.name,
      supplierAddress: formValue.address,
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
