<template>
  <div>
    <h3 class="tw-text-left tw-mb-5" v-if="heading">
      {{ heading }}
    </h3>
    <form @submit.prevent="handleMutate()" class="md:tw-gap-4 lg:tw-mb-20">
      <div
        class="tw-grid md:tw-grid-cols-2 md:tw-gap-8 lg:tw-gap-x-13 md:tw-gap-y-0"
      >
        <CustomInput
          v-model="v$.hullNumber.$model"
          :v="v$.hullNumber"
          className="!tw-text-left"
          class="tw-mb-1"
          name="Registration Number "
          placeholder="Enter Registration  Number"
        />
        <div>
          <span class="tw-mt-2.5 tw-font-avenir-medium">Registered state</span>
          <QuasaraSelect
            :options="STATES.map((s) => s.name)"
            placeholder="Select State"
            v-model="formValue.registeredState"
            hide-icon
          />
        </div>
      </div>

      <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
        <CustomButton
          title="Next"
          class="tw-w-full tw-max-w-xs"
          :is-disabled="v$.$invalid"
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
import QuasaraSelect from "@/components/form/QuasaraSelect.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import useGetVehicleLoan from "@/utils/composables/API/vehicle-loan/useGetVehicleLoan";
import useGetTrailerDetails from "@/utils/composables/API/vehicle-loan/watercraft-details/trailer/useGetTrailerDetails";
import useUpdateTrailerDetail from "@/utils/composables/API/vehicle-loan/watercraft-details/trailer/useUpdateTrailerDetail";
import { STATES } from "@/utils/constants";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, reactive, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";

const formValue = reactive({
  hullNumber: "",
  registeredState: "",
});

const router = useRouter();

const route = useRoute();

const { data: dataVehicle } = useGetVehicleLoan();

const heading = computed(() =>
  route.meta.heading
    ? false
    : `What is the ${
        dataVehicle?.value?.vehicleSubType || "Watercraft"
      }’s identification number?`
);

const validations = computed(() => ({
  hullNumber: { required },
  registeredState: {
    required,
  },
}));

const v$ = useVuelidate(validations, formValue);

const nextNavigation = computed(() => {
  return {
    name: route.meta.nextNavigation as RouteRecordName,
  };
});
const { data: oldData, isFetched, isLoading } = useGetTrailerDetails();

watch(
  [oldData, isFetched, isLoading],
  ([newData]) => {
    if (!newData) return;
    if (newData) {
      formValue.hullNumber = newData.hullNumber;

      formValue.registeredState = newData.registeredState;

      // setTitle(newData.firstName + " details");
    }
  },
  { immediate: true }
);

const handleNextClick = () => {
  router.push(nextNavigation.value);
};

const { mutate } = useUpdateTrailerDetail();

const handleMutate = () => {
  mutate(
    {
      hullNumber: formValue.hullNumber,
      registeredState: formValue.registeredState,
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
