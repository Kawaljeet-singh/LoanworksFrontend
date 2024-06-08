<template>
  <form @submit.prevent="handleMutate" class="md:tw-gap-4 lg:tw-mb-20">
    <RadioButtons
      v-model="type"
      :options="options"
      containerClasses="  md:tw-gap-4 "
      className=" tw-h-19.5 md:tw-h-32 "
    />

    <div class="tw-mt-9 tw-flex tw-item tw-justify-center lg:tw-hidden">
      <CustomButton
        title="Next"
        class="tw-w-full tw-max-w-xs"
        :is-disabled="v$.$invalid"
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
import RadioButtons from "@/components/form/RadioButtons.vue";
import TheFooter from "@/components/global/TheFooter.vue";
import useVehicleStore from "@/stores/useVehicleStore";
import useGetEngineDetails from "@/utils/composables/API/vehicle-loan/engine-details/useGetEngineDetails";
import useUpdateEngineDetails from "@/utils/composables/API/vehicle-loan/engine-details/useUpdateEngineDetails";
import vehicleLoan from "@/utils/route-names/routeNameVehicleLoan";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, ref, watch, type Ref } from "vue";
import { useRouter } from "vue-router";
const { vehicleDetails } = useVehicleStore();

const options = ["Outboard", "Inboard"];
const type: Ref<typeof options[number]> = ref(vehicleDetails.engineType);
const router = useRouter();

const validations = computed(() => ({
  type: { required },
}));

const v$ = useVuelidate(validations, { type });

const handleNextClick = () => {
  if (type.value === options[0]) {
    router.push({ name: vehicleLoan.vehicleDetails.boatDetails.engineDetails });
  } else {
    router.push({
      name: vehicleLoan.vehicleDetails.boatDetails.reviewBoat,
    });
  }
};

const { data: oldData, isFetched, isLoading } = useGetEngineDetails();

watch(
  [oldData, isFetched, isLoading],
  ([newData]) => {
    if (!newData) return;
    type.value = newData.engineType;
  },
  { immediate: true }
);

const { mutate } = useUpdateEngineDetails();

const handleMutate = () => {
  mutate(
    {
      engineType: type.value,
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
