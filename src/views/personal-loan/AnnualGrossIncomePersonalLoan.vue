<template>
  <form @submit.prevent="handleMutate" class="">
    <div class="tw-grid lg:tw-grid-cols-2 lg:tw-gap-8">
      <div class="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-1">
        <div>
          <CustomInputVue
            placeholder=""
            v-model.number="v$.annualIncome.$model"
            type="number"
            className="!tw-text-left"
            icon="fa-dollar-sign"
            :v="v$.annualIncome"
          />
        </div>
      </div>
    </div>

    <div class="tw-mt-5 md:tw-mt-18 tw-flex tw-item tw-justify-center">
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
  </form>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import CustomInputVue from "@/components/form/CustomInput.vue";
import router from "@/router";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { computed, ref } from "vue";
import { useRoute, type RouteRecordName } from "vue-router";
import TheFooter from "@/components/global/TheFooter.vue";
import useUpdateVehicleLoan from "@/utils/composables/API/vehicle-loan/useUpdateVehicleLoan";

const route = useRoute();

const annualIncome = ref<number>();

const validations = {
  annualIncome: {
    required: helpers.withMessage("Annual Income is required", required),
  },
};

const v$ = useVuelidate(validations, { annualIncome });

const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const handleNextClick = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;

  router.push(nextNavigation.value);
};

const { mutate } = useUpdateVehicleLoan();

const handleMutate = () => {
  mutate(
    {
      annualIncome: annualIncome.value,
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
