<template>
  <div>
    <h3 class="tw-text-left tw-mb-5" v-if="heading">
      {{ heading }}
    </h3>
    <form @submit.prevent="handleMutate" class="md:tw-gap-4 lg:tw-mb-20">
      <div class="tw-grid tw-gap-2.5 md:tw-gap-10 md:tw-grid-cols-2">
        <div>
          <QuasaraSelect
            name="Year of manufacture"
            :options="data"
            placeholder="YYYY"
            v-model="formValue.year"
            disable-search
            hide-icon
          />
        </div>
        <div>
          <QuasaraSelect
            option-label="name"
            name="Make"
            :options="makeOptions"
            placeholder="Select Make"
            v-model="formValue.make"
            :is-disabled="!formValue.year"
            disable-search
            hide-icon
          />
        </div>
        <div>
          <QuasaraSelect
            name="Model"
            option-label="name"
            :options="modelOptions"
            placeholder="Select Model"
            v-model="formValue.model"
            :is-disabled="!formValue.make"
            disable-search
            hide-icon
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
            :name="isBoatDetails ? 'Boat' : 'Watercraft'"
            option-label="modelName"
            :options="vehicleOptions"
            placeholder="Select Watercraft"
            v-model="formValue.vehicle"
            :is-disabled="!formValue.variant"
            disable-search
            hide-icon
          />
        </div>
        <div v-if="isBoatDetails" class="tw-flex tw-justify-center">
          <img :src="boatImg" alt="" class="tw-max-h-24" />
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
  </div>
</template>

<script setup lang="ts">
import QuasaraSelect from "@/components/form/QuasaraSelect.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import { axiosThirdParty } from "@/utils/axiosInstance";
import useGetYears from "@/utils/composables/API/third-party/vehicle/useGetYears";
import useGetVehicleLoan from "@/utils/composables/API/vehicle-loan/useGetVehicleLoan";

import useGetWaterCraftDetails from "@/utils/composables/API/vehicle-loan/watercraft-details/useGetWaterCraftDetails";
import useUpdateWaterCraftDetails from "@/utils/composables/API/vehicle-loan/watercraft-details/useUpdateWaterCraftDetails";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, reactive, ref, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import boatImg from "/assets/vehicle-loan/boat.png";
import { TYPE_OF_WATERCRAFT } from "@/types/vehicleLoan.type";
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

const { data: dataVehicle } = useGetVehicleLoan();
const isBoatDetails = computed(
  () => dataVehicle?.value?.vehicleSubType === TYPE_OF_WATERCRAFT.boat
);

const heading = computed(
  () => `Please tell us about your ${dataVehicle?.value?.vehicleSubType}`
);

const { data } = useGetYears("boats");

const getMakes = async (year: string) => {
  const res = await axiosThirdParty.get(`/vehicles/boats/makes`, {
    params: { year: year },
  });
  makeOptions.value = res.data;
  return res.data;
};
const getModel = async (params: unknown) => {
  const res = await axiosThirdParty.get(`/vehicles/boats/models`, {
    params,
  });
  modelOptions.value = res.data;
  return res.data;
};
const getVarient = async (params: unknown) => {
  const res = await axiosThirdParty.get(`/vehicles/boats/variants`, {
    params,
  });
  varientOptions.value = res.data;
  return res.data;
};
const getVehicle = async (params: unknown) => {
  const res = await axiosThirdParty.get(`/vehicles/boats/nvic`, {
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

const { data: oldData, isFetched, isLoading } = useGetWaterCraftDetails();

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

const handleNextClick = () => {
  switch (dataVehicle?.value?.vehicleSubType) {
    case TYPE_OF_WATERCRAFT.personalWaterCraft:
      router.push({
        name: vehicleLoan.vehicleDetails.boatDetails.identification
          .pwc as RouteRecordName,
      });
      break;
    case TYPE_OF_WATERCRAFT.marineMotor:
      router.push({
        name: vehicleLoan.vehicleDetails.boatDetails.identification
          .marineMotor as RouteRecordName,
      });
      break;
    case TYPE_OF_WATERCRAFT.marineTrailer:
      router.push({
        name: vehicleLoan.vehicleDetails.boatDetails.identification
          .marineTrailer as RouteRecordName,
      });
      break;

    default:
      router.push(nextNavigation.value);
      break;
  }
};

const { mutate } = useUpdateWaterCraftDetails();

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
        boat: formValue.vehicle.modelName,
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
