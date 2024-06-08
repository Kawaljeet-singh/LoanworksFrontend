<template>
  <div>
    <div>
      <div>
        <RadioButtons
          v-model="purpose"
          :options="options"
          className="tw-h-24 md:tw-h-26"
          containerClasses="md:tw-gap-9"
        />
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
import RadioButtons from "@/components/form/RadioButtons.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import useVehicleStore from "@/stores/useVehicleStore";
import useGetVehicleLoan from "@/utils/composables/API/vehicle-loan/useGetVehicleLoan";
import useUpdateVehicleLoan from "@/utils/composables/API/vehicle-loan/useUpdateVehicleLoan";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
type Options = "Purchase" | "Refinance" | "";
const purpose = ref<Options>("");

const options = ["Purchase", "Refinance"];

const router = useRouter();

const validations = computed(() => ({
  purpose: {
    required,
  },
}));
const route = useRoute();
const { setByName } = useVehicleStore();

const v$ = useVuelidate(validations, { purpose });
const nextRoute = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const { data } = useGetVehicleLoan();

watch(
  [data],
  ([d]) => {
    if (!d) return;

    purpose.value = d.loanPurpose;
  },
  { immediate: true }
);

const handleNextClick = () => {
  if (purpose.value) {
    setByName("purpose", purpose.value);
    router.push(nextRoute.value);
  }
};

const { mutate } = useUpdateVehicleLoan();

const handleMutate = () => {
  mutate(
    {
      loanPurpose: purpose.value,
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
