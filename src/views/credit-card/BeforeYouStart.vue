<template>
  <div>
    <div>
      <p>
        We need to collect some personal information to verify your identity.
        This will save time and allow us to assess your application right away!
      </p>

      <p>You will need:</p>
      <div
        class="tw-grid tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-2 tw-justify-items-center"
      >
        <BeforeYouStartSingleCard
          v-for="(card, index) in cards"
          :key="index"
          :imageUrl="card.imageUrl"
          :text="card.text"
          :id="index + 1"
        />
      </div>
    </div>
    <teleport to="#the-footer">
      <TheFooter :navigate-to="true" @handle-next-click="handleNextClick" />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { useRoute, useRouter, type RouteRecordName } from "vue-router";
import BeforeYouStartSingleCard from "../../components/before-you-start/BeforeYouStartSingleCard.vue";
import TheFooter from "../../components/global/TheFooter.vue";

const cards = [
  {
    imageUrl: "/assets/beforeYouStart/clock.svg",
    text: "10 minutes of your time",
  },
  {
    imageUrl: "/assets/beforeYouStart/yourId.svg",
    text: "Your ID  (Drivers License, Medicare Card or Passport)",
  },
  {
    imageUrl: "/assets/beforeYouStart/yourId.svg",
    text: "Be over 18 years of age",
  },
  {
    imageUrl: "/assets/beforeYouStart/australia.svg",
    text: "Be an Australian Citizen or Permanent Resident",
  },
  {
    imageUrl: "/assets/beforeYouStart/incomeExpense.svg",
    text: "Know your income, expenses, liabilities & assets",
  },
  {
    imageUrl: "/assets/beforeYouStart/pigiBank.svg",
    text: " If you’re an existing customer, your internet banking login details",
  },
];
const router = useRouter();
const route = useRoute();
const nextRoute = computed(() => ({
  name: route.meta.nextNavigation as RouteRecordName,
}));

const handleNextClick = () => {
  router.push(nextRoute.value);
};
</script>

<style scoped></style>
