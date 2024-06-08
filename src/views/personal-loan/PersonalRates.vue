<template>
  <div>
    <div
      class="tw-grid tw-items-center tw-gap-8 md:tw-justify-items-center lg:tw-justify-items-start"
    >
      <div
        class="tw-grid tw-border-b tw-border-cyan-50 lg:tw-grid-cols-2 md:tw-justify-items-center tw-gap-5 md:tw-max-w-md lg:tw-max-w-none lg:tw-justify-items-start lg:tw-items-center"
      >
        <div class="tw-text-primary-500 tw-text-lg">How much do you need?</div>
        <div>
          <CustomInput
            :min="minMaxLimit.min"
            placeholder="How much do you need?"
            type="number"
            v-model.number="v$.amount.$model"
            className="!tw-text-left md:tw-w-80 md:tw-h-25"
            icon="fa-dollar-sign"
            :v="v$.amount"
          />
        </div>
      </div>
      <div class="tw-flex tw-flex-col lg:tw-flex-row tw-gap-5">
        <div class="tw-text-primary-500 tw-max-w-xs tw-text-lg">
          How many years do you need to pay off the loan?
        </div>
        <div
          class="tw-max-w-xs tw-flex tw-items-center md:tw-h-26 tw-gap-5 tw-justify-center"
        >
          <NumberInputCounter
            v-model="formValue.noOfYears"
            placeholder="5"
            className="!tw-text-left tw-my-0  "
            input-container-class-name="md:tw-h-25 tw-w-28 md:tw-w-40 "
          />
          <span class="tw-text-primary-500"> Years</span>
        </div>
      </div>
    </div>

    <div
      class="tw-mt-5 md:tw-mt-14 tw-flex tw-item tw-justify-center lg:tw-hidden"
    >
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :isDisabled="v$.$invalid"
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
  </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import CustomInput from "@/components/form/CustomInput.vue";
import NumberInputCounter from "@/components/form/NumberInputCounter.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import router from "@/router";
import useGetVehicleLoan from "@/utils/composables/API/vehicle-loan/useGetVehicleLoan";
import useUpdateVehicleLoan from "@/utils/composables/API/vehicle-loan/useUpdateVehicleLoan";
import { computed } from "@vue/reactivity";
import { useVuelidate } from "@vuelidate/core";
import { minValue, required } from "@vuelidate/validators";
import { reactive, watch } from "vue";
import { useRoute, type RouteRecordName } from "vue-router";

const route = useRoute();

const formValue = reactive({
  amount: "",
  noOfYears: 5,
});

const minMaxLimit = reactive({
  min: 1,
});

const validations = {
  amount: {
    required,
    minValue: minValue(minMaxLimit.min),
  },
  noOfYears: {
    required,
  },
};

const v$ = useVuelidate(validations, formValue);

const nextRoute = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const handleNextClick = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  }

  router.push(nextRoute.value);
};

const { mutate } = useUpdateVehicleLoan();

const { data } = useGetVehicleLoan();

watch(
  [data],
  ([d]) => {
    if (!d) return;

    formValue.amount = d.requestedAmount;
    if (d.requestedYears) formValue.noOfYears = d.requestedYears;
  },
  { immediate: true }
);

const handleMutate = () => {
  mutate(
    {
      requestedAmount: Number(formValue.amount),
      requestedYears: formValue.noOfYears,
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
