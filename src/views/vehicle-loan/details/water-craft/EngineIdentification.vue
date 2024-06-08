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
          v-model="v$.engineNumber.$model"
          :v="v$.engineNumber"
          className="!tw-text-left"
          class="tw-mb-1"
          name="Engine Number "
          placeholder="Enter Engine Number"
        />
        <div v-if="!isMarineMotor">
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
import QuasaraSelect from "@/components/form/QuasaraSelect.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import useGetEngineDetails from "@/utils/composables/API/vehicle-loan/engine-details/useGetEngineDetails";
import useUpdateEngineDetails from "@/utils/composables/API/vehicle-loan/engine-details/useUpdateEngineDetails";
import useGetVehicleLoan from "@/utils/composables/API/vehicle-loan/useGetVehicleLoan";
import { STATES } from "@/utils/constants";
import useVuelidate from "@vuelidate/core";
import { required, requiredIf } from "@vuelidate/validators";
import { computed, reactive, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";

const formValue = reactive({
  engineNumber: "",
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

const isMarineMotor = computed(() => route?.meta?.isMarineMotor === true);

const validations = computed(() => ({
  engineNumber: { required },
  registeredState: {
    requiredif: requiredIf(!isMarineMotor.value),
  },
}));

const v$ = useVuelidate(validations, formValue);

const nextNavigation = computed(() => {
  return {
    name: route.meta.nextNavigation as RouteRecordName,
  };
});

const { data: oldData, isFetched, isLoading } = useGetEngineDetails();

watch(
  [oldData, isFetched, isLoading],
  ([newData]) => {
    if (!newData) return;
    if (newData) {
      formValue.engineNumber = newData.engineNumber;
      formValue.registeredState = newData.registeredState;
    }
  },
  { immediate: true }
);

const { mutate } = useUpdateEngineDetails();

const handleMutate = () => {
  mutate(
    {
      engineNumber: formValue.engineNumber,
      registeredState: formValue.registeredState,
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
