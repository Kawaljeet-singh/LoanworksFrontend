<template>
  <div class="tw-text-center">
    <h1 class="main-heading lg:tw-mb-7">
      {{ getAssessmentTitle }}
    </h1>
    <div
      class="tw-grid lg:tw-grid-cols-2 tw-items-center tw-justify-items-center tw-mb-26 lg:tw-mb-10"
    >
      <img :src="hurrayGif" alt="" />
      <div>
        <p
          v-for="(para, index) in getParagraphs"
          :key="index"
          class="tw-text-center tw-mx-2 tw-text-sm tw-max-w-md lg:tw-text-left"
        >
          {{ para }}
        </p>
      </div>
    </div>
    <teleport to="#the-footer">
      <TheFooter
        :is-disabled="false"
        :navigate-to="!isCreditCardLoan"
        @handle-next-click="handleNextClick"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import useGetCreditApplicationDetails from "@/utils/composables/API/useGetCreditApplicationDetails";
import { computed } from "vue";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import TheFooter from "../../components/global/TheFooter.vue";
import hurrayGif from "/assets/review-application/hurraySuccess.gif";
import useGetApplicationDetails from "@/utils/composables/API/useGetApplicationDetails";
import LOAN_TYPE from "@/utils/LoanTypes";
const route = useRoute();
const router = useRouter();

const { data } = useGetCreditApplicationDetails();
const { data: appDetails } = useGetApplicationDetails();
const isCreditCardLoan = computed(
  () => appDetails?.value?.applicationType === LOAN_TYPE.CREDIT_CARD_LOAN
);
const isVehicleLoan = computed(
  () => appDetails?.value?.applicationType === LOAN_TYPE.VEHICLE_LOAN
);

const getAssessmentTitle = computed(
  () =>
    `We have completed our assessment of your ${
      isCreditCardLoan.value
        ? "credit card"
        : isVehicleLoan.value
        ? "vehicle"
        : "personal"
    } loan application`
);

const getParagraphs = computed(() => {
  let p1 = `Congratulations, we are able to conditionally approve your ${
    isVehicleLoan.value ? "vehicle" : "personal"
  } loan application.`;
  let p2 =
    "We will now verify a few more details and get back to you within 24-hours to confirm we are able to transfer ${loan amount} to your preferred bank account.";
  if (isCreditCardLoan.value) {
    p1 = `Congratulations, we are able to offer you a credit card limit of $${
      data?.value?.preferredLimit || "card limit"
    }.`;
    p2 =
      "We will now verify a few more details and get back to you within 24-hours to confirm we have approved your credit card application.";
  }
  return {
    p1,
    p2,
    p3: "Please continue and provide your preferred bank account details.",
  };
});

const nextNavigation = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));
const handleNextClick = () => router.push(nextNavigation.value);
</script>

<style lang="css" scoped>
.main-heading {
  @apply tw-font-bold tw-text-center !tw-text-2xl tw-mt-6 tw-leading-normal lg:tw-mt-0;
}
</style>
