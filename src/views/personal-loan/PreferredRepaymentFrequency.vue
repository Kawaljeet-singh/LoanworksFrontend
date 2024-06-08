<template>
  <div>
    <form @submit.prevent="handleMutate()">
      <div>
        <RadioButtons
          v-model="frequency"
          :options="options"
          className="tw-h-24 md:tw-h-26"
          containerClasses="tw-grid-cols-1 lg:tw-grid-cols-3 lg:tw-gap-8"
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
    </form>
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
import RadioButtons from "@/components/form/RadioButtons.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import useGetVehicleLoan from "@/utils/composables/API/vehicle-loan/useGetVehicleLoan";
import useUpdateVehicleLoan from "@/utils/composables/API/vehicle-loan/useUpdateVehicleLoan";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
const frequency = ref("");

const options = ["Weekly", "Fortnightly", "Monthly"];

const router = useRouter();

const validations = computed(() => ({
  frequency: {
    required,
  },
}));
const route = useRoute();
const v$ = useVuelidate(validations, { frequency });
const navigateTo = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const { data } = useGetVehicleLoan();

watch(
  [data],
  ([d]) => {
    if (!d) return;

    frequency.value = d.repaymentFrequency;
  },
  { immediate: true }
);

const handleNextClick = () => {
  router.push(navigateTo.value);
};

const { mutate } = useUpdateVehicleLoan();

const handleMutate = () => {
  mutate(
    {
      repaymentFrequency: frequency.value,
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
