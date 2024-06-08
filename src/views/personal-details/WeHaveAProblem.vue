<template>
  <div>
    <p>It seems there is a problem with the information you entered.</p>
    <p>Please try again or contact us on: 02 3456 7890</p>

    <div
      class="tw-mt-9 tw-grid md:tw-grid-cols-2 tw-gap-4 md:tw-gap-4.5 md:tw-mb-4"
    >
      <CustomButton
        title="Try Again"
        class="tw-w-full md:tw-order-2"
        className="md:tw-h-15"
        :isDisabled="false"
        :to="onYes"
      />
      <CustomButton
        title=""
        class="tw-w-full"
        :isDisabled="false"
        className="tw-bg-qb-black-secondary-2 tw-text-white md:tw-h-15"
        :to="onNo"
      >
        <div class="tw-text-white tw-flex tw-justify-center tw-items-center">
          <img
            src="/assets/phone.svg"
            alt=""
            srcset=""
            class="tw-inline tw-mr-2 tw-w-5"
          />Request a Callback
        </div>
      </CustomButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import routeNames from "@/utils/route-names/routeName";
import { computed } from "@vue/reactivity";
const onYes = computed(() => {
  return {
    name: routeNames.personalDetails.newApplication.keepScreenOpen,
  };
});
const onNo = computed(() => {
  return {
    name: routeNames.personalDetails.yourPersonalDetails.checkYourDetails,
  };
});
</script>

<style scoped></style>
