<template>
  <div>
    <h1 class="main-heading">
      {{ getStartedTitle }}
    </h1>
    <h4
      class="tw-text-center tw-font-avenir-medium tw-text-primary tw-leading-5 tw-my-3.5 tw-font-medium tw-max-h-52"
    >
      {{ getStartedSubtitle }}
    </h4>
    <p class="tw-text-center tw-mx-2 tw-mb-0">
      Lets get your rate and see if you are eligible. This won't impact your
      credit history.
    </p>
    <div class="tw-flex tw-flex-col tw-max-w-md tw-mx-auto tw-pt-2.5">
      <div class="sm:tw-order-2 tw-mx-2">
        <CustomButton
          title="Let's get Started "
          :isDisabled="false"
          :showArrow="true"
          iconClassName=" tw-fill-white"
          @onClick="handleNextClick"
          className="tw-bg-secondary-600 tw-text-white tw-mb-0 lg:tw-text-base"
        />
        <div class="tw-w-full tw-flex tw-items-center tw-my-4">
          <div class="tw-w-full tw-h-px tw-bg-secondary-50"></div>
          <span class="tw-mx-14 tw-text-secondary-600">OR</span>
          <span class="tw-w-full tw-h-px tw-bg-secondary-50"></span>
        </div>
        <CustomButton
          title="Return to Rate Quote"
          :isDisabled="false"
          @onClick="OpenModal('ReturnRateQuoteModal')"
          className="tw-bg-secondary-550 tw-text-white lg:tw-text-base "
        />
      </div>
      <div class="tw-w-full tw-flex tw-justify-center tw-my-10">
        <img
          :src="isVehicleLoan ? carGetStartedLogo : getStartedLogo"
          class="tw-w-96 tw-mx-12"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useMutateApplication from "@/utils/composables/API/useMutateApplication";
import { computed } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import CustomButton from "../components/CustomButton.vue";
import getStartedLogo from "/assets/getStartedLogo.svg";
import carGetStartedLogo from "/assets/vehicle-loan/carGetStarted.png";
import useModelStore from "@/stores/useModalStore";

const route = useRoute();
const getStartedTitle = computed(() => route.meta.getStartedTitle);
const getStartedSubtitle = computed(() => route.meta.getStartedSubtitle);
const nextNavigation = computed(() => {
  return { name: route.meta.nextNavigation as RouteRecordName };
});
const isVehicleLoan = computed(() => route.meta.isVehicleLoan);

const router = useRouter();
const { OpenModal } = useModelStore();

const { mutate } = useMutateApplication();
const LoanTypes = computed(() => route.meta.LOAN_TYPE as string);
const handleNextClick = () => {
  mutate(
    { applicationType: LoanTypes.value },
    {
      onSuccess(data) {
        const appId = data.data.applicationId;
        router.push({ ...nextNavigation.value, params: { appId } });
      },
    }
  );
};
</script>

<style lang="css" scoped>
.main-heading {
  @apply tw-font-bold tw-text-center !tw-text-2xl tw-mt-6 tw-leading-normal lg:tw-mt-0;
}
</style>
