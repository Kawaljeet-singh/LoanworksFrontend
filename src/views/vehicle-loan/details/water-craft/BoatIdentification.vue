<template>
  <div>
    <h3 class="tw-text-left tw-mb-5" v-if="heading">
      {{ heading }}
    </h3>
    <form @submit.prevent="handleMutate" class="md:tw-gap-4 lg:tw-mb-20">
      <div
        class="tw-grid md:tw-grid-cols-2 md:tw-gap-8 lg:tw-gap-x-13 md:tw-gap-y-0"
      >
        <CustomInput
          v-model="v$.hullNumber.$model"
          :v="v$.hullNumber"
          className="!tw-text-left"
          class="tw-mb-1"
          name="Hull Identification Number "
          placeholder="Enter Hull Identification Number"
        />
        <CustomInput
          v-model="v$.officialNumber.$model"
          :v="v$.officialNumber"
          className="!tw-text-left"
          class="tw-mb-1"
          name="Watercraft Official Number "
          placeholder="Enter Watercraft Official Number"
        />
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
import useGetVehicleLoan from "@/utils/composables/API/vehicle-loan/useGetVehicleLoan";
import useGetWaterCraftDetails from "@/utils/composables/API/vehicle-loan/watercraft-details/useGetWaterCraftDetails";
import useUpdateWaterCraftDetails from "@/utils/composables/API/vehicle-loan/watercraft-details/useUpdateWaterCraftDetails";
import useVuelidate from "@vuelidate/core";
import { required, requiredUnless } from "@vuelidate/validators";
import { computed, reactive, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import { TYPE_OF_WATERCRAFT } from "@/types/vehicleLoan.type";
const formValue = reactive({
  hullNumber: "",
  officialNumber: "",
});

const router = useRouter();

const route = useRoute();

const { data: dataVehicle } = useGetVehicleLoan();

const heading = computed(
  () =>
    `What is the ${
      dataVehicle?.value?.vehicleSubType || "Watercraft"
    }’s identification number?`
);

const validations = computed(() => ({
  hullNumber: { requiredIfRef: requiredUnless(formValue.officialNumber) },
  officialNumber: {
    requiredIfRef: requiredUnless(formValue.hullNumber),
  },
}));

const v$ = useVuelidate(validations, formValue);

const nextNavigation = computed(() => {
  return {
    name: route.meta.nextNavigation as RouteRecordName,
  };
});

const { data, isFetching } = useGetWaterCraftDetails();

watch(
  [data, isFetching],
  ([d]) => {
    if (!d) return;
    formValue.hullNumber = d.hullNumber;
    formValue.officialNumber = d.officialNumber;
  },
  { immediate: true }
);

const { mutate } = useUpdateWaterCraftDetails();

const handleMutate = () => {
  mutate(
    {
      hullNumber: formValue.hullNumber,
      officialNumber: formValue.officialNumber,
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
