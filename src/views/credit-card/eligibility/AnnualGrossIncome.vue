<template>
  <form @submit.prevent="handleNextClick" class="">
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

    <div
      class="tw-mt-5 md:tw-mt-18 tw-flex tw-item tw-justify-center lg:tw-hidden"
    >
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :isDisabled="v$.$invalid"
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
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import CustomInputVue from "@/components/form/CustomInput.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import router from "@/router";
import useGetEmploymentDetails from "@/utils/composables/API/employment-details/useGetEmploymentDetails";
import useUpdateEmploymentDetails from "@/utils/composables/API/employment-details/useUpdateEmploymentDetails";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { computed, ref, watch } from "vue";
import { useRoute, type RouteRecordName } from "vue-router";
const route = useRoute();
const { data, isLoading } = useGetEmploymentDetails({ isFirstPerson: 1 });

const annualIncome = ref<number>(data.value?.currentAnnualIncome);

const validations = {
  annualIncome: {
    required: helpers.withMessage("Annual Income is required", required),
  },
};

const v$ = useVuelidate(validations, { annualIncome });

const { mutate } = useUpdateEmploymentDetails();

const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
  params: route.params,
}));

watch(
  [isLoading, data],
  ([newVal]) => {
    if (!newVal && data.value && data?.value[0]) {
      annualIncome.value = data?.value[0]?.currentAnnualIncome;
    }
  },
  { immediate: true }
);

const handleNextClick = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;

  if (annualIncome.value === data?.value?.currentAnnualIncome) {
    router.push(nextNavigation.value);
    return;
  }

  mutate(
    { currentAnnualIncome: annualIncome.value, isFirstPerson: 1 },
    {
      onSuccess: () => router.push(nextNavigation.value),
    }
  );
};
</script>

<style scoped></style>
