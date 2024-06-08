<template>
  <form @submit.prevent="handleMutate" class="md:tw-gap-4 lg:tw-mb-20">
    <div class="tw-grid tw-gap-2.5 md:tw-gap-10 md:tw-grid-cols-2">
      <div>
        <QuasaraSelect
          name="Year of manufacture"
          :options="years"
          placeholder="YYYY"
          v-model="formValue.year"
          hide-icon
          disable-search
        />
      </div>
      <div>
        <QuasaraSelect
          option-label="name"
          name="Make"
          :options="makeOptions"
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
          option-label="name"
          :options="modelOptions"
          placeholder="Select Model"
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
          hide-icon
          :is-disabled="!formValue.model"
          disable-search
        />
      </div>

      <div>
        <QuasaraSelect
          name="Trailer"
          option-label="modelName"
          :options="vehicleOptions"
          placeholder="Select Trailer"
          v-model="formValue.vehicle"
          hide-icon
          :is-disabled="!formValue.model"
          disable-search
        />
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
import useGetTrailerDetails from "@/utils/composables/API/vehicle-loan/watercraft-details/trailer/useGetTrailerDetails";

import useUpdateTrailerDetail from "@/utils/composables/API/vehicle-loan/watercraft-details/trailer/useUpdateTrailerDetail";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, reactive, ref, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";

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

const { data: years } = useGetYears("boats", "trailers");

const getMakes = async (year: string) => {
  const res = await axiosThirdParty.get(`/vehicles/boats/trailers/makes`, {
    params: { year: year },
  });
  makeOptions.value = res.data;
  return res.data;
};
const getModel = async (params: unknown) => {
  const res = await axiosThirdParty.get(`/vehicles/boats/trailers/models`, {
    params,
  });
  modelOptions.value = res.data;
  return res.data;
};
const getVarient = async (params: unknown) => {
  const res = await axiosThirdParty.get(`/vehicles/boats/trailers/variants`, {
    params,
  });
  varientOptions.value = res.data;
  return res.data;
};
const getVehicle = async (params: unknown) => {
  const res = await axiosThirdParty.get(`/vehicles/boats/trailers/nvic`, {
    params,
  });
  vehicleOptions.value = res.data;
  return res.data;
};

watch(formValue, () => {
  if (formValue.year) {
    getMakes(formValue.year);
    if (formValue.make) {
      getModel({ year: formValue.year, makeCode: formValue.make.code });
      if (formValue.model) {
        getVarient({
          year: formValue.year,
          makeCode: formValue.make.code,
          modelCode: formValue.model.code,
        });
        if (formValue.variant) {
          getVehicle({
            year: formValue.year,
            makeCode: formValue.make.code,
            modelCode: formValue.model.code,
            variant: formValue.variant.name,
          });
        }
      }
    }
  }
});

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

const { data: oldData, isFetched, isLoading } = useGetTrailerDetails();

watch(
  [oldData, isFetched, isLoading],
  ([newData]) => {
    if (!newData) return;
    if (newData) {
      formValue.year = newData.yearOfManufacture
        ? new Date(newData.yearOfManufacture).getFullYear().toString()
        : "";
      formValue.make = { code: newData.make, name: "" };
      formValue.model = { code: newData.model, name: "" };
      formValue.variant = { name: newData.varient };
      formValue.vehicle = {
        modelName: newData.boat,
        nvicCur: "",
        nvicModel: "",
      };
      // setTitle(newData.firstName + " details");
    }
  },
  { immediate: true }
);

const v$ = useVuelidate(validations, formValue);
const router = useRouter();

const route = useRoute();

const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const { mutate } = useUpdateTrailerDetail();

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
        trailer: formValue.vehicle.modelName,
      },
      {
        onSuccess() {
          router.push(nextNavigation.value);
        },
      }
    );
};
</script>

<style></style>
