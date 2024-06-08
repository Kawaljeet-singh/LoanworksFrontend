<template>
  <form @submit.prevent="handleMutate" class="md:tw-gap-4 lg:tw-mb-20">
    <div class="tw-grid tw-gap-2.5 md:tw-gap-10 md:tw-grid-cols-2">
      <div>
        <QuasaraSelect
          name="Year of manufacture"
          :options="data"
          placeholder="YYYY"
          v-model="formValue.year"
          hide-icon
          disable-search
        />
      </div>
      <div>
        <QuasaraSelect
          name="Make"
          :options="makeOptions"
          option-label="name"
          option-value="code"
          placeholder="Select Make"
          v-model="formValue.make"
          hide-icon
          :is-disabled="!formValue.year"
          disable-search
        />
      </div>
      <div>
        <QuasaraSelect
          name="Model"
          :options="modelOptions"
          placeholder="Select Model"
          option-label="name"
          v-model="formValue.model"
          hide-icon
          :is-disabled="!formValue.make"
          disable-search
        />
      </div>
      <div>
        <QuasaraSelect
          name="Variant"
          option-label="name"
          :options="varientOptions"
          placeholder="Select Variant"
          v-model="formValue.variant"
          :is-disabled="!formValue.model"
          disable-search
          hide-icon
        />
      </div>

      <div>
        <QuasaraSelect
          name="Vehicle"
          option-label="modelName"
          :options="vehicleOptions"
          placeholder="Select Vehicle"
          v-model="formValue.vehicle"
          hide-icon
          :is-disabled="!formValue.variant"
          disable-search
        />
      </div>
      <div class="tw-flex tw-justify-center">
        <img :src="carImg" alt="" class="tw-max-h-24" />
      </div>
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
import QuasaraSelect from "@/components/form/QuasaraSelect.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import { axiosThirdParty } from "@/utils/axiosInstance";
import useGetYears from "@/utils/composables/API/third-party/vehicle/useGetYears";
import useGetCarDetails from "@/utils/composables/API/vehicle-loan/car-details/useGetCarDetails";
import useUpdateCarDetails from "@/utils/composables/API/vehicle-loan/car-details/useUpdateCarDetails";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, reactive, ref, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import carImg from "/assets/vehicle-loan/car.png";
import useGetVehicleLoan from "@/utils/composables/API/vehicle-loan/useGetVehicleLoan";
import vehicleLoan from "@/utils/route-names/routeNameVehicleLoan";
type formType = {
  year: string;
  make:
    | {
        code: string;
        name: string;
      }
    | "";
  model:
    | {
        code: string;
        name: string;
      }
    | "";
  variant:
    | {
        name: string;
      }
    | "";
  vehicle:
    | {
        modelName: string;
        nvicCur: string;
        nvicModel: string;
      }
    | "";
};

const formValue = reactive<formType>({
  year: "",
  make: "",
  model: "",
  variant: "",
  vehicle: "",
});
const makeOptions = ref([]);
const modelOptions = ref([]);
const varientOptions = ref([]);
const vehicleOptions = ref([]);

const { data } = useGetYears("cars");

const getMakes = async (year: string) => {
  const res = await axiosThirdParty.get(`/vehicles/cars/makes`, {
    params: { year: year },
  });
  makeOptions.value = res.data;
  return res.data;
};
const getModel = async (params: unknown) => {
  const res = await axiosThirdParty.get(`/vehicles/cars/models`, {
    params,
  });
  modelOptions.value = res.data;
  return res.data;
};
const getVarient = async (params: unknown) => {
  const res = await axiosThirdParty.get(`/vehicles/cars/variants`, {
    params,
  });
  varientOptions.value = res.data;
  return res.data;
};
const getVehicle = async (params: unknown) => {
  const res = await axiosThirdParty.get(`/vehicles/cars/nvic`, {
    params,
  });
  vehicleOptions.value = res.data;
  return res.data;
};

watch(
  () => formValue.year,
  () => {
    getMakes(formValue.year);
    formValue.make = "";
    formValue.model = "";
    formValue.variant = "";
    formValue.vehicle = "";
  }
);
watch(
  () => formValue.make,
  () => {
    if (formValue.make)
      getModel({ year: formValue.year, makeCode: formValue.make.code });
    formValue.model = "";
    formValue.variant = "";
    formValue.vehicle = "";
  }
);
watch(
  () => formValue.model,
  () => {
    if (formValue.model && formValue.make)
      getVarient({
        year: formValue.year,
        makeCode: formValue.make.code,
        modelCode: formValue.model.code,
      });
    formValue.variant = "";
    formValue.vehicle = "";
  }
);
watch(
  () => formValue.variant,
  () => {
    if (formValue.model && formValue.make && formValue.variant)
      getVehicle({
        year: formValue.year,
        makeCode: formValue.make.code,
        modelCode: formValue.model.code,
        variant: formValue.variant.name,
      });
    formValue.vehicle = "";
  }
);

const validations = computed(() => ({
  year: { required },
  make: {
    code: {
      required,
    },
  },
  model: {
    code: {
      required,
    },
  },
  variant: { name: { required } },
  vehicle: { modelName: { required } },
}));

const v$ = useVuelidate(validations, formValue);

const router = useRouter();
const route = useRoute();
const { data: vehicleData } = useGetVehicleLoan();

const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const handleNextClick = () => {
  if (
    ["Motor Cycle", "Caravan", "Heavy Commercial"].includes(
      vehicleData.value.vehicleSubType
    )
  ) {
    router.push({
      name: vehicleLoan.vehicleDetails.motorVehicle
        .reviewVehicleDetails as RouteRecordName,
    });
  } else {
    router.push(nextNavigation.value);
  }
};

const { mutate } = useUpdateCarDetails();
const { data: OldData } = useGetCarDetails();

const handleMutate = () => {
  if (
    formValue.make &&
    formValue.model &&
    formValue.variant &&
    formValue.vehicle
  )
    mutate(
      {
        yearOfManufacture: new Date(formValue.year).toISOString(),
        make: formValue.make.code,
        model: formValue.model.code,
        varient: formValue.variant.name,
        car: formValue.vehicle.modelName,
      },
      {
        onSuccess() {
          handleNextClick();
        },
      }
    );
};
</script>

<style></style>
