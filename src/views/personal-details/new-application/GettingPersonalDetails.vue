<template>
  <div>
    <p>
      If you have your drivers license handy, we can help you simplify the
      application process.
    </p>
    <p>
      We will send a secure link to your phone so you can take a photo of your
      drivers license and verify your identity.
    </p>
    <p>Would you like us to send you the link now?</p>

    <div class="tw-mt-9 tw-grid tw-grid-cols-2 tw-gap-4 md:tw-gap-8 md:tw-mb-4">
      <CustomButton
        title="No Thank You"
        class="tw-w-full"
        :isDisabled="false"
        className="tw-bg-secondary-engage tw-h-13 md:tw-h-16 tw-text-white"
        :to="onNo"
      />
      <CustomButton
        title="Yes Please"
        class="tw-w-full"
        className="tw-h-13 md:tw-h-16"
        :isDisabled="false"
        :to="onYes"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";

const route = useRoute();

const nextNavigation = computed(() => {
  const { yes, no } = route.meta.nextNavigation as { yes: string; no: string };
  return {
    yes,
    no,
  };
});

const onYes = computed(() => {
  return {
    //  routeNames.personalDetails.newApplication.keepScreenOpen,
    name: nextNavigation.value.yes,
  };
});
const onNo = computed(() => {
  console.log("yes", nextNavigation.value.no);
  return {
    // routeNames.personalDetails.yourPersonalDetails.checkYourDetails,
    name: nextNavigation.value.no,
    params: { fetch: 0 },
  };
});
</script>

<style scoped></style>
